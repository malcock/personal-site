# martinalcock.co.uk

Personal site. Nuxt 4 + Storyblok, generated to flat HTML and served from Cloudflare Pages.

- **Home** (`/`) is one long page: hero, selected work (case studies with the reasoning expanding in place), an index of other work, how I work, the record (CV as work history), latest writing and lab, contact.
- **Writing** (`/writing`) and **Lab** (`/lab`) are the only other sections. Case studies also get permalinks at `/work/[slug]`.
- Design direction: pared-back Constructivism. One paper, one ink, one red; type as image; geometry instead of photography. See `docs/workshop.html` for the IA, content plan and the directions considered.

## Content model

Every page is assembled in Storyblok from bloks. Each blok maps to a Vue component in `app/storyblok/` (`case_list` → `CaseList.vue`).

| Content type | Folder | Notes |
|-|-|-|
| `page` | root, `writing/`, `lab/` start pages | Body is a stack of sections |
| `case_study` | `work/` | Hook fields (asked / actually / outcome) plus a body of case blocks |
| `role` | `record/` | Data only, rendered inside the `timeline` section. Not routed |
| `article` | `writing/` | Rich text with embedded bloks |
| `experiment` | `lab/` | Links to a repo or a build hosted under `public/x/` |

Sections: `hero_statement`, `case_list`, `case_index`, `approach`, `timeline`, `latest_feed`, `contact`, plus the free-form `section` / `grid` / `column` / `shape` layout bloks for anything else. Case blocks: `context_strip`, `finding`, `options_compare`, `diagram`, `metric`, `constraint_list`, `reflection`, `rich_text`, `code_block`.

References (`case_list.cases`, `timeline.roles`, `role.cases`, `move.proof`) are resolved at fetch time; see `RESOLVE_RELATIONS` in `app/utils/sb.ts`. The `disciplines` datasource supplies tag labels.

## Build modes

`STORYBLOK_VERSION` picks the mode:

- `published` (default): `nuxt generate` pre-renders every story from the Storyblok links API to static HTML. No runtime API calls, no bridge.
- `draft`: a client-rendered SPA that fetches drafts live and loads the Storyblok bridge. Used for the Visual Editor preview deployment.

```sh
cp .env.example .env   # add your token
npm install
npm run dev            # https://localhost:3000, draft content, bridge on
npm run build:pages    # what Cloudflare runs
npm run serve:static   # serve .output/public on :4173
```

Hosted experiments are plain static files under `public/x/<name>/` and are excluded from prerendering.

## Deployment

Cloudflare Pages, Git-connected to this repo.

- Build command `npm run build:pages`, output directory `dist` (Nitro's Cloudflare Pages preset; local builds write to `.output/public`), `NODE_VERSION` from `.node-version`.
- **Production** (`main`): `STORYBLOK_DELIVERY_API_TOKEN` = public token, `STORYBLOK_VERSION=published`.
- **Preview** (`preview` branch and PRs): `STORYBLOK_DELIVERY_API_TOKEN` = preview token, `STORYBLOK_VERSION=draft`. Point Storyblok's Visual Editor at the `preview` branch URL.
- **Publish to rebuild**: a Pages deploy hook for `main` is registered as a Storyblok webhook on story published / unpublished / deleted, so publishing regenerates the site.
