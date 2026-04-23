import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <div class="layout-app">
      <mat-toolbar class="app-toolbar">
        <span class="brand">{{ title }}</span>
        <span class="spacer"></span>
        <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          Inicio
        </a>
        <a mat-button routerLink="/projects" routerLinkActive="active">Proyectos</a>
        <a mat-button routerLink="/blog" routerLinkActive="active">Blog</a>
        <a
          mat-icon-button
          href="https://github.com/Volkya"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <mat-icon>code</mat-icon>
        </a>
      </mat-toolbar>

      <main class="shell">
        <router-outlet />
      </main>

      <footer class="site-footer">
        <a [href]="mailtoHref">{{ contactEmail }}</a>
        <span class="sep" aria-hidden="true">·</span>
        <a href="https://github.com/Volkya" target="_blank" rel="noopener noreferrer">GitHub</a>
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
  title = 'Portfolio — Dyma Correa';
  readonly contactEmail = 'matiasdylanc@gmail.com';
  readonly mailtoHref = `mailto:${this.contactEmail}`;
}
