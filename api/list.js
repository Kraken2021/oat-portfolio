import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { prefix } = req.query;
    const result = await list({ prefix: prefix || '' });
    res.status(200).json({ blobs: result.blobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
