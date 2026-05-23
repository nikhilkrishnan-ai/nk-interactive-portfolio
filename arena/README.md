# Nikhil Krishnan — 3D Gaming Portfolio Arena

**Nikhil Krishnan** · Chengannur, Kerala, India  
AI Content & Evaluation Specialist · Vertex AI · GeoSense Forensics

- Live 3D lab: https://nikhilkrishnan-ai.github.io/nk-interactive-portfolio/
- Google Developers: https://g.dev/nikhilkrishnanAI
- GeoSense repo: https://github.com/nikhilkrishnan-ai/nikhilkrishnan-aiREADME.md

A free, interactive portfolio you explore like a mini game: walk a cyber arena, approach **6 glowing data nodes**, press **E** to unlock your resume sections.

## Features

- **3D first-person mode** (desktop): WASD + mouse look
- **Touch / orbit mode** (mobile): drag to look, tap nodes to read
- **XP quest bar**: unlock all 5 nodes (About, GeoSense, Skills, Experience, Contact)
- **Zero backend** — static files only

## Run locally

```powershell
cd C:\Users\NIKHIL\GitHub\portfolio-3d-gaming
npx --yes serve .
```

Open `http://localhost:3000` (or the port shown).

> ES modules need a local server — opening `index.html` directly in the browser may block Three.js imports.

## Customize

Edit `js/main.js`:

- `PORTFOLIO` — your name, email, GitHub, LinkedIn
- `NODES` — titles, colors, positions, HTML body text, links

## Deploy free (GitHub Pages)

1. Create a repo on GitHub, e.g. `portfolio-3d-gaming`
2. Push this folder
3. **Settings → Pages → Source**: Deploy from branch `main`, folder `/ (root)`
4. Site URL: `https://YOUR_USERNAME.github.io/portfolio-3d-gaming/`

### One-time push

```powershell
cd C:\Users\NIKHIL\GitHub\portfolio-3d-gaming
git init
git add .
git -c user.name="Your Name" -c user.email="you@example.com" commit -m "Add 3D gaming portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-3d-gaming.git
git push -u origin main
```

## Other free hosts

| Host | Cost |
|------|------|
| [GitHub Pages](https://pages.github.com) | Free |
| [Cloudflare Pages](https://pages.cloudflare.com) | Free |
| [Netlify Drop](https://app.netlify.com/drop) | Free drag-and-drop |

## Tech

- [Three.js](https://threejs.org) (CDN)
- Pointer Lock + Orbit controls
- No build step required
