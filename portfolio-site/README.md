# Antony Sabu — Terminal Portfolio

A multi-page portfolio site styled as a real terminal session (Kali-style prompt,
gradient figlet banner, boot sequence, and an actual
interactive command line you can navigate the site with).

## Project structure

```
portfolio-v2/
├── index.html          Home — boot sequence, banner, interactive terminal
├── about.html           About, education, certifications, languages
├── skills.html          Technical skills, shown as a directory listing
├── experience.html      Work history + achievements
├── projects.html        Projects, shown as a git log
├── contact.html         Contact links
├── css/
│   └── style.css         All shared styles (one file, used by every page)
├── js/
│   ├── main.js            Shared effects: scroll progress bar,
│   │                       scroll-reveal, "decrypting text" headers, card tilt
│   └── terminal.js         Boot sequence + interactive terminal (index.html only)
├── server.js             Minimal Node/Express static server (optional, for local dev)
├── package.json
└── README.md
```

## Running it locally

You don't need Node to view the site — you can just double-click `index.html`
and it'll open in your browser, since everything is static HTML/CSS/JS.

If you'd rather run it through a local server (recommended, some browsers
restrict certain features when opening files directly via `file://`):

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

## Deploying

Because this is fully static, any of these work with zero config changes:

- **GitHub Pages** — push this folder to a repo, enable Pages in repo settings
- **Netlify / Vercel** — drag-and-drop the folder in their dashboard
- **Node hosting (Render, Railway, etc.)** — they'll run `npm install && npm start`
  automatically using `server.js`

## Customizing

- **Colors / theme** — all in the `:root` block at the top of `css/style.css`
- **Content** — each page's text lives directly in its `.html` file (no CMS/build step)
- **Terminal commands** — edit the `commands` object in `js/terminal.js`
- **Boot sequence text** — edit the `bootLines` array in `js/terminal.js`
- **Nav links** — the `.termnav` block is repeated at the top of every page;
  update all six files if you add/remove a page

## Accessibility notes

- Respects `prefers-reduced-motion` (disables boot sequence, typing animation,
  and card tilt for users who've requested reduced motion)
- Skip-to-content link on every page
- All decorative elements (`.crt`, `.vignette`) are
  `aria-hidden` / `pointer-events:none` so screen readers and clicks pass through them
