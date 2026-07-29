#!/usr/bin/env node
/**
 * Reads Markdown in content/posts/ (and optionally content/projects/)
 * and writes src/assets/content/posts.json (+ projects.json).
 *
 * Front matter example (posts):
 * ---
 * title: My note
 * date: 2026-07-29
 * description: One-liner for lists
 * slug: my-note          # optional; defaults to filename
 * draft: false
 * tags: [Backend, Go]
 * platforms:
 *   - name: Dev.to
 *     url: https://dev.to/...
 * ---
 * Body in Markdown…
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const PROJECTS_DIR = path.join(ROOT, 'content', 'projects');
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'content');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort();
}

function toIsoDate(value) {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function normalizePlatforms(raw) {
  if (!Array.isArray(raw)) return undefined;
  const list = raw
    .map((p) => {
      if (!p || typeof p !== 'object') return null;
      const name = String(p.name || '').trim();
      const url = String(p.url || '').trim();
      if (!name || !url) return null;
      return { name, url };
    })
    .filter(Boolean);
  return list.length ? list : undefined;
}

function normalizeTags(raw) {
  if (!Array.isArray(raw)) return undefined;
  const tags = raw.map((t) => String(t).trim()).filter(Boolean);
  return tags.length ? tags : undefined;
}

function buildPosts() {
  ensureDir(POSTS_DIR);
  const files = listMarkdown(POSTS_DIR);
  const posts = files.map((file) => {
    const full = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data, content } = matter(raw);
    const slug = String(data.slug || path.basename(file, '.md')).trim();
    const title = String(data.title || slug).trim();

    return {
      slug,
      title,
      body: content.replace(/^\uFEFF/, '').trimStart(),
      date: toIsoDate(data.date),
      description: data.description ? String(data.description).trim() : undefined,
      tags: normalizeTags(data.tags),
      platforms: normalizePlatforms(data.platforms),
      draft: Boolean(data.draft),
      layout: data.layout ? String(data.layout) : undefined,
    };
  });

  posts.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

  return posts;
}

function buildProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return null;
  const files = listMarkdown(PROJECTS_DIR);
  if (!files.length) return null;

  const projects = files.map((file) => {
    const full = path.join(PROJECTS_DIR, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data, content } = matter(raw);
    const slug = String(data.slug || path.basename(file, '.md')).trim();
    const title = String(data.title || slug).trim();

    return {
      slug,
      title,
      body: content.replace(/^\uFEFF/, '').trimStart(),
      summary: data.summary ? String(data.summary).trim() : undefined,
      description: data.description ? String(data.description).trim() : undefined,
      tags: normalizeTags(data.tags),
      draft: Boolean(data.draft),
      repo: data.repo ? String(data.repo).trim() : undefined,
      demo: data.demo ? String(data.demo).trim() : undefined,
      order: typeof data.order === 'number' ? data.order : 0,
    };
  });

  projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title));
  return projects;
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

const posts = buildPosts();
writeJson(path.join(OUT_DIR, 'posts.json'), posts);
console.log(`content: wrote ${posts.length} post(s) → src/assets/content/posts.json`);

const projects = buildProjects();
if (projects) {
  writeJson(path.join(OUT_DIR, 'projects.json'), projects);
  console.log(`content: wrote ${projects.length} project(s) → src/assets/content/projects.json`);
}
