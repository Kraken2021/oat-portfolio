import { del } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'DELETE') return res.status(405).end();

  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'url required' });
    await del(url);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
