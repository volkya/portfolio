import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
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
        <a mat-raised-button color="primary" routerLink="/projects">{{ site.content().home.ctaProjects }}</a>
        <a mat-stroked-button class="btn-pill-outline" routerLink="/blog">{{ site.content().home.ctaBlog }}</a>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        max-width: 36rem;
        padding: 2.5rem 0 1rem;
      }
      .hero-kicker {
        margin: 0 0 0.75rem;
        color: var(--text-muted);
        font-size: 0.9rem;
        letter-spacing: 0.02em;
      }
      .hero-title {
        margin: 0 0 1.75rem;
        color: var(--text-headline);
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-size: clamp(1.35rem, 3.5vw, 1.75rem);
        line-height: 1.25;
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
        padding: 1rem 0;
        border-top: 1px solid var(--volkya-border);
        border-bottom: 1px solid var(--volkya-border);
      }
      .stack-label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 600;
        color: var(--text-muted);
        margin-bottom: 0.45rem;
        font-size: 0.65rem;
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
    `,
  ],
})
export class HomeComponent {
  readonly site = inject(SiteCopyService);

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
