import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const handler = async (req: any, res: any) => {
    const prisma = new PrismaClient()
    const session: any = await getSession({ req });
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    if (!session) return res.status(401).send('Unauthorized.');
    if (session?.user?.Roles?.role_type.toLowerCase() !== ('promoter' || 'admin')) return res.status(401).send('Unauthorized.');
    const { address, type, city, addressTitle, surface, rooms, bathrooms, price, description, livingrooms, otherIndoorSpaces, externalStorage, totalSurface, extras, constructionYear, user } = req.body;
    try {
        await prisma.properties.create({
            data: {
                address: address,
                city: city,
                addressTitle,
                surface: parseInt(surface),
                rooms: parseInt(rooms),
                bathrooms: parseInt(bathrooms),
                price: parseFloat(price),
                livingrooms: parseInt(livingrooms),
                otherIndoorSpaces: parseInt(otherIndoorSpaces),
                externalStorage: parseInt(externalStorage),
                totalSurface: parseInt(totalSurface),
                extras,
                constructionYear: parseInt(constructionYear),
                status: 'available',
                type: type,
                user: {
                    connect: {
                        email: user
                    }
                }
            }
        }).then(created => {
            if (!created) return res.status(500).json({ success: 0, message: 'Internal server error' });
            return res.status(200).json({ success: 1, message: 'Property created successfully', data: created });
        })
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;