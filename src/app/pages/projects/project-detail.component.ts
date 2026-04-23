import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';
import type { ProjectEntry } from '../../core/content.models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatButtonModule, MatChipsModule, MatIconModule, MarkdownComponent],
  template: `
    @if (state$ | async; as s) {
      @if (s.project) {
        <section class="surface-frame">
          <header class="surface-frame__head">
            <a mat-stroked-button class="btn-pill-outline" routerLink="/projects">
              <mat-icon>arrow_back</mat-icon>
              {{ site.content().projectDetail.back }}
            </a>
            <h1>{{ s.project.title }}</h1>
            @if (s.project.tags?.length) {
              <mat-chip-set>
                @for (t of s.project.tags; track t) {
                  <mat-chip disabled>{{ t }}</mat-chip>
                }
              </mat-chip-set>
            }
            <div class="links">
              @if (s.project.repo) {
                <a
                  mat-stroked-button
                  class="btn-pill-outline"
                  [href]="s.project.repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ site.content().projectDetail.code }}</a>
              }
              @if (s.project.demo) {
                <a
                  mat-stroked-button
                  class="btn-pill-outline"
                  [href]="s.project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ site.content().projectDetail.demo }}</a>
              }
            </div>
          </header>
          <article class="markdown-body content-well">
            <markdown [data]="s.project.body" />
          </article>
        </section>
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
      .surface-frame__head h1 {
        margin: 0.35rem 0 0.25rem;
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
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
