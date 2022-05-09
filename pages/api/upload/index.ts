import { PrismaClient } from '@prisma/client';
import formidable from 'formidable-serverless';
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req: any, res: any) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err: any, fields: any, files: any) {
        for (let i in files) {
            await saveFile(files[i], fields.propertyId, fields.type);
        }
        return res.status(201).send("");
    });
};

const genUniqueId = () => {
    const dateStr = Date
        .now()
        .toString(36);
    const randomStr = Math
        .random()
        .toString(36)
        .substring(2, 8);
    return `${dateStr}-${randomStr}`;
}

const saveFile = async (file: any, id: string, type: string) => {
    const prisma = new PrismaClient()
    const data = fs.readFileSync(file.path);
    const newName = genUniqueId();
    fs.writeFileSync(`./public/assets/uploads/${newName}.${(file.name).split('.').pop()}`, data);
    try {
        await prisma.propertyFiles.create({
            data: {
                fileName: `${newName}.${(file.name).split('.').pop()}`,
                fileTitle: file.name,
                fileType: file.type,
                propertyId: id,
            }
        });
    } catch (err) {
        console.log(err);
    }
    return fs.unlinkSync(file.path);
};

const upload = (req: any, res: any) => {
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    return post(req, res);
};

export default upload