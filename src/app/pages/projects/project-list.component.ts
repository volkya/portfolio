import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatCardModule, MatButtonModule, MatChipsModule],
  template: `
    <h1 class="page-heading">{{ site.content().projectsPage.heading }}</h1>
    <p class="lede">{{ site.content().projectsPage.lede }}</p>

    @if (projects$ | async; as projects) {
      @if (projects.length === 0) {
        <p class="empty-msg">{{ site.content().projectsPage.empty }}</p>
      } @else {
        <div class="grid">
          @for (p of projects; track p.slug) {
            <mat-card class="surface-card" appearance="outlined">
              <mat-card-header>
                <mat-card-title>{{ p.title }}</mat-card-title>
                <mat-card-subtitle>{{ p.summary || p.description }}</mat-card-subtitle>
              </mat-card-header>
              @if (p.tags?.length) {
                <mat-card-content class="tags">
                  <mat-chip-set>
                    @for (t of p.tags; track t) {
                      <mat-chip disabled>{{ t }}</mat-chip>
                    }
                  </mat-chip-set>
                </mat-card-content>
              }
              <mat-card-actions align="end">
                <a mat-stroked-button class="btn-pill-outline" [routerLink]="['/projects', p.slug]">{{
                  site.content().projectsPage.detail
                }}</a>
                @if (p.repo) {
                  <a
                    mat-stroked-button
                    class="btn-pill-outline"
                    [href]="p.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ site.content().projectsPage.repo }}</a>
                }
                @if (p.demo) {
                  <a
                    mat-stroked-button
                    class="btn-pill-outline"
                    [href]="p.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ site.content().projectsPage.demo }}</a>
                }
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    }
  `,
  styles: [
    `
      .empty-msg {
        color: var(--text-muted);
      }
      .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      }
      .tags mat-chip-set {
        margin-top: 0.25rem;
      }
    `,
  ],
})
export class ProjectListComponent {
  readonly site = inject(SiteCopyService);
  readonly projects$ = inject(ContentService).getProjects();
}
