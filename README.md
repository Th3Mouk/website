# marodon.com

Personal site for Jérémy Marodon — formations & consulting (PHP, Symfony, JavaScript, DevOps, IA).

## Stack

- [Astro](https://astro.build/) (static output)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) themes (light / dark)
- TypeScript
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)

## Local development

Requires **Node 22+** (pinned via `.nvmrc`).

```sh
nvm use            # picks up .nvmrc
npm install
npm run dev        # http://localhost:4321
```

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server                          |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the production build locally          |
| `npm run check`   | Run `astro check` (type + content collection) |
| `npm run lint`    | Run ESLint with auto-fix                      |
| `npm run format`  | Run Prettier across `src/`                    |

## Deployment

Pushing to `main` on GitHub triggers a Cloudflare Pages auto-build:

- **Build command:** `npm run build`
- **Build output:** `dist/`
- **Node version:** read from `.nvmrc` (currently `22`)

No GitHub Actions workflow is needed — Cloudflare Pages handles CI/CD directly from the repo.
