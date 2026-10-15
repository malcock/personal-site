// Draft (Visual Editor) builds are a client-rendered SPA. Cloudflare Pages serves 404.html for unknown
// paths, so point it at the SPA shell. Production builds keep Nuxt's real 404 page.
// On Cloudflare, Nitro's Pages preset writes to dist/; locally it writes to .output/public.
import { copyFileSync, existsSync } from "node:fs";

if (process.env.STORYBLOK_VERSION === "draft") {
  const dir = ["dist", ".output/public"].find((d) => existsSync(`${d}/200.html`));
  if (!dir) throw new Error("No 200.html found in dist/ or .output/public/");
  copyFileSync(`${dir}/200.html`, `${dir}/404.html`);
  console.log(`Draft build: ${dir}/404.html now serves the SPA shell.`);
}
