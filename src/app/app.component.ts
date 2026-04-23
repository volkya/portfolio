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
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .brand {
        font-weight: 600;
        letter-spacing: 0.04em;
        font-size: 0.9rem;
      }
      .shell {
        padding: 1.25rem 1.25rem 2.5rem;
        max-width: 720px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Portfolio — Dyma Correa';
}
