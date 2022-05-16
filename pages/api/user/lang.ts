import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const handler = async (req: any, res: any) => {
    const prisma = new PrismaClient()
    const session = await getSession({ req });
    if (!session) return res.status(401).send('Unauthorized.');
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    const { id, language } = req.body;
    try {
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                language: language
            }
        }).then((updated: any) => {
            if (!updated) return res.status(500).json({ success: 0, message: 'Internal server error' });
            return res.status(200).json({ success: 1, message: 'Language updated successfully' });
        })
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;