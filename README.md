<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1EFpLWDMss09uyBevz-Nv_bJ9ahTptxHQ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## GitHub Pages Deployment

This repository deploys using GitHub Actions from `.github/workflows/deploy-pages.yml`.

1. Go to **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. Wait for the **Deploy to GitHub Pages** workflow to complete.
5. Open your site at:
   `https://<your-username>.github.io/about-me-art__/`

### Required GitHub repository settings

Because your default branch is `main`, the included workflows are already wired correctly.

- **Settings → Pages → Source**: set to **GitHub Actions**.
- **Settings → Actions → General → Workflow permissions**: choose **Read and write permissions** (required for Pages deploy).
- Keep default branch as `main` (deployment workflow triggers on pushes to `main`).

### Notes

- Production assets are built with relative paths (`./assets/...`) so they resolve correctly regardless of repository path/name changes on GitHub Pages.
- Local development still uses root `/` for normal Vite dev-server behavior.

# about-me-art__
My Projects and examples landing page
