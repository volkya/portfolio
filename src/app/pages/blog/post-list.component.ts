import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  template: `
    <header class="page-intro">
      <h1 class="page-heading">{{ site.content().blogPage.heading }}</h1>
      <p class="lede">{{ site.content().blogPage.lede }}</p>
    </header>

    @if (posts$ | async; as posts) {
      @if (posts.length === 0) {
        <p class="empty-msg">{{ site.content().blogPage.empty }}</p>
      } @else {
        <ul class="entry-list">
          @for (post of posts; track post.slug) {
            <li class="entry">
              <h2 class="entry-title">
                <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
              </h2>
              <div class="entry-meta">
                @if (post.date) {
                  <time [attr.datetime]="post.date">{{ post.date | date: 'mediumDate' }}</time>
                }
                @if (post.draft) {
                  <span class="meta-pill meta-pill--accent">{{ site.content().blogPage.draftChip }}</span>
                }
              </div>
              @if (post.description) {
                <p class="entry-summary">{{ post.description }}</p>
              }
              @if (post.tags?.length) {
                <ul class="tag-list" aria-label="Tags">
                  @for (t of post.tags; track t) {
                    <li>{{ t }}</li>
                  }
                </ul>
              }
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
        margin: 0 0 0.35rem;
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
      .entry-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        align-items: center;
        margin-bottom: 0.45rem;
        font-size: 0.85rem;
        color: var(--text-ui);
      }
      .entry-summary {
        margin: 0 0 0.55rem;
        color: var(--text-muted);
        font-size: 0.95rem;
        line-height: 1.55;
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.75rem;
        list-style: none;
        margin: 0;
        padding: 0;
        color: var(--text-ui);
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
    `,
  ],
})
export class PostListComponent {
  readonly site = inject(SiteCopyService);
  readonly posts$ = inject(ContentService).getPosts();
}
