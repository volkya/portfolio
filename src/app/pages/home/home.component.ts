import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <section class="hero">
      <mat-card class="hero-card surface-card" appearance="outlined">
        <mat-card-header class="card-head-chrome">
          <mat-card-title>¡Hola! Soy Dyma Correa</mat-card-title>
          <mat-card-subtitle>Software full stack · Argentina (GMT-3)</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="content-well">
          <p>
            Bienvenido a mi portfolio. Proyectos y notas salen de Markdown en el repo; el detalle
            técnico sigue en GitHub.
          </p>
        </mat-card-content>
        <div class="stack-strip" aria-label="Stack principal">
          <span class="stack-label">Stack</span>
          <span class="stack-items">Angular · TypeScript · Node</span>
        </div>
        <mat-card-actions align="end">
          <a mat-raised-button color="primary" routerLink="/projects">Proyectos</a>
          <a mat-stroked-button class="btn-pill-outline" routerLink="/blog">Blog</a>
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
    `,
  ],
})
export class HomeComponent {}
