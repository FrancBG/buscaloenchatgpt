# BuscaLoEnChatGPT

Sitio: [buscaloenchatgpt.com](https://buscaloenchatgpt.com) · Código: [github.com/FrancBG/buscaloenchatgpt](https://github.com/FrancBG/buscaloenchatgpt)

Parodia inspirada en **LMGTFY**: en la home escribes una pregunta y obtienes un **enlace compartible** (`/ask?q=...`); al abrirlo se reproduce la animación y al final se intenta **copiar el texto al portapapeles**, se muestra un mensaje y se abre **ChatGPT** para pegar la pregunta. El destino del formulario GET en `/ask` es el origen del chat (variable pública **`PUBLIC_CHATGPT_ORIGIN`**, por defecto `https://chatgpt.com`). Sin backend propio; proyecto **SvelteKit** + Tailwind.

## Desarrollo

- **Node:** mínimo según `engines` en [`package.json`](package.json) (**22+**). En **GitHub Actions** los workflows usan **Node 24**; para reproducir CI al pie de la letra, usa Node 24 en local.
- **pnpm:** mínimo **10** (`engines.pnpm`). La versión concreta que instala CI está fijada en **`packageManager`** del mismo `package.json` (Corepack / `pnpm/action-setup` leen ese campo; no dupliques otra versión en el YAML).
- **`engine-strict=true`** en [`.npmrc`](.npmrc): si `pnpm install` falla por versión, actualiza Node o pnpm.

```bash
pnpm install
pnpm dev
```

## Variables opcionales

- **`PUBLIC_CHATGPT_ORIGIN`** — Origen del **formulario/redirección** final al chat (solo origin con protocolo). Por defecto `https://chatgpt.com`. Detalle en [`.env.example`](.env.example).
- **Build estático local (como en Pages):** en `.env` o `.env.local` puedes definir **`BUILD_BASE`** (vacío o `/buscaloenchatgpt`) y, si hace falta, **`BUILD_ADAPTER=static`**; lo consume [`svelte.config.js`](svelte.config.js) (prefijo `BUILD_` vía Vite `loadEnv`).

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

- **[`node.js.yaml`](.github/workflows/node.js.yaml)** — en PR, push y **merge queue** hacia `main`: `pnpm install --frozen-lockfile --strict-peer-dependencies`, build, `svelte-check`, tests unitarios y lint. Si el job `test` falla, el job `fix` (solo en PR/push, no bots) puede reparar lockfile, formato y lint y hacer push.
- **[`github-pages.yaml`](.github/workflows/github-pages.yaml)** — en push a `main`: `pnpm install --frozen-lockfile`, build estático y despliegue a GitHub Pages (**Node 24**; pnpm desde `packageManager` en `package.json`). Incluye `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` para las acciones JS que aún avisaban por Node 20.

La imagen Docker y la publicación a registries **no** están en CI; para uso local siguen el [`Dockerfile`](Dockerfile) y los scripts `docker:*` en `package.json`.

## Licencia

AGPL-3.0-or-later (heredada del proyecto base).
