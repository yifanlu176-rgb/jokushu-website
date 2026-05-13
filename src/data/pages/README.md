# Page Data Convention

First-release page copy lives under `src/data/pages/` as JSON.

Current convention:

- `home.json` contains the homepage sections and card copy.
- Future pages should use one JSON file per route, named after the page slug.
- Astro pages may import these files directly while the page structure is still being built.
- When page count grows, this directory can be promoted to a stricter loader or content collection without changing the route matrix.

