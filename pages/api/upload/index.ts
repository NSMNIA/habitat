import { PrismaClient } from '@prisma/client';
import fs from "fs";
import { getSession } from 'next-auth/react';
const formidable = require('formidable-serverless');

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
                fileType: type,
                propertyId: id,
            }
        });
    } catch (err) {
        console.log(err);
    }
    return fs.unlinkSync(file.path);
};

const upload = async (req: any, res: any) => {
    const session: any = await getSession({ req });
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    if (!session) return res.status(401).send('Unauthorized.');
    if (session?.user?.Roles?.role_type.toLowerCase() !== ('promoter' || 'admin')) return res.status(401).send('Unauthorized.');
    return post(req, res);
};

export default upload