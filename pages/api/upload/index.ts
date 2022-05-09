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
        console.log(fields);
        await saveFile(files.file, fields?.propertyId);
        return res.status(201).send("");
    });
};

const saveFile = async (file: any, id: string) => {
    const prisma = new PrismaClient()
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/assets/uploads/${file.name}`, data);
    try {
        await prisma.propertyFiles.create({
            data: {
                fileName: file.name,
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