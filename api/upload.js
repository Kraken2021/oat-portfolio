import { put } from '@vercel/blob';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Auth check
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const Busboy = (await import('busboy')).default;
    const busboy = Busboy({ headers: req.headers });

    let uploadedFiles = [];
    let fields = {};

    busboy.on('field', (name, val) => { fields[name] = val; });

    busboy.on('file', (fieldname, file, info) => {
      const { filename, mimeType } = info;
      const chunks = [];

      file.on('data', chunk => chunks.push(chunk));
      file.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const folder = fields.folder || 'uploads';
          const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
          const pathname = `${folder}/${Date.now()}_${safeName}`;

          const blob = await put(pathname, buffer, {
            access: 'public',
            contentType: mimeType,
            allowOverwrite: true,
          });

          uploadedFiles.push({ name: filename, url: blob.url, pathname });
        } catch (err) {
          console.error('Upload error:', err);
        }
      });
    });

    busboy.on('finish', () => {
      res.status(200).json({ success: true, files: uploadedFiles });
    });

    req.pipe(busboy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
