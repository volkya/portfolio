import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/project-list.component').then((m) => m.ProjectListComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/projects/project-detail.component').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/post-list.component').then((m) => m.PostListComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/post-detail.component').then((m) => m.PostDetailComponent),
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv/cv.component').then((m) => m.CvComponent),
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
