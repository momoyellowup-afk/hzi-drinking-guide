# Deployment

This repository is the GitHub source mirror for the existing H.ZI Netlify site.

Netlify target: `hzi-drinking-guide` (`3b9eae58-fc98-4294-81ce-b1a149a5f14e`).

Build: `npx tsc && npx vite build`
Publish directory: `dist/client`

Brand media currently references the immutable previous production deploy while the refined code is being connected to GitHub-driven builds. This avoids altering the supplied store models and preserves the current live assets during the handoff.
