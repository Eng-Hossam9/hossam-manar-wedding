# GitHub Pages

## Live URL

After you enable Pages (below), the site will be at:

**https://eng-hossam9.github.io/hossam-manar-wedding/**

(Use the same casing GitHub shows for your username.)

## Enable GitHub Pages (one-time)

1. On GitHub open **Eng-Hossam9/hossam-manar-wedding** → **Settings**.
2. In the left sidebar, click **Pages** (under “Code and automation”).
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. **Branch**: select **`gh-pages`** and folder **`/ (root)`**, then **Save**.

Wait a minute or two, then open the live URL above.

## Deploy updates

From the project folder:

```bash
npm run deploy
```

This runs a production build with `NEXT_PUBLIC_BASE_PATH=/hossam-manar-wedding` and pushes the `out/` folder to the `gh-pages` branch.

## Local build (no base path)

```bash
npm run build
```

Generates `out/` for hosting at the domain root (e.g. local preview with `npx serve out`).

## Auth errors (403 / permission denied)

Use the GitHub account that owns **Eng-Hossam9** (or a collaborator with push access). Re-login: **Git Credential Manager**, PAT, or SSH key for that account.
