# CI/CD — Portfolio (Angular + Yarn + Cloudflare Pages)

## Cómo está armado (mapa mental)

```
push a main / PR
        │
        ├─► GitHub Actions (CI)     → ¿compila? check ✅/❌ en el commit
        │
        └─► Cloudflare Pages (CD)   → build + publica *.pages.dev
```

- **CI** = Continuous Integration → `.github/workflows/ci.yml` (solo valida).
- **CD** = Continuous Delivery/Deploy → Cloudflare Pages conectado al repo (publica).
- **No hace falta** un workflow de deploy en GitHub: Pages ya escucha el repo.

Stack fijo del repo:

| Pieza | Valor |
|--------|--------|
| Node | **22** (`.nvmrc`) |
| Package manager | **Yarn Classic 1.22** (`packageManager` + `yarn.lock`) |
| Output del build | `dist/portfolio` |

---

## 1. Local (mismo criterio que CI)

```bash
nvm use          # Node 22
yarn --version   # debe ser 1.22.x
yarn install     # genera/actualiza yarn.lock
yarn build       # debe pasar antes de pushear a main
```

**Reglas**

- Commiteá siempre `yarn.lock`.
- No borres el lockfile para “arreglar” Cloudflare.
- Si agregás deps: `yarn add …` → commit de `package.json` + `yarn.lock`.

---

## 2. GitHub Actions (CI)

Archivo: `.github/workflows/ci.yml`

En cada push/PR a `main`/`master`:

1. Checkout
2. Node 22 (desde `.nvmrc`)
3. Activa Yarn **1.22.22** (Corepack)
4. `yarn install --frozen-lockfile` (falla si el lock no coincide)
5. `yarn build`

Ver runs: repo → **Actions**.
La ❌ del commit = falló este check (el sitio en Pages puede seguir online igual).

---

## 3. Cloudflare Pages (CD)

Pages → tu proyecto → **Settings** → **Builds**:

| Campo | Valor |
|--------|--------|
| Framework preset | None |
| Build command | `npx -y yarn@1.22.22 install --frozen-lockfile && npx -y yarn@1.22.22 build` |
| Build output directory | `dist/portfolio` |
| Root directory | `/` |
| Production branch | `main` |

**Environment variables**

| Name | Value |
|------|--------|
| `NODE_VERSION` | `22` |
| `SKIP_DEPENDENCY_INSTALL` | `true` |

`SKIP_DEPENDENCY_INSTALL=true` evita que Pages instale solo con Yarn 4 antes de tu comando (error `YN0028`).

El `npx yarn@1.22.22` fuerza Classic, alineado con local y con Actions.

**SPA:** `src/_redirects` se copia al build → rutas `/blog`, `/projects/...` sirven `index.html`.

Cada push a `main` → deploy nuevo. PRs (si están habilitados) → preview URL.

**Nota:** Rename del proyecto **no** cambia el `*.pages.dev` ya creado. Para otra URL: borrar el proyecto Pages y crearlo de nuevo con el nombre deseado.

---

## 4. Checklist cuando algo falla

| Síntoma | Dónde mirar |
|---------|-------------|
| ❌ en el commit de GitHub | Actions → log del job `build` |
| Sitio no actualiza / build rojo en CF | Pages → Deployments → Build log |
| `YN0028` / Yarn 4 | `SKIP_DEPENDENCY_INSTALL` + comando con `yarn@1.22.22` |
| `frozen-lockfile` | Corré `yarn install` local, commit del `yarn.lock` |
| Rutas 404 en deep link | `_redirects` en el output del build |

---

## Netlify (alternativa CD)

- Build: `npx -y yarn@1.22.22 install --frozen-lockfile && npx -y yarn@1.22.22 build`
- Publish: `dist/portfolio`
- Node 22 en env vars si hace falta
