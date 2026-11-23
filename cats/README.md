# Daily Cat Memes (/cats/)

A static, mobile-first cat-meme feed at https://atidbit.io/cats/, built by GitHub
Pages' own Jekyll (no Actions, no custom plugins). No backend, no cookies, no API
keys, no ads. The only analytics is an optional, privacy-friendly, cookie-free
GoatCounter visitor count on /cats/ pages. It is off until a code is set (see
"Visitor count" below).

This file is excluded from the published site (`exclude:` in `_config.yml`).

## How it fits together

| What | Where |
|------|-------|
| One file per meme (the posts) | `_cat_memes/YYYY-MM-DD-slug.md` |
| Meme images | `cats/images/YYYY/slug.jpg` |
| Feed page (newest first) | `cats/index.html` -> `/cats/` |
| Permalink page layout | `_layouts/cat_meme.html` (wraps `_layouts/cats.html`) |
| Shared page shell, meta, Open Graph and Twitter tags | `_layouts/cats.html` |
| Visitor count (off when empty) | `_includes/cats-goatcounter.html` + `cats_goatcounter_code` in `_config.yml` |
| Styles (used only by /cats/) | `cats/cats.css` |
| RSS 2.0 feed (latest 30) | `cats/feed.xml` -> `/cats/feed.xml` |
| Collection, layout default, `future: false` | `_config.yml` |

Each post's URL comes from its file name: `_cat_memes/2026-11-22-airline-weight-system.md`
is published at `/cats/2026/11/22/airline-weight-system/`.

## Add a daily post (exact steps)

1. **Pick a slug.** Use lowercase words joined by hyphens, with no spaces or
   punctuation, for example `monday-meeting`. Keep it short and unique.

2. **Prepare the image.**
   - Use JPEG (`.jpg`) for photo-style memes, or PNG for flat graphics.
   - Make it square 1024x1024 or 1200x1200, or 1200x630 for wide images.
     Keep it under about 500 KB.
   - Strip location (GPS) metadata before committing.
   - Save it as `cats/images/YYYY/<slug>.jpg`, for example
     `cats/images/2026/monday-meeting.jpg`. Create the year folder if it is new.
   - Note its pixel width and height, and its size in bytes:
     `wc -c < cats/images/2026/monday-meeting.jpg`

3. **Create the post file** `_cat_memes/YYYY-MM-DD-<slug>.md`, for example
   `_cat_memes/2026-11-23-monday-meeting.md`, with exactly this front matter
   (quotes required; escape a double quote inside a value as `\"`):

   ```yaml
   ---
   title: "Short Title"
   date: 2026-11-23 00:00:00 -1000
   image: /cats/images/2026/monday-meeting.jpg
   width: 1024
   height: 1024
   image_bytes: 412345
   caption: "The caption shown under the meme, word for word."
   alt: "What the image shows, for screen readers, including any text in the image."
   ---
   ```

   - `title` is used for the page title, the share card, and the RSS item.
   - `date` must match the date in the file name. Always use `00:00:00 -1000`
     (midnight Hawaii time) so the URL day and the shown date stay right.
   - `width`/`height` are the image's real pixel size. They are used by the
     `<img>` tag and the Open Graph tags.
   - `image_bytes` is optional. It is the file size from step 2, and it adds an
     RSS `<enclosure>`. Without it, the feed still embeds the image.
   - Optional: text under the closing `---` shows as a short note below the meme.
     The layout is set automatically, so don't add `layout:`.

4. **Optional: add the post to the sitemap.** In root `sitemap.xml`, which is
   hand-edited, add this before `</urlset>` and update the `/cats/` entry's
   `<lastmod>`:

   ```xml
   <url>
   <loc>https://atidbit.io/cats/2026/11/23/monday-meeting/</loc>
   <lastmod>2026-11-23</lastmod>
   <changefreq>monthly</changefreq>
   <priority>0.5</priority>
   </url>
   ```

5. **Check before committing.** No secrets, keys, or personal details in the
   caption, alt text, or image. Don't change anything outside `_cat_memes/`,
   `cats/images/`, and (optionally) `sitemap.xml`.

6. **Commit** both files (and sitemap.xml) to the default branch `master`:

   ```
   git add _cat_memes/2026-11-23-monday-meeting.md cats/images/2026/monday-meeting.jpg sitemap.xml
   git commit -m "cats: add 2026-11-23 monday-meeting"
   git push
   ```

7. **Verify live** after GitHub Pages rebuilds (usually 1 to 3 minutes; check the
   repo's Actions tab for the "pages build and deployment" run):
   - `curl -s -o /dev/null -w "%{http_code}\n" "https://atidbit.io/cats/2026/11/23/monday-meeting/?v=$(date +%s)"`
     should print `200`.
   - The new post is first on https://atidbit.io/cats/ (cache-bust with `?v=...`).
   - `curl -s "https://atidbit.io/cats/feed.xml?v=$(date +%s)" | grep monday-meeting`
     shows the new item.
   - `curl -s https://atidbit.io/cats/2026/11/23/monday-meeting/ | grep 'og:image'`
     shows the absolute image URL. Optionally paste the URL into a social
     card preview tool.

## How dates behave

- `_config.yml` sets `future: false`. A post dated later than the build time is
  not built, and the feed, the RSS, and the Newer link also skip it.
- GitHub Pages builds only on a push, not on a timer. A future-dated post will
  not appear by itself when its day arrives. It shows up on the next push after
  its date. So commit each post on (or after) its own day.
- Dates display as "Month D, YYYY". The site has no `timezone:` setting, so the
  build runs in UTC. Midnight Hawaii time (`00:00:00 -1000`) is 10:00 UTC on the
  same day, which keeps the URL day and the shown date correct.

## Visitor count (GoatCounter, optional)

The count is cookie-free and privacy-friendly, and it appears only on /cats/
pages (the feed and every post page), never elsewhere on atidbit.io. It is off
while `cats_goatcounter_code` is empty. When it's off, nothing is rendered and
nothing external loads.

To turn it on:

1. Create a free site at https://www.goatcounter.com/. The site code is the
   `CODE` in `https://CODE.goatcounter.com`.
2. In GoatCounter, go to **Settings** and turn on **"Allow adding visitor counts
   on your website"**. Without it, the public view count can't load and stays
   hidden.
3. In `_config.yml`, set `cats_goatcounter_code: "CODE"` (only the code, not the
   full URL). Commit and push.
4. Every /cats/ page then loads
   `<script data-goatcounter="https://CODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`
   and shows a small "N views" line in the footer. The number is fetched from
   `https://CODE.goatcounter.com/counter/<encoded path>.json`. If that request
   fails for any reason, the line stays hidden.
   GoatCounter's script ignores visits from localhost by itself, so local
   previews aren't counted.

To turn it off again, set `cats_goatcounter_code: ""`.

## Keeping non-page files unpublished

GitHub Pages publishes every file that isn't excluded. For example, a `.md` file
without front matter is copied as-is. To keep a helper file off the site, add its
path to the `exclude:` list in `_config.yml`, as `cats/README.md` is. Keep the
default entries in that list (Gemfile, Gemfile.lock, node_modules, vendor/...,
CNAME), because setting `exclude:` replaces Jekyll's defaults.
