import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContentService } from '../../core/content.service';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  template: `
    <section class="hero">
      <p class="hero-kicker">{{ site.content().home.heroSubtitle }}</p>
      <h1 class="hero-title">{{ site.content().home.heroTitle }}</h1>

      <div class="hero-body">
        @for (para of bodyParagraphs(); track $index) {
          <p>{{ para }}</p>
        }
      </div>

      <div class="stack" [attr.aria-label]="site.content().home.stackAriaLabel">
        <span class="stack-label">{{ site.content().home.stackLabel }}</span>
        <ul class="stack-items">
          @for (item of stackItems(); track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </div>

      <div class="hero-actions">
        <a class="btn-pill btn-pill--solid" routerLink="/projects">{{ site.content().home.ctaProjects }}</a>
        <a
          class="btn-pill"
          [href]="site.content().cvPage.cvPdfHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ site.content().home.ctaCv }}
        </a>
      </div>
    </section>

    <section class="journal" aria-labelledby="journal-heading">
      <div class="journal-head">
        <h2 id="journal-heading" class="journal-title">{{ site.content().home.journalHeading }}</h2>
        <a class="journal-all" routerLink="/blog">{{ site.content().home.journalAll }}</a>
      </div>

      @if (recentPosts$ | async; as posts) {
        @if (posts.length === 0) {
          <p class="journal-empty">{{ site.content().home.journalEmpty }}</p>
        } @else {
          <ul class="journal-list">
            @for (post of posts; track post.slug) {
              <li>
                <a class="journal-link" [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                <div class="journal-meta">
                  @if (post.date) {
                    <time [attr.datetime]="post.date">{{ post.date | date: 'yyyy-MM-dd' }}</time>
                  }
                  @if (post.description) {
                    <span>{{ post.description }}</span>
                  }
                </div>
              </li>
            }
          </ul>
        }
      }
    </section>
  `,
  styles: [
    `
      .hero {
        max-width: 36rem;
        padding: 2.5rem 0 0;
      }
      .hero-kicker {
        margin: 0 0 0.75rem;
        color: var(--text-muted);
        font-size: 0.78rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 600;
      }
      .hero-body {
        color: var(--text-body);
        font-size: 1.05rem;
        line-height: 1.7;
      }
      .hero-body p {
        margin: 0;
      }
      .hero-body p + p {
        margin-top: 1rem;
      }
      .stack {
        margin: 2rem 0 0;
        padding: 1.15rem 0 0;
        border-top: 1px solid var(--volkya-border);
      }
      .stack-label {
        display: block;
        margin-bottom: 0.55rem;
        color: var(--text-muted);
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .stack-items {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.85rem;
        margin: 0;
        padding: 0;
        list-style: none;
        color: var(--text-ui);
        font-size: 0.88rem;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 1.75rem;
      }
      .journal {
        max-width: 36rem;
        margin-top: 3rem;
        padding-top: 0.25rem;
      }
      .journal-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.1rem;
      }
      .journal-title {
        margin: 0;
        font-family: var(--font-display);
        font-size: 1.15rem;
        font-weight: 700;
        letter-spacing: -0.01em;
        color: var(--text-strong);
      }
      .journal-all {
        flex-shrink: 0;
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.82rem;
      }
      .journal-all:hover {
        color: var(--text-headline);
      }
      .journal-empty {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.95rem;
      }
      .journal-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .journal-list li {
        padding: 0.85rem 0;
        border-top: 1px solid var(--volkya-border);
      }
      .journal-list li:last-child {
        border-bottom: 1px solid var(--volkya-border);
      }
      .journal-link {
        color: var(--text-strong);
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.35;
      }
      .journal-link:hover {
        color: var(--text-headline);
      }
      .journal-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.75rem;
        margin-top: 0.3rem;
        color: var(--text-muted);
        font-size: 0.85rem;
        line-height: 1.45;
      }
      .journal-meta time {
        color: var(--text-ui);
        font-variant-numeric: tabular-nums;
      }
    `,
  ],
})
export class HomeComponent {
  readonly site = inject(SiteCopyService);
  private readonly content = inject(ContentService);

  readonly recentPosts$ = this.content.getPosts().pipe(map((posts) => posts.slice(0, 3)));

  readonly bodyParagraphs = computed(() =>
    this.site
      .content()
      .home.heroBody.split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  );

  readonly stackItems = computed(() =>
    this.site
      .content()
      .home.stackItems.split('·')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}
