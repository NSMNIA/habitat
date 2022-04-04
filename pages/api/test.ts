import { getSession } from 'next-auth/react';

const handler = async (req: any, res: any) => {
    const session = await getSession({ req });
    if (!session) return res.status(401).send('Unauthorized.');
    if (req.method === 'post') return res.status(503).json({ success: 0, message: 'Method not allowed' })
    try {
        return res.json({ success: 1, message: 'Ingelogd en gelukt', data: 'hallo' })
        // await Users.findAll({
        //     attributes: ['firstname', 'lastname', 'email'],
        //     limit: 100
        // }).then((found: object) => {
        //     if (!found) return res.json({ success: 0, message: 'No users' });
        //     return res.json({ success: 1, message: 'Users found', users: found });
        // });
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;