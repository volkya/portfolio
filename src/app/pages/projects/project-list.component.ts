import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <header class="page-intro">
      <h1 class="page-heading">{{ site.content().projectsPage.heading }}</h1>
      <p class="lede">{{ site.content().projectsPage.lede }}</p>
    </header>

    @if (projects$ | async; as projects) {
      @if (projects.length === 0) {
        <p class="empty-msg">{{ site.content().projectsPage.empty }}</p>
      } @else {
        <ul class="entry-list">
          @for (p of projects; track p.slug) {
            <li class="entry">
              <h2 class="entry-title">
                <a [routerLink]="['/projects', p.slug]">{{ p.title }}</a>
              </h2>
              @if (p.summary || p.description) {
                <p class="entry-summary">{{ p.summary || p.description }}</p>
              }
              @if (p.tags?.length) {
                <ul class="tag-list" aria-label="Tags">
                  @for (t of p.tags; track t) {
                    <li class="meta-pill">{{ t }}</li>
                  }
                </ul>
              }
              <div class="entry-links">
                <a [routerLink]="['/projects', p.slug]">{{ site.content().projectsPage.detail }}</a>
                @if (p.repo) {
                  <a [href]="p.repo" target="_blank" rel="noopener noreferrer">{{
                    site.content().projectsPage.repo
                  }}</a>
                }
                @if (p.demo) {
                  <a [href]="p.demo" target="_blank" rel="noopener noreferrer">{{
                    site.content().projectsPage.demo
                  }}</a>
                }
              </div>
            </li>
          }
        </ul>
      }
    }
  `,
  styles: [
    `
      .empty-msg {
        color: var(--text-muted);
      }
      .entry-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-width: 40rem;
      }
      .entry {
        padding: 1.35rem 0;
        border-top: 1px solid var(--volkya-border);
      }
      .entry:last-child {
        border-bottom: 1px solid var(--volkya-border);
      }
      .entry-title {
        margin: 0 0 0.4rem;
        font-size: 1.05rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        line-height: 1.35;
      }
      .entry-title a {
        color: var(--text-strong);
        text-decoration: none;
      }
      .entry-title a:hover {
        color: var(--text-headline);
      }
      .entry-summary {
        margin: 0 0 0.65rem;
        color: var(--text-muted);
        font-size: 0.95rem;
        line-height: 1.55;
      }
      .entry-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.85rem;
        font-size: 0.85rem;
      }
      .entry-links a {
        color: var(--text-headline);
        text-decoration: none;
      }
      .entry-links a:hover {
        text-decoration: underline;
        color: var(--text-strong);
      }
    `,
  ],
})
export class ProjectListComponent {
  readonly site = inject(SiteCopyService);
  readonly projects$ = inject(ContentService).getProjects();
}
