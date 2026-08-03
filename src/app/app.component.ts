import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SiteCopyService } from './core/site-copy.service';
import { ThemeService } from './core/theme.service';

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
        <button
          mat-icon-button
          type="button"
          class="theme-toggle"
          [attr.aria-label]="theme.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          (click)="theme.toggle()"
        >
          <mat-icon>{{ theme.mode() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <main class="shell">
        <router-outlet />
      </main>

      <footer class="site-footer">
        <div class="footer-inner">
          <a class="footer-email" [href]="mailtoHref">{{ site.content().contact.email }}</a>
          <nav class="footer-social" aria-label="Social">
            <a
              class="footer-icon"
              [href]="site.content().social.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="site.content().social.githubAriaLabel"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.03-1.61-4.03-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"
                />
              </svg>
            </a>
            <a
              class="footer-icon"
              [href]="site.content().social.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="site.content().social.linkedinAriaLabel"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </nav>
        </div>
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
        max-width: 720px;
        margin: 0 auto;
        padding: 1.5rem clamp(1rem, 4vw, 1.75rem) 2.5rem;
      }
      .site-footer {
        flex-shrink: 0;
        margin-top: auto;
        padding: 1.1rem clamp(1rem, 4vw, 1.75rem) 1.35rem;
        border-top: 1px solid var(--volkya-border);
        background: var(--chrome-bg);
      }
      .footer-inner {
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem 1.25rem;
      }
      .footer-email {
        color: var(--text-ui);
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        word-break: break-all;
      }
      .footer-email:hover {
        color: var(--text-headline);
      }
      .footer-social {
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }
      .footer-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        color: var(--text-muted);
        text-decoration: none;
        border-radius: 0.35rem;
      }
      .footer-icon svg {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
      }
      .footer-icon:hover {
        color: var(--text-headline);
      }
    `,
  ],
})
export class AppComponent {
  readonly site = inject(SiteCopyService);
  readonly theme = inject(ThemeService);
  readonly linkExact = { exact: true };
  readonly linkPrefix = { exact: false };

  get mailtoHref(): string {
    return `mailto:${this.site.content().contact.email}`;
  }
}
