# Web3 Red Flag Detector

[![Repo](https://img.shields.io/badge/GitHub-web3redflag-181717?logo=github)](https://github.com/neseliolfu2re/web3redflag)

Browser-only **entertainment / gut-check** tool: paste English text (project copy or your own notes) and see heuristic “red flag” pattern matches. **Not financial advice.** Not a security audit.

**Repository:** [github.com/neseliolfu2re/web3redflag](https://github.com/neseliolfu2re/web3redflag)

## How to use

1. Write or paste text (8+ characters).
2. Click **Scan for red flags**.
3. Optionally **Copy text report** or **Download PNG** (both include a not-advice watermark).

## Contributing patterns

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for fork → PR workflow.

Keyword lists live in **`src/lib/redFlagLexicon.ts`**. Main scanner wiring: **`src/lib/web3RedFlags.ts`**.

Pull requests that add clear English phrases are welcome. Keep patterns readable; avoid regex that is too broad.

## Embed

Append **`?embed=1`** to the app URL for a compact layout suitable for an `<iframe>` on a blog, e.g.:

```html
<iframe
  src="https://YOUR_DOMAIN/?embed=1"
  width="420"
  height="720"
  style="border:0;border-radius:12px;max-width:100%"
  loading="lazy"
  title="Web3 Red Flag Detector"
></iframe>
```

Replace `YOUR_DOMAIN` with your deployed origin. Run locally: `http://localhost:5173/?embed=1`.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this repo to GitHub (already at [neseliolfu2re/web3redflag](https://github.com/neseliolfu2re/web3redflag)).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import the repository.
3. Vercel usually auto-detects **Vite**: build command `npm run build`, output `dist` (see [`vercel.json`](./vercel.json)).
4. Deploy. Set your production URL in the README / repo “Website” field if you like.

CLI (optional):

```bash
npx vercel
```

## Security & safe use

See **[SECURITY.md](./SECURITY.md)** — not financial advice; do not paste seed phrases, private keys, or other highly sensitive data.

## License

[MIT](./LICENSE) — patterns and code are contributed under the same license unless stated otherwise.
