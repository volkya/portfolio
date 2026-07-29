import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownComponent } from 'ngx-markdown';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';
import type { ProjectEntry } from '../../core/content.models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatButtonModule, MarkdownComponent],
  template: `
    @if (state$ | async; as s) {
      @if (s.project) {
        <article class="detail">
          <a class="back-link" routerLink="/projects">← {{ site.content().projectDetail.back }}</a>
          <h1 class="detail-title">{{ s.project.title }}</h1>
          @if (s.project.tags?.length) {
            <ul class="tag-list" aria-label="Tags">
              @for (t of s.project.tags; track t) {
                <li>{{ t }}</li>
              }
            </ul>
          }
          <div class="detail-links">
            @if (s.project.repo) {
              <a [href]="s.project.repo" target="_blank" rel="noopener noreferrer">{{
                site.content().projectDetail.code
              }}</a>
            }
            @if (s.project.demo) {
              <a [href]="s.project.demo" target="_blank" rel="noopener noreferrer">{{
                site.content().projectDetail.demo
              }}</a>
            }
          </div>
          <div class="markdown-body">
            <markdown [data]="s.project.body" />
          </div>
        </article>
      } @else {
        <p class="empty-msg">{{ site.content().projectDetail.notFound }}</p>
        <a mat-stroked-button class="btn-pill-outline" routerLink="/projects">{{
          site.content().projectDetail.backButton
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
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.75rem;
        list-style: none;
        margin: 0 0 1rem;
        padding: 0;
        color: var(--text-ui);
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .detail-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.75rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--volkya-border);
        font-size: 0.9rem;
      }
      .detail-links a {
        color: var(--text-headline);
        text-decoration: none;
      }
      .detail-links a:hover {
        text-decoration: underline;
        color: var(--text-strong);
      }
      .empty-msg {
        color: var(--text-muted);
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class ProjectDetailComponent {
  readonly site = inject(SiteCopyService);
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);

  readonly state$ = this.route.paramMap.pipe(
    map((p) => p.get('slug') ?? ''),
    switchMap((slug) =>
      this.content.getProjectBySlug(slug).pipe(
        map((project: ProjectEntry | undefined) => ({ slug, project })),
      ),
    ),
  );
}
