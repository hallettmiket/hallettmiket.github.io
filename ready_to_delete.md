# ready_to_delete.md

Files and directories that are obsolete now that the site has been
replaced by the React SPA (`index.html` + `lab-*.jsx`). None of these
are referenced by the React site or by `.nojekyll` / `CNAME`.

Deletion is **not** automatic — review each section first. `git mv`
is unnecessary since these paths are all purely historical; plain
`git rm -r` is fine.

Generated 2026-04-20. Verify before deleting.

---

## 1. Jekyll content collections (safe to delete in bulk)

These directories held per-collection Markdown posts, collection
index pages, and archived HTML fragments read by the old Jekyll
build. The React site renders its own pages from `.jsx` files and
never consults these folders.

- `_data/`
- `blog/` (16 files)
- `barbados/` (26 files) — the roster content has been migrated into
  `lab-barbados-data.jsx` and the `barbados` React route
- `courses/` (4 files)
- `ethos/` (2 files)
- `misc/` (6 files)
- `papers/` (29 files)
- `software/` (14 files)
- `team/` (119 files) — note: headshot *images* under this folder
  may still be referenced from `lab-pages.jsx`; see §4 before
  deleting `team/` outright

## 2. Jekyll theming / build infrastructure

- `assets/themes/` (37 files, ~1.8 MB) — Bootstrap themes used by
  Jekyll layouts; the React site ships its own inline styles.
- `vendor/` (29 files, ~1.7 MB) — Ruby gem install tree (Jekyll +
  plugins). Belongs in `.gitignore`, not the repo.
- `_layouts/`, `_includes/`, `_scripts/`, `_plugins/` — remove any
  that exist; the React site doesn't need Liquid templating.
- `Rakefile`, `Gemfile`, `Gemfile.lock`, `_config.yml` — remove if
  present (already removed in an earlier commit).

## 3. RStudio / workspace artifacts

These were checked in by accident and have no role in the site:

- `hallettmiket.github.io.Rproj`
- `.Rproj.user/`
- `.RData`
- `.Rhistory`

## 4. Unused assets under `assets/images/` and `assets/pdfs/`

The React site references **49** asset files. The rest (~191 files)
are orphaned. Categories:

### 4a. Obvious cruft — delete without review

- All `.DS_Store` files under `assets/`
- `assets/images/imgres.jpg`, `imgres-1.jpg` (Google-image-search
  placeholders, already partly removed)
- `assets/images/Unknown_person.jpeg`

### 4b. Old logos / institution marks (no longer used)

Old Concordia/McGill/Quebec-era branding now that the lab is at
Western. None are referenced from React.

- `assets/images/logo.png`, `logo_*.png`, `mcgill.logo.png`,
  `logo_shulichmed.png`, `logo_ccs.png`, `logo_genome.gif`
- `assets/images/cihr_logo_big.jpg` — the small `funding_agencies`
  variant is still in use; this big one is not

### 4c. Old team photos

`assets/images/team/` contains 119 files — many old Concordia-era
headshots, a full archived `hallett lab _ team.htm` + `_files/`
snapshot, and current team members. The React team page lists
specific headshots; anything not referenced is deletable. Review
the exclusion list below before bulk-deleting.

Archived snapshot (delete):
- `assets/images/team/hallett lab _ team.htm`
- `assets/images/team/hallett lab _ team_files/` (entire folder)

Former-member headshots — keep if alumni still appear on the
React team page; otherwise delete.

### 4d. Old barbados images

- `assets/images/barbados/.DS_Store`
- `assets/images/barbados/2016-group-picture.jpg`,
  `2017-group-picture.jpg`, `2018-group-picture.jpg` (duplicates;
  PNG versions in the same folder are the ones the React site uses)
- `assets/images/barbados/barbados.gif`, `barbados-2.jpg`,
  `bellairs-barbados.png`, `mcb_little.gif`,
  `genetic-interaction.jpg`, `cancer-immune.jpg`,
  `reef-microbiome.jpg` (low-res duplicates of PNGs)
- `assets/images/barbados/bbd-modelsystems-group2020.jpg` — moved
  here in an earlier commit but not referenced

### 4e. Old PDFs under `assets/pdfs/`

Many paper and course PDFs remain under `assets/pdfs/` that were
only ever linked from Jekyll paper pages. The React site doesn't
link them. Candidates for deletion:
- `assets/pdfs/courses/` — all course handouts (old Concordia course)
- `assets/pdfs/papers/` — old paper PDFs. Keep only the ones that
  are actively linked from the new `lab-pages.jsx` / papers route
  (grep for `pdfs/papers` in `*.jsx` before deleting)
- `assets/pdfs/team/` — old CVs

A concrete “unused” file list was written to `/tmp/unused_assets.txt`
during inventory and reproduces with:

```bash
python3 - <<'PY'
import re, urllib.parse
from pathlib import Path
root = Path('.')
refs = set()
pat1 = re.compile(r'''(?:src=["']|href=["']|url\(|["'])/?(assets/[^'"\s)]+)''')
pat2 = re.compile(r'''raw\.githubusercontent\.com/hallettmiket/hallettmiket\.github\.io/(?:master|main)/(assets/[^\s'"\\)]+)''')
for f in list(root.glob('*.jsx')) + [Path('index.html')]:
    t = f.read_text(errors='ignore')
    for m in pat1.finditer(t): refs.add(urllib.parse.unquote(m.group(1)))
    for m in pat2.finditer(t): refs.add(urllib.parse.unquote(m.group(1)))
all_files = {str(p) for d in ('assets/images','assets/pdfs')
             for p in Path(d).rglob('*') if p.is_file()}
for u in sorted(all_files - refs):
    print(u)
PY
```

## 5. Keep (do NOT delete)

For reference, these are the only files the new site actually needs:

- `index.html` — React SPA entry
- `lab-components.jsx`, `lab-pages.jsx`, `lab-research-detail.jsx`,
  `lab-barbados-data.jsx`
- `CNAME` — custom domain mapping
- `.nojekyll` — disables GitHub Pages Jekyll build
- `assets/images/` — only the 49 files referenced by React
- `CLAUDE.md`, `README.md`, `.gitignore` — repo hygiene

---

## Suggested deletion order

Least-risky → most-risky:

1. `vendor/`, `assets/themes/`, RStudio artifacts (§2, §3)
2. Jekyll content collections (§1) — `_data/`, `blog/`, `courses/`,
   `ethos/`, `misc/`, `papers/`, `software/`
3. `barbados/` (§1) — double-check `lab-barbados-data.jsx` has all
   workshop data before removing
4. `team/` (§1) — double-check that every headshot referenced in
   `lab-pages.jsx` lives under `assets/images/team/`, not under
   `team/` itself
5. Unused assets (§4) — can be done incrementally, easy to recover
   from git history if needed

Once a group has been deleted and the site still renders correctly
(check https://mikehallett.science after each push), remove that
section from this file.
