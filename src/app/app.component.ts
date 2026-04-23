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
        <span class="brand">{{ site.content().brand.toolbarTitle }}</span>
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
        <a
          mat-icon-button
          [href]="site.content().social.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="site.content().social.githubAriaLabel"
        >
          <mat-icon>code</mat-icon>
        </a>
      </mat-toolbar>

      <main class="shell">
        <router-outlet />
      </main>

      <footer class="site-footer">
        <a [href]="mailtoHref">{{ site.content().contact.email }}</a>
        <span class="sep" aria-hidden="true">·</span>
        <a routerLink="/cv">{{ site.content().footer.cvLabel }}</a>
        <span class="sep" aria-hidden="true">·</span>
        <a [href]="site.content().social.githubUrl" target="_blank" rel="noopener noreferrer">{{
          site.content().footer.githubLabel
        }}</a>
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
        font-weight: 600;
        letter-spacing: 0.04em;
        font-size: 0.9rem;
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
        padding: 0.65rem clamp(1rem, 4vw, 1.75rem);
        border-top: 1px solid var(--volkya-border);
        background: var(--chrome-bg);
        font-size: 0.8rem;
        color: var(--text-muted);
        text-align: center;
      }
      .site-footer a {
        color: var(--text-ui);
        text-decoration: none;
      }
      .site-footer a:hover {
        color: var(--volkya-brand);
        text-decoration: underline;
      }
      .site-footer .sep {
        margin: 0 0.5rem;
        opacity: 0.5;
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
