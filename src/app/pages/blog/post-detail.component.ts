import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownComponent } from 'ngx-markdown';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';
import type { PostEntry } from '../../core/content.models';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink, MatButtonModule, MarkdownComponent],
  template: `
    @if (state$ | async; as s) {
      @if (s.post) {
        <article class="detail">
          <a class="back-link" routerLink="/blog">← {{ site.content().postDetail.back }}</a>
          <h1 class="detail-title">{{ s.post.title }}</h1>
          <div class="meta">
            @if (s.post.date) {
              <time [attr.datetime]="s.post.date">{{ s.post.date | date: 'longDate' }}</time>
            }
            @if (devMode && s.post.draft) {
              <span class="meta-pill meta-pill--accent">{{ site.content().postDetail.draftChip }}</span>
            }
          </div>
          @if (s.post.tags?.length) {
            <ul class="tag-list" aria-label="Tags">
              @for (t of s.post.tags || []; track t) {
                <li>{{ t }}</li>
              }
            </ul>
          }
          <div class="markdown-body">
            <markdown [data]="s.post.body" />
          </div>
        </article>
      } @else {
        <p class="empty-msg">{{ site.content().postDetail.notFound }}</p>
        <a mat-stroked-button class="btn-pill-outline" routerLink="/blog">{{
          site.content().postDetail.backButton
        }}</a>
      }
    }
  `,
  styles: [
    `
      .detail {
        max-width: 40rem;
      }
      .back-link {
        display: inline-block;
        margin-bottom: 1.25rem;
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .back-link:hover {
        color: var(--text-headline);
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.85rem;
        font-size: 0.9rem;
        color: var(--text-ui);
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.75rem;
        list-style: none;
        margin: 0 0 1.5rem;
        padding: 0 0 1.25rem;
        border-bottom: 1px solid var(--volkya-border);
        color: var(--text-ui);
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .empty-msg {
        color: var(--text-muted);
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class PostDetailComponent {
  readonly devMode = isDevMode();
  readonly site = inject(SiteCopyService);

  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);

  readonly state$ = this.route.paramMap.pipe(
    map((p) => p.get('slug') ?? ''),
    switchMap((slug) =>
      this.content.getPostBySlug(slug).pipe(
        map((post: PostEntry | undefined) => ({ slug, post })),
      ),
    ),
  );
}
