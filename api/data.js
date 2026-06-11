import { put, get } from '@vercel/blob';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'oat-admin-2024';
const DATA_PATH = 'config/portfolio-data.json';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const blob = await get(DATA_PATH);
      if (!blob) return res.status(200).json({ data: null });
      const text = await blob.text();
      return res.status(200).json({ data: JSON.parse(text) });
    } catch {
      return res.status(200).json({ data: null });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      await put(DATA_PATH, body, {
        access: 'public',
        contentType: 'application/json',
        allowOverwrite: true,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).end();
}
