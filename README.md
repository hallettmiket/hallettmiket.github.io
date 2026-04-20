# Hallett Lab website

Source for <https://mikehallett.science> (also served at
<https://hallettmiket.github.io>).

The site is a single-page React application, transpiled in-browser
via Babel Standalone. **No build step is required** — GitHub Pages
serves the files directly.

## Repository layout

```
index.html              React entry point + Babel runtime
lab-components.jsx      Shared UI (Nav, Footer, team helpers, …)
lab-pages.jsx           Page components — Home, Research, Team,
                        Blog, Software, Courses, Ethos, Contact,
                        Join, and the Carousel.
lab-research-detail.jsx Detail pages for the four research areas.
lab-barbados-data.jsx   Barbados workshop roster data (2001-2026).

CNAME                   Custom domain for GitHub Pages.
.nojekyll               Tells GitHub Pages to skip Jekyll.
ready_to_delete.md      Running checklist of obsolete files still
                        in the repo (mostly the old Jekyll tree).

assets/
  images/
    barbados/           Per-workshop group photos and theme images
                        referenced by the Barbados page.
    funding_agencies/   Logos shown on research pages.
    site/               Site-chrome images (Western/Schulich logos,
                        lab-logo, nav/headshot PNGs).
    team/               Current-member headshots referenced by the
                        Team page. Filenames are declared inline in
                        lab-pages.jsx (`TEAM` array, `img` field).
    web_images/         Photos cycled by the Home-page carousel.
  pdfs/                 Any PDFs linked from page content.
```

## Local preview

GitHub Pages renders everything it needs straight from `index.html`,
but during development it's handy to run a tiny web server so that
relative paths work the same way they do in production:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

React + React DOM + Babel Standalone are loaded from `unpkg.com`
CDN URLs in `index.html` — nothing to install.

## Editing content

- **Research projects**: update `lab-research-detail.jsx`. The four
  research pages each live in their own component
  (`ResearchDetailBreast`, `ResearchDetailCoinSeq`,
  `ResearchDetailCandida`, `ResearchDetailDeepLearning`).
- **Team members**: update the `TEAM` array near the top of
  `lab-pages.jsx`. Drop the headshot into
  `assets/images/team/<handle>.jpg` and reference it as
  `team/<handle>.jpg` in the `img` field.
- **Home carousel**: edit the `CAROUSEL_IMAGES` array at the top of
  `lab-pages.jsx`. Put images in `assets/images/web_images/`.
- **Blog posts**: update the `BLOG_POSTS` array in `lab-pages.jsx`.
- **Barbados workshops**: data lives in `lab-barbados-data.jsx`;
  per-workshop rosters (Standing Committee, Organizers, Invitees)
  and group-photo pointers.

Open `index.html` in an editor; the hot-refresh workflow is simply
"save → reload the browser tab". There is no bundler.

## Hosting

- **Domain**: `mikehallett.science` (primary) and
  `www.mikehallett.science`, managed by Netlify DNS but served by
  GitHub Pages. A records point to
  `185.199.108–111.153`; CNAME `www` → `hallettmiket.github.io`.
- **HTTPS**: Let's Encrypt certificate auto-issued by GitHub Pages.
  Toggled on in repo **Settings → Pages → Enforce HTTPS**.
- **Publishing**: every push to `master` triggers a GitHub Pages
  rebuild; deploys in under a minute.

## Deployment checklist when updating

1. Edit the relevant `.jsx` file.
2. Reload `http://localhost:8000/` or the live URL to verify.
3. `git add`, `git commit`, `git push origin master`.

No Rake tasks, no `bundle exec`, no Jekyll preprocessing any more.

## History

The previous version of this site was a Jekyll build with
collections for team, papers, blog, barbados, software, courses,
ethos, and misc. All of that was migrated into the React data
files in April 2026 and the Jekyll scaffolding was removed. The
old asset inventory still being cleaned up is tracked in
[`ready_to_delete.md`](ready_to_delete.md).

## License

Content: Copyright © 2013–2026 Hallett Lab, Western University.

Source code (`.html`, `.jsx`, `.css`) is released under the MIT
License (see below). Some third-party components (React, Babel
Standalone) are loaded from CDN and retain their own licenses.

**The MIT License (MIT)**

Copyright (c) 2013–2026 Hallett Lab, Western University

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
