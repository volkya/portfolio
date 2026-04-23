import { Injectable, computed, signal } from '@angular/core';
import type { SiteCopy } from './site-copy.model';

@Injectable({ providedIn: 'root' })
export class SiteCopyService {
  private readonly _copy = signal<SiteCopy | null>(null);

  init(data: SiteCopy): void {
    this._copy.set(data);
  }

  /** Textos del sitio (después de `APP_INITIALIZER`). */
  readonly content = computed(() => {
    const c = this._copy();
    if (!c) {
      throw new Error('SiteCopyService: site.json no se cargó. Revisá APP_INITIALIZER y assets/site.json.');
    }
    return c;
  });
}
