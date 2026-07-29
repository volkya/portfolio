---
title: Welcome to the blog
date: 2026-04-22
description: Markdown in the repo — link out to Dev.to / Medium when you republish.
slug: bienvenida
layout: note
platforms:
  - name: Dev.to
    url: https://dev.to/
  - name: Medium
    url: https://medium.com/
---

This site builds articles from **Markdown** files in `content/posts/`.

- Edit a `.md`, run `yarn start` or `yarn build`, and a script writes `src/assets/content/posts.json`.
- Use `draft: true` in the front matter to hide a post in production (it stays visible in development).
- Optional `platforms` become pills that link to where you also published (Dev.to, Medium, Hashnode, …).

```bash
content/posts/my-note.md
```
