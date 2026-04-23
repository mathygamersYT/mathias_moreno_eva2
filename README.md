# IT Progs — Landing Page (EVA 1)

Landing page del proyecto **IT Progs** desarrollada con HTML, CSS y JavaScript vanilla.

La rama **`arcane`** contiene una variante lista para ejecutarse con `docker compose` usando directamente `nginx:alpine`.

## Requisitos

- Git
- Docker Desktop o Docker Engine
- Puerto `8080` disponible en tu máquina

## Levantar la versión Docker (`arcane`)

Si todavía no tienes el proyecto:

```bash
git clone https://github.com/mathygamersYT/mathias_moreno_eva1.git
cd mathias_moreno_eva1
git checkout arcane
```

Si ya tienes el proyecto clonado:

```bash
git checkout arcane
git pull origin arcane
```

## Ejecutar con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up
```

Luego abre:

```text
http://localhost:8080
```

Para detenerlo:

```bash
docker compose down
```

## Estructura principal

```text
├── index.html
├── css/
├── js/
├── images/
├── nginx/
│   └── default.conf
├── docker-compose.yml
└── README.md
```

## Notas

- Esta variante sirve el sitio estático con la imagen `nginx:alpine`.
- `docker-compose.yml` monta `index.html`, `css/`, `js/`, `images/` y la config de `nginx` como volúmenes de solo lectura.
- El contenedor expone el puerto `80` internamente y se publica como `8080` en local.
- Si quieres cambiar el puerto local, edita `docker-compose.yml`.

## Autor

Mathias Moreno — INACAP
