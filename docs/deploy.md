# Deploy gratis (Angular portfolio)

## Cloudflare Pages (recomendado)

1. En [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Elegí el repo `portfolio` (o el nombre que tengas en GitHub).
3. Configuración de build:

| Campo | Valor |
|--------|--------|
| Framework preset | None (o “Angular” si aparece; no es obligatorio) |
| Build command | `yarn install --frozen-lockfile && yarn build` |
| Build output directory | `dist/portfolio` |
| Root directory | `/` (raíz del repo) |
| Node version (Environment variables) | `NODE_VERSION` = `22` |

**Importante:** el repo usa **Yarn Classic (1.22)**, no Yarn Berry (4.x). Cloudflare a veces activa Yarn 4 y falla con `YN0028` (quiere reescribir el lockfile). El campo `packageManager` en `package.json` fija Yarn 1. Si igual falla, en Pages → Settings → Builds:

- Environment variable: `SKIP_DEPENDENCY_INSTALL` = `true`
- Build command: `npx -y yarn@1.22.22 install --frozen-lockfile && npx -y yarn@1.22.22 build`

O, equivalente: `npm install && npm run build` (npm también sirve; Yarn está porque el proyecto ya tenía `yarn.lock`).

4. Variables de entorno: no hace falta para este proyecto.
5. **Rutas SPA**: el archivo `src/_redirects` se copia al build y hace que `/blog`, `/projects/...`, etc. carguen `index.html` (status 200). No requiere configuración extra en Cloudflare.

6. Dominio: Pages te da `*.pages.dev` gratis; podés sumar tu dominio en el mismo flujo.

Cada push a `main` (o la rama que elijas) dispara un deploy nuevo.

---

## Netlify (alternativa)

- Build command: `yarn install --frozen-lockfile && yarn build`
- Publish directory: `dist/portfolio`
- El mismo `_redirects` aplica para el client-side router.

---

## GitHub Actions

El workflow `.github/workflows/ci.yml` corre `yarn build` en cada push/PR a `main` o `master` para validar que el proyecto compile. El deploy lo hace Cloudflare (o Netlify) al conectar el repo; no hace falta un workflow de deploy en GitHub salvo que quieras deploy manual por Actions.

---

## Node

El CI usa Node **22** (alineado con tu README). Si Cloudflare te deja elegir versión de Node, usá **22** para coincidir.
