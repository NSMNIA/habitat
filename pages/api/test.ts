import { getSession } from 'next-auth/react';
import User from '../../database/models/user';

const handler = async (req: any, res: any) => {
    const session = await getSession({ req });
    if (!session) return res.status(401).send('Unauthorized.');
    if (req.method === 'post') return res.status(503).json({ success: 0, message: 'Method not allowed' })
    try {
        await User.findAll({
            limit: 100
        }).then((found: object) => {
            if (!found) return res.json({ success: 0, message: 'No users' });
            return res.json({ success: 1, message: 'Users found', users: found });
        });
        return res.json({ success: 1, message: 'Users found', users: null });
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;