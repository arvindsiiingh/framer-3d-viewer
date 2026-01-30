# 3D GLB Viewer

Minimal static Three.js viewer — no framework. Fills viewport, loads a GLB model, OrbitControls, basic lighting.

## Files

- **index.html** — Full-viewport page and canvas
- **main.js** — Three.js scene, OrbitControls, GLTFLoader, lighting, resize
- **bag.glb** — Model (hardcoded path in `main.js`)

## Local dev

```bash
npm run dev
```

Opens at `http://localhost:3000` (or next port). Use `/bag.glb` for the model.

## Deploy (Vercel)

1. Push this folder to a Git repo.
2. In Vercel: New Project → Import repo → **No build** (or build command left empty, output directory empty).
3. Deploy. Vercel serves `index.html`, `main.js`, and `bag.glb` as static files.

Root URL will show the viewer. Embed in Framer via iframe: `https://your-vercel-app.vercel.app`.

## Change the model

Edit `main.js`: set `GLB_PATH` to your path (e.g. `"/your-model.glb"`) and add the file to the project root (or adjust path).
