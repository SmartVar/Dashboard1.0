import { NextApiRequest, NextApiResponse } from 'next';

// In-memory mock database (replace with real DB logic)
const db: { [report: string]: { [division: string]: boolean } } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(db);
  }

  if (req.method === 'POST') {
    const { report, division, status } = req.body;

    if (!db[report]) db[report] = {};
    db[report][division] = status;

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
