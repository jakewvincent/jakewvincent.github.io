# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
bundle install

# Local development server (http://localhost:4000, auto-reloads on changes)
bundle exec jekyll serve

# Build static site to _site/
bundle exec jekyll build

# Clean build
bundle exec jekyll clean && bundle exec jekyll build
```

## Architecture

This is a Jekyll static site for a personal academic/professional portfolio, hosted on GitHub Pages with custom domain www.jwv.dev.

### Layout System

- `_layouts/default.html` - Main template: banner → navigation → main content with sidebar image → footer
- `_layouts/blog_layout.html` - Blog listing variant
- `_layouts/post.html` - Individual blog post layout

Pages specify their layout and metadata via YAML front matter:
```yaml
---
title: Page Title
layout: default
updated: 2025-09-03
main-img: assets/images/photo.png
main-img-title: Image caption
---
```

### Key Directories

- `_data/navigation.yml` - Site navigation menu structure
- `_includes/` - Reusable components (banner.html, navigation.html, gloss_generator.html)
- `assets/css/` - Stylesheets (stylesheet.css is main, syntax.css for code highlighting)
- `assets/documents/` - PDFs (papers, CVs, handouts)
- `assets/scripts/` - JavaScript (expand.js for collapsible sections)

### Content Pages

Markdown files in root (index.md, cv.md, projects.md, teaching.md, notebooks.md) become HTML pages. Blog posts go in `_posts/` with date-prefixed filenames.

### Configuration

- `_config.yml` - Minimal config, only sets Rouge syntax highlighter
- Fonts: Google Fonts (Merriweather family) + Font Awesome 6 icons

## Git Conventions

- Do not add Co-Authored-By lines to commit messages
- `_site/` must be committed and pushed — there is no GitHub Actions build step, so the built output is served directly from the repo
