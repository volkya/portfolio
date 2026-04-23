import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink, MatCardModule, MatChipsModule],
  template: `
    <h1 class="page-heading">{{ site.content().blogPage.heading }}</h1>
    <p class="lede">{{ site.content().blogPage.lede }}</p>

    @if (posts$ | async; as posts) {
      @if (posts.length === 0) {
        <p class="empty-msg">{{ site.content().blogPage.empty }}</p>
      } @else {
        <div class="list">
          @for (post of posts; track post.slug) {
            <mat-card class="surface-card row" appearance="outlined">
              <mat-card-header>
                <mat-card-title>
                  <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                </mat-card-title>
                <mat-card-subtitle>
                  @if (post.date) {
                    <time [attr.datetime]="post.date">{{ post.date | date: 'mediumDate' }}</time>
                  }
                  @if (post.description) {
                    <span class="desc">{{ post.description }}</span>
                  }
                </mat-card-subtitle>
              </mat-card-header>
              @if (post.tags?.length || post.draft) {
                <mat-card-content>
                  <mat-chip-set>
                    @if (post.draft) {
                      <mat-chip highlighted color="warn">{{ site.content().blogPage.draftChip }}</mat-chip>
                    }
                    @for (t of post.tags || []; track t) {
                      <mat-chip disabled>{{ t }}</mat-chip>
                    }
                  </mat-chip-set>
                </mat-card-content>
              }
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
      .list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 640px;
      }
      mat-card-title a {
        color: var(--text-strong);
        text-decoration: none;
      }
      mat-card-title a:hover {
        color: var(--volkya-brand);
        text-decoration: underline;
      }
      .desc {
        display: block;
        margin-top: 0.35rem;
        color: var(--text-muted);
      }
      mat-card-subtitle time {
        color: var(--text-ui);
      }
    `,
  ],
})
export class PostListComponent {
  readonly site = inject(SiteCopyService);
  readonly posts$ = inject(ContentService).getPosts();
}
