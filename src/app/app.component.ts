import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SiteCopyService } from './core/site-copy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <div class="layout-app">
      <mat-toolbar class="app-toolbar">
        <a class="brand" routerLink="/">{{ site.content().brand.toolbarTitle }}</a>
        <span class="spacer"></span>
        @for (item of site.content().nav; track item.path) {
          <a
            mat-button
            [routerLink]="item.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="item.exact ? linkExact : linkPrefix"
          >
            {{ item.label }}
          </a>
        }
      </mat-toolbar>

      <main class="shell">
        <router-outlet />
      </main>

      <footer class="site-footer">
        <nav class="footer-links" aria-label="Contact">
          <a class="footer-link" [href]="mailtoHref">
            <mat-icon>mail</mat-icon>
            <span>{{ site.content().contact.email }}</span>
          </a>
          <a
            class="footer-link"
            [href]="site.content().cvPage.cvPdfHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            <mat-icon>description</mat-icon>
            <span>{{ site.content().footer.cvLabel }}</span>
          </a>
          <a
            class="footer-link"
            [href]="site.content().social.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="site.content().social.githubAriaLabel"
          >
            <mat-icon>code</mat-icon>
            <span>{{ site.content().footer.githubLabel }}</span>
          </a>
          <a
            class="footer-link"
            [href]="site.content().social.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="site.content().social.linkedinAriaLabel"
          >
            <svg class="footer-svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <span>{{ site.content().footer.linkedinLabel }}</span>
          </a>
        </nav>
      </footer>
    </div>
  `,
  styles: [
    `
      .layout-app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .spacer {
        flex: 1 1 auto;
      }
      .brand {
        font-family: var(--font-display);
        font-weight: 700;
        letter-spacing: -0.01em;
        font-size: 1rem;
        color: var(--text-ui);
        text-decoration: none;
      }
      .brand:hover {
        color: var(--text-headline);
      }
      .shell {
        flex: 1 1 auto;
        width: 100%;
        max-width: 880px;
        margin: 0 auto;
        padding: 1.5rem clamp(1rem, 4vw, 1.75rem) 2.5rem;
      }
      .site-footer {
        flex-shrink: 0;
        margin-top: auto;
        padding: 0.85rem clamp(1rem, 4vw, 1.75rem);
        border-top: 1px solid var(--volkya-border);
        background: var(--chrome-bg);
      }
      .footer-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.55rem 0.75rem;
      }
      .footer-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.85rem;
        border: 1px solid var(--volkya-border);
        border-radius: 9999px;
        color: var(--text-ui);
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.2;
        background: transparent;
      }
      .footer-link mat-icon,
      .footer-link .footer-svg {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: var(--text-muted);
        flex-shrink: 0;
      }
      .footer-link .footer-svg {
        display: block;
      }
      .footer-link:hover {
        color: var(--text-strong);
        border-color: rgba(140, 130, 120, 0.4);
      }
      .footer-link:hover mat-icon,
      .footer-link:hover .footer-svg {
        color: var(--text-headline);
      }
      .footer-link:first-child {
        border-color: rgba(107, 36, 36, 0.45);
        background: rgba(107, 36, 36, 0.18);
      }
      .footer-link:first-child mat-icon {
        color: var(--text-headline);
      }
      .footer-link:first-child:hover {
        background: rgba(107, 36, 36, 0.28);
        color: var(--text-strong);
      }
    `,
  ],
})
export class AppComponent {
  readonly site = inject(SiteCopyService);
  readonly linkExact = { exact: true };
  readonly linkPrefix = { exact: false };

  get mailtoHref(): string {
    return `mailto:${this.site.content().contact.email}`;
  }
}
