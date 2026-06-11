# OAT Portfolio — Vercel Deployment

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Deploy to Vercel
```bash
npx vercel --team krakens-projects-5c88d6c6
```

### 3. Add Environment Variables in Vercel Dashboard
Go to your project → Settings → Environment Variables and add:

| Variable | Value |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | (from Vercel Storage → Blob → your store) |
| `ADMIN_SECRET` | (choose a strong password for your admin panel) |

### 4. Enable Vercel Blob Storage
1. Go to vercel.com → Storage → Create Database → Blob
2. Connect it to your project
3. Copy the `BLOB_READ_WRITE_TOKEN` into your environment variables

### 5. Access your sites
- **Portfolio:** `https://your-project.vercel.app`
- **Admin Panel:** `https://your-project.vercel.app/admin.html`

## Admin Panel Login
Use the `ADMIN_SECRET` value you set as your environment variable.
Default (for local dev only): `oat-admin-2024`

## How it works
- Files uploaded in the admin panel go directly to **Vercel Blob** (CDN-hosted)
- Project data (descriptions, links, tags) is saved as a JSON file in Blob
- The portfolio reads from Blob URLs — no re-deployment needed for content updates
