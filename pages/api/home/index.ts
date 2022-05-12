import { PrismaClient } from '@prisma/client';

const handler = async (req: any, res: any) => {
    const prisma = new PrismaClient()
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    const { city } = req.body;
    try {
        const neighbourhood = await prisma.properties.findFirst({
            where: {
                city: {
                    contains: city
                }
            },
            include: {
                PropertyFiles: true
            }
        });
        await prisma.properties.findMany({
            orderBy: {
                updatedAt: 'desc'
            },
            take: 8,
            include: {
                PropertyFiles: {
                    take: 1
                }
            }
        }).then(found => {
            if (!found) return res.status(500).json({ success: 0, message: 'Internal server error' });
            return res.status(200).json({ success: 1, message: 'Properties found successfully', properties: found, neighbourhood: neighbourhood });
        })
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;