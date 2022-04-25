import { PrismaClient } from '@prisma/client';

const handler = async (req: any, res: any) => {
    const prisma = new PrismaClient()
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    const { id } = req.body;
    try {
        await prisma.properties.findUnique({
            where: {
                propertyId: id.toString()
            }
        }).then(found => {
            if (!found) return res.status(500).json({ success: 0, message: 'Internal server error' });
            return res.status(200).json({ success: 1, message: 'Property found successfully', data: found });
        })
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;