import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import type { PostEntry, ProjectEntry } from './content.models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  private readonly posts$ = this.http.get<PostEntry[]>('/assets/content/posts.json').pipe(
    map((list) => list.filter((p) => isDevMode() || !p.draft)),
    shareReplay(1),
  );

  private readonly projects$ = this.http.get<ProjectEntry[]>('/assets/content/projects.json').pipe(
    map((list) => list.filter((p) => isDevMode() || !p.draft)),
    shareReplay(1),
  );

  getPosts(): Observable<PostEntry[]> {
    return this.posts$;
  }

  getPostBySlug(slug: string): Observable<PostEntry | undefined> {
    return this.posts$.pipe(map((items) => items.find((p) => p.slug === slug)));
  }

  getProjects(): Observable<ProjectEntry[]> {
    return this.projects$;
  }

  getProjectBySlug(slug: string): Observable<ProjectEntry | undefined> {
    return this.projects$.pipe(map((items) => items.find((p) => p.slug === slug)));
  }
}
