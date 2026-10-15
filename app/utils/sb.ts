/** Relations every page fetch resolves, so references arrive as stories rather than UUIDs. */
export const RESOLVE_RELATIONS = ["case_list.cases", "timeline.roles", "role.cases", "move.proof"].join(",");

type StoryLike = { full_slug?: string; slug?: string; is_startpage?: boolean } | string | null | undefined;

/** Site path for a story. Unresolved references (bare UUIDs) have no path. */
export function storyPath(story: StoryLike): string | undefined {
  if (!story || typeof story === "string" || !story.full_slug) return undefined;
  let slug = story.full_slug.replace(/\/$/, "");
  if (story.is_startpage) slug = slug.replace(/\/?[^/]*$/, "");
  return slug === "home" || slug === "" ? "/" : `/${slug}`;
}

/** Anchor id for a case study when shown inline on the home page. */
export function caseAnchor(story: StoryLike): string | undefined {
  if (!story || typeof story === "string") return undefined;
  return `case-${story.slug}`;
}

type Multilink = {
  linktype?: string;
  url?: string;
  cached_url?: string;
  email?: string;
  anchor?: string;
  target?: string;
  story?: { full_slug?: string };
};

export function linkHref(link?: Multilink | null): string | undefined {
  if (!link) return undefined;
  const anchor = link.anchor ? `#${link.anchor}` : "";
  if (link.linktype === "email" && link.email) return `mailto:${link.email}`;
  if (link.linktype === "story") {
    const slug = link.story?.full_slug ?? link.cached_url;
    if (!slug) return anchor || undefined;
    const path = slug === "home" ? "/" : `/${slug.replace(/\/$/, "")}`;
    return `${path}${anchor}`;
  }
  const url = link.url || link.cached_url;
  return url ? `${url}${anchor}` : anchor || undefined;
}

export function isExternal(href?: string) {
  return !!href && /^(https?:)?\/\//.test(href);
}

/** Split a textarea into trimmed non-empty lines. */
export function lines(text?: string): string[] {
  return (text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Escape text, then turn *word* into a red span and newlines into breaks. */
export function emphasise(text?: string): string {
  return escapeHtml(text ?? "")
    .replace(/\*([^*]+)\*/g, '<span class="red">$1</span>')
    .replace(/\n/g, "<br>");
}

export function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value.replace(" ", "T"));
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
