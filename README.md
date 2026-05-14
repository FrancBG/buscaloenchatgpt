# BuscaLoEnChatGPT

Sitio: [buscaloenchatgpt.com](https://buscaloenchatgpt.com) · Código: [github.com/FrancBG/buscaloenchatgpt](https://github.com/FrancBG/buscaloenchatgpt)

Parodia inspirada en **LMGTFY**: escribes una pregunta, compartes el enlace, se reproduce una animación y al final se intenta **copiar el texto al portapapeles**, se muestra un mensaje y se abre **ChatGPT** en su URL principal (`CHAT_SUBMIT_ORIGIN`, por defecto `https://chatgpt.com`) para que pegues la pregunta. Sin backend propio; proyecto **SvelteKit** + Tailwind.

## Desarrollo

Requisitos: **pnpm 10+** y **Node 22+** (`engines` en `package.json`, `engine-strict=true` en [`.npmrc`](.npmrc)). En GitHub Actions se usa **Node 24** y pnpm 10 ([`node.js.yaml`](.github/workflows/node.js.yaml), [`github-pages.yaml`](.github/workflows/github-pages.yaml)); para igualar CI al 100 %, usa Node 24 en local.

```bash
pnpm install
pnpm dev
```

## Variables opcionales

- `PUBLIC_CHATGPT_ORIGIN` — Origen de la **redirección final** al chat (por defecto `https://chatgpt.com`). Detalle en `.env.example`.

## GitHub Pages (producción)

El workflow [`.github/workflows/github-pages.yaml`](.github/workflows/github-pages.yaml) construye con **adapter-static** y sube la carpeta `build`. Ahí mismo, en un paso previo al build, se define **`BUILD_BASE` en el entorno del job** (`GITHUB_ENV`) según la variable de repo `PAGES_USE_ROOT_BASE` — no intervienen secretos ni Docker.

### Dominio propio `buscaloenchatgpt.com`

1. En el repo: **Settings → Pages → Build and deployment**: origen **GitHub Actions**.
2. **Variable de repositorio** (Settings → Secrets and variables → Actions → **Variables**):
   - Nombre: `PAGES_USE_ROOT_BASE`
   - Valor: `true`  
     Así el build usa **`BUILD_BASE` vacío**, necesario cuando el sitio vive en la **raíz** de `https://buscaloenchatgpt.com/` (no bajo `/buscaloenchatgpt`).
3. **DNS** en tu registrador (valores habituales; confirma en la [documentación de Pages para dominio apex](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):
   - Registros **A** hacia las IPs de GitHub Pages, o
   - **ALIAS/ANAME** si tu proveedor lo permite.
4. En **Settings → Pages → Custom domain**: `buscaloenchatgpt.com`. GitHub comprobará DNS; cuando esté verde, activa **Enforce HTTPS**.
5. El archivo [`static/CNAME`](static/CNAME) incluye `buscaloenchatgpt.com` para que el artefacto de Pages lo publique con el sitio.

### Solo URL de GitHub (`https://francbg.github.io/buscaloenchatgpt/`)

- No definas `PAGES_USE_ROOT_BASE`, o ponla distinta de `true`: el workflow usará **`BUILD_BASE=/buscaloenchatgpt`**.
- No hace falta el paso de dominio custom (puedes quitar o vaciar `static/CNAME` si no usas dominio propio).

## CI (GitHub Actions)

- **[`node.js.yaml`](.github/workflows/node.js.yaml)** — en cada PR y push a `main`: `pnpm install`, build, comprobaciones Svelte, tests unitarios y lint (job opcional de auto-fix si falla el primero).
- **[`github-pages.yaml`](.github/workflows/github-pages.yaml)** — en push a `main`: build estático y despliegue a GitHub Pages (Node 24, pnpm 10).

La imagen Docker y el workflow de publicación a registries **no** están activos en CI; para construir localmente sigue existiendo el `Dockerfile` y los scripts `docker:*` en `package.json` si los necesitas.

## Licencia

AGPL-3.0-or-later (heredada del proyecto base).
