# BuscaLoEnChatGPT

Repositorio: [github.com/FrancBG/buscaloenchatgpt](https://github.com/FrancBG/buscaloenchatgpt)

Parodia inspirada en **LMGTFY**: escribes una pregunta, compartes el enlace, se reproduce una animación y al final se intenta **copiar el texto al portapapeles**, se muestra un mensaje y se abre **ChatGPT** en su URL principal (`CHAT_SUBMIT_ORIGIN`, por defecto `https://chatgpt.com`) para que pegues la pregunta. Sin backend propio; proyecto **SvelteKit** + Tailwind.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Variables opcionales

- `PUBLIC_CHATGPT_ORIGIN` — Origen de la **redirección final** al chat (por defecto `https://chatgpt.com`). Detalle en `.env.example`.

## CI (GitHub Actions)

- **Docker Hub** (workflow `docker.yaml`): en el repo → **Settings → Secrets and variables → Actions**, pestañas **Variables** y **Secrets** del **repositorio**: `DOCKER_USERNAME` y `DOCKER_PASSWORD` (no hace falta un GitHub Environment salvo que el job declare `environment:`).

## Licencia

AGPL-3.0-or-later (heredada del proyecto base).
