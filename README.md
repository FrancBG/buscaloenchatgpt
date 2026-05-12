# BuscaLoEnChatGPT

Sitio: [buscaloenchatgpt.com](https://buscaloenchatgpt.com) · Código: [github.com/FrancBG/buscaloenchatgpt](https://github.com/FrancBG/buscaloenchatgpt)

Parodia inspirada en **LMGTFY**: escribes una pregunta, compartes el enlace, se reproduce una animación y al final se intenta **copiar el texto al portapapeles**, se muestra un mensaje y se abre **ChatGPT** en su URL principal (`CHAT_SUBMIT_ORIGIN`, por defecto `https://chatgpt.com`) para que pegues la pregunta. Sin backend propio; proyecto **SvelteKit** + Tailwind.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Variables opcionales

- `PUBLIC_CHATGPT_ORIGIN` — Origen de la **redirección final** al chat (por defecto `https://chatgpt.com`). Detalle en `.env.example`.

## GitHub Pages (producción)

El workflow [`.github/workflows/github-pages.yaml`](.github/workflows/github-pages.yaml) construye con **adapter-static** y sube la carpeta `build`.

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

- **Docker Hub** (workflow `docker.yaml`): en el repo → **Settings → Secrets and variables → Actions**, pestañas **Variables** y **Secrets** del **repositorio**: `DOCKER_USERNAME` y `DOCKER_PASSWORD` (no hace falta un GitHub Environment salvo que el job declare `environment:`).

## Licencia

AGPL-3.0-or-later (heredada del proyecto base).
