import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { ContentService } from '../../core/content.service';
import type { PostEntry } from '../../core/content.models';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MarkdownComponent,
  ],
  template: `
    @if (state$ | async; as s) {
      @if (s.post) {
        <section class="surface-frame">
          <header class="surface-frame__head">
            <a mat-stroked-button class="btn-pill-outline" routerLink="/blog">
              <mat-icon>arrow_back</mat-icon>
              Blog
            </a>
            <h1>{{ s.post.title }}</h1>
            <div class="meta">
              @if (s.post.date) {
                <time [attr.datetime]="s.post.date">{{ s.post.date | date: 'longDate' }}</time>
              }
              @if (s.post.layout) {
                <span class="layout">{{ s.post.layout }}</span>
              }
            </div>
            @if (s.post.tags?.length || (devMode && s.post.draft)) {
              <mat-chip-set>
                @if (devMode && s.post.draft) {
                  <mat-chip highlighted color="warn">Borrador (dev)</mat-chip>
                }
                @for (t of s.post.tags || []; track t) {
                  <mat-chip disabled>{{ t }}</mat-chip>
                }
              </mat-chip-set>
            }
          </header>
          <article class="markdown-body content-well">
            <markdown [data]="s.post.body" />
          </article>
        </section>
      } @else {
        <p class="empty-msg">No hay entrada «{{ s.slug }}».</p>
        <a mat-stroked-button class="btn-pill-outline" routerLink="/blog">Volver</a>
      }
    }
  `,
  styles: [
    `
      .surface-frame__head h1 {
        margin: 0.35rem 0 0.25rem;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
        font-size: 0.9rem;
        color: var(--text-muted);
      }
      .meta time {
        color: var(--text-ui);
      }
      .layout {
        text-transform: lowercase;
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
