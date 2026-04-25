# IT Progs — Landing Page (EVA 1)

Landing page del proyecto **IT Progs** desarrollada con HTML, CSS y JavaScript vanilla.

La rama **`arcane`** contiene una variante lista para ejecutarse con `docker compose` usando Nginx.

## Requisitos

- Git
- Docker Desktop o Docker Engine
- Puerto `18180` disponible en tu máquina

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
docker compose up --build
```

Luego abre:

```text
http://localhost:18180
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

- Esta variante construye una imagen local de Nginx con `index.html`, `css/`, `js/`, `images/` y la config de `nginx` incluidos dentro del contenedor.
- El contenedor expone el puerto `80` internamente y se publica como `18180` en local.
- Si quieres cambiar el puerto local, edita `docker-compose.yml`.

## Autor

Mathias Moreno — INACAP
