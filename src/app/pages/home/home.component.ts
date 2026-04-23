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
    `,
  ],
})
export class HomeComponent {}
