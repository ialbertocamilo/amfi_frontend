import { NextApiRequest, NextApiResponse } from 'next';

export default function errorHandler(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
        }
    };
}