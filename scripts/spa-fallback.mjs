// Draft (Visual Editor) builds are a client-rendered SPA. Cloudflare Pages serves 404.html for unknown
// paths, so point it at the SPA shell. Production builds keep Nuxt's real 404 page.
import { copyFileSync } from "node:fs";

if (process.env.STORYBLOK_VERSION === "draft") {
  copyFileSync(".output/public/200.html", ".output/public/404.html");
  console.log("Draft build: 404.html now serves the SPA shell.");
}
