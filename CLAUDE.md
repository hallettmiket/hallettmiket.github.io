# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
bundle install

# Build site
bundle exec jekyll build

# Serve locally (http://localhost:4000/)
bundle exec jekyll serve

# Full preprocessing (clones project repos, generates data, adds papers)
bundle exec ruby _scripts/update-and-preprocess.rb

# Add papers from PubMed XML
bundle exec ruby _scripts/add-papers.rb
```

## Rake Tasks for Content Creation

```bash
# Create new blog post
rake post title="Post Title" date="2024-01-15" tags="[tag1,tag2]"

# Create new paper entry
rake paper title="Paper Title" date="2024-01-15"

# Create new protocol
rake protocol title="Protocol Title"

# Create new page
rake page name="pagename.html"

# Preview site with auto-reload
rake preview
```

## Architecture

This is a Jekyll-based academic lab website using Jekyll-Bootstrap.

### Content Collections (in `_posts/` subdirectories)
- `team/_posts/` - Lab members with YAML front matter: `layout: member`, `position`, `handle`, `alumni` (true/false)
- `papers/_posts/` - Publications with: `layout: paper`, `year`, `ref`, `doi`, `image`
- `blog/_posts/` - News/updates with: `layout: post`, `author`, `date`

### Key Directories
- `_layouts/` - Page templates (member, paper, post, project, protocol, software)
- `_includes/themes/` - Theme partials
- `_scripts/` - Ruby preprocessing scripts (add-papers.rb parses `assets/pubmed_result.xml`)
- `assets/images/` - Images for papers, team, etc.
- `assets/pdfs/` - PDFs organized by type (papers/, team/)

### Adding Publications
1. Add PubMed XML entry to `assets/pubmed_result.xml`
2. Place PDF at `assets/pdfs/papers/{pubmed_id}.pdf`
3. Place image at `assets/images/papers/{pubmed_id}.png`
4. Run `bundle exec ruby _scripts/add-papers.rb`

### Team Member Front Matter
```yaml
layout: member
title: Full Name
position: Role (e.g., "PhD Student", "Principal investigator")
handle: shortname  # Used for author matching in posts
email: email@example.com
image: /assets/images/team/name.jpg
alumni: false  # Set true for former members
```
