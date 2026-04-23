# IT Progs — Landing Page (EVA 1)

Landing page del proyecto **IT Progs** desarrollada con HTML, CSS y JavaScript vanilla.

La rama **`arcane`** contiene una variante lista para ejecutarse con Docker usando `nginx`.

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
docker compose up --build
```

Luego abre:

```text
http://localhost:8080
```

Para detenerlo:

```bash
docker compose down
```

## Ejecutar con Docker manual

Construir la imagen:

```bash
docker build -t arcane .
```

Levantar el contenedor:

```bash
docker run --rm -p 8080:80 arcane
```

Abrir en el navegador:

```text
http://localhost:8080
```

## Estructura principal

```text
├── index.html
├── css/
├── js/
├── images/
├── nginx/
│   └── default.conf
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Notas

- Esta variante sirve el sitio estático con `nginx`.
- El contenedor expone el puerto `80` internamente y se publica como `8080` en local.
- Si quieres cambiar el puerto local, edita `docker-compose.yml`.

## Autor

Mathias Moreno — INACAP
