import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import type { SiteCopy } from './site-copy.model';
import { SITE_COPY_FALLBACK } from './site-copy.fallback';
import { SiteCopyService } from './site-copy.service';

export function loadSiteCopyFactory(http: HttpClient, site: SiteCopyService): () => Promise<unknown> {
  return () =>
    firstValueFrom(
      http.get<SiteCopy>('/assets/site.json').pipe(
        tap((data) => site.init(data)),
        catchError((err) => {
          console.error('[site.json] No se pudo cargar; usando fallback embebido.', err);
          site.init(SITE_COPY_FALLBACK);
          return of(null);
        }),
      ),
    );
}

export const SITE_COPY_INITIALIZER: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadSiteCopyFactory,
  deps: [HttpClient, SiteCopyService],
  multi: true,
};
