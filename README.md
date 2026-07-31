# Portfolio - Dyma Correa

Mi portfolio personal construido con **Angular 18** y **Angular Material**.

## 🚀 Tecnologías Utilizadas

- **Angular 18** - Framework principal
- **Angular Material** - Componentes UI
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos
- **Node.js 22** - Entorno de desarrollo
- **Yarn** - Gestor de paquetes

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 22+ (se maneja con nvm)
- Yarn

### Configuración del entorno

```bash
# Cambiar a la versión correcta de Node.js
nvm use

# Instalar dependencias
yarn install

# Ejecutar servidor de desarrollo
yarn start
```

### Scripts disponibles

- `yarn start` - Genera contenido desde Markdown y levanta el servidor (http://localhost:4200)
- `yarn build` - Genera contenido + build de producción
- `yarn content` - Solo regenera `posts.json` / `projects.json` desde `content/`
- `yarn test` - Ejecutar tests
- `yarn lint` - Verificar código

### Blog (Markdown → sitio)

1. Creá un archivo en `content/posts/mi-nota.md`
2. Front matter + cuerpo Markdown
3. `yarn start` (o `yarn content`) escribe `src/assets/content/posts.json`

```yaml
---
title: My note
date: 2026-07-29
description: Short blurb for the list
tags: [Backend]
platforms:
  - name: Dev.to
    url: https://dev.to/you/my-note
---

Your markdown body here.
```

`platforms` aparecen como pills clickeables en el blog. `draft: true` oculta el post en producción.

## 📁 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── .nvmrc
```

## 🎨 Características

- ✅ Responsive design
- ✅ Angular Material components
- ✅ TypeScript strict mode
- ✅ SCSS styling
- ✅ Routing configurado
- ✅ Tema personalizado de Material

## CI/CD

- **CI:** GitHub Actions (`.github/workflows/ci.yml`) — valida `yarn build` en push/PR.
- **CD:** Cloudflare Pages — publica en cada push a `main`.

Guía completa (Yarn Classic, env vars de Pages, troubleshooting): [`docs/deploy.md`](docs/deploy.md).

## 📧 Contacto

**Dyma Correa**  
📧 matiasdylanc@gmail.com  
🐙 [GitHub](https://github.com/Volkya/portfolio) 