import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SiteCopyService } from '../../core/site-copy.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <section class="cv-page">
      <h1 class="page-heading">{{ site.content().cvPage.heading }}</h1>
      <p class="lede">
        {{ site.content().cvPage.lede }}
        <a [href]="site.content().social.githubUrl" target="_blank" rel="noopener noreferrer">{{
          site.content().cvPage.ledeLinkLabel
        }}</a>.
      </p>
      <p class="hint">{{ site.content().cvPage.hint }}</p>
      <div class="actions">
        <a
          mat-raised-button
          color="primary"
          [href]="site.content().cvPage.cvPdfHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ site.content().cvPage.downloadPdf }}
        </a>
        <a
          mat-stroked-button
          class="btn-pill-outline"
          [href]="site.content().social.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ site.content().cvPage.viewGithub }}
        </a>
      </div>
    </section>
  `,
  styles: [
    `
      .cv-page {
        max-width: 520px;
      }
      .hint {
        font-size: 0.82rem;
        color: var(--text-muted);
        margin: -0.5rem 0 1.25rem;
        line-height: 1.45;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        align-items: center;
      }
      .lede a {
        color: var(--volkya-brand);
      }
    `,
  ],
})
export class CvComponent {
  readonly site = inject(SiteCopyService);
}
