# IT Progs — Landing Page (EVA 1)

Landing page del proyecto **IT Progs** desarrollada con HTML, CSS y JavaScript vanilla.

Esta versión incluye una variante separada llamada **arcane**, preparada para levantarse con Docker usando `nginx`.

## Estructura del proyecto

```
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos del sitio
├── js/
│   └── scripts.js      # Funcionalidad JavaScript
├── images/             # Imágenes del sitio
│   ├── hero-team.jpg
│   ├── about-team.jpg
│   ├── feature-consultoria.jpg
│   ├── feature-desarrollo.jpg
│   ├── feature-soporte.jpg
│   ├── favicon.ico
│   └── old/            # SVGs antiguos conservados
├── docs/               # Documentación del proyecto
│   ├── ai_consultas.txt
│   └── changes_aplicados.txt
├── nginx/
│   └── default.conf    # Configuración de nginx para Docker
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Cómo usar

Abre `index.html` en tu navegador para visualizar el sitio.

## Levantar con Docker

### Opción 1: Docker Compose

```bash
docker compose up --build
```

Luego abre `http://localhost:8080`.

### Opción 2: Docker manual

```bash
docker build -t arcane .
docker run --rm -p 8080:80 arcane
```

Luego abre `http://localhost:8080`.

## Rama sugerida para GitHub

Para mantener esta variante aparte de `main`, se recomienda publicarla en una rama llamada `arcane`.

## Autor

Mathias Moreno — INACAP
