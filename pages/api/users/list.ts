import type { NextApiRequest, NextApiResponse } from 'next';
import Users from "../../../database/models/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await Users.findAll({
            attributes: ['firstname', 'lastname', 'email'],
            limit: 100
        }).then((found: object) => {
            if (!found) return res.json({ success: 0, message: 'No users' });
            return res.json({ success: 1, message: 'Users found', users: found });
        });
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}

export default handler;