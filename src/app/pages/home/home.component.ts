import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <section class="hero">
      <mat-card class="hero-card surface-card" appearance="outlined">
        <mat-card-header class="card-head-chrome">
          <mat-card-title>{{ site.content().home.heroTitle }}</mat-card-title>
          <mat-card-subtitle>{{ site.content().home.heroSubtitle }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="content-well">
          <p>{{ site.content().home.heroBody }}</p>
        </mat-card-content>
        <div class="stack-strip" [attr.aria-label]="site.content().home.stackAriaLabel">
          <span class="stack-label">{{ site.content().home.stackLabel }}</span>
          <span class="stack-items">{{ site.content().home.stackItems }}</span>
        </div>
        <mat-card-actions align="end">
          <a mat-raised-button color="primary" routerLink="/projects">{{ site.content().home.ctaProjects }}</a>
          <a mat-stroked-button class="btn-pill-outline" routerLink="/blog">{{ site.content().home.ctaBlog }}</a>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .hero {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 56vh;
        padding: 0 0 1rem;
      }
      .hero-card {
        max-width: 560px;
        width: 100%;
      }
      .stack-strip {
        padding: 0.65rem 1rem;
        margin: 0 0 0.25rem;
        border-top: 1px solid var(--volkya-border);
        border-bottom: 1px solid var(--volkya-border);
        background: rgba(0, 0, 0, 0.2);
        font-size: 0.78rem;
        line-height: 1.4;
      }
      .stack-label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 600;
        color: var(--text-muted);
        margin-bottom: 0.25rem;
        font-size: 0.65rem;
      }
      .stack-items {
        color: var(--text-ui);
      }
      .content-well p {
        white-space: pre-line;
      }
    `,
  ],
})
export class HomeComponent {
  readonly site = inject(SiteCopyService);
}
