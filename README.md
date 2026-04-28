# IT Progs - Landing Page

Landing page estatica para **IT Progs**, creada con HTML, CSS y JavaScript vanilla como parte de la EVA 1.

El proyecto incluye secciones informativas, enlaces utiles y formularios de **registro** y **login** con validaciones en el navegador.

## Funcionalidades

- Navegacion interna con scroll suave.
- Seccion hero con imagen principal.
- Tarjetas de servicios.
- Tabla de enlaces rapidos a herramientas para desarrollo.
- Formulario de registro con validacion de:
  - usuario obligatorio
  - email con formato valido
  - password de minimo 8 caracteres
  - confirmacion de password identica
- Formulario de login con validacion de campos obligatorios y formato correcto.
- Variante Docker en la rama `arcane`, servida con Nginx.

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla
- Docker Compose
- Nginx

## Estructura

```text
.
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- app.js
|   `-- scripts.js
|-- images/
|-- nginx/
|   |-- Dockerfile
|   `-- default.conf
|-- docker-compose.yml
`-- README.md
```

## Uso Local

Puedes abrir `index.html` directamente en el navegador.

Tambien puedes levantar un servidor local simple desde la raiz del proyecto:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Uso Con Docker

La rama `arcane` incluye configuracion para ejecutar el sitio con Docker Compose.

Clona el repositorio y entra al proyecto:

```bash
git clone https://github.com/mathygamersYT/mathias_moreno_eva1.git
cd mathias_moreno_eva1
```

Cambia a la rama `arcane`:

```bash
git checkout arcane
```

Levanta el contenedor:

```bash
docker compose up --build
```

Abre el sitio en:

```text
http://localhost:18180
```

Para detenerlo:

```bash
docker compose down
```

## Notas

- El contenedor usa Nginx para servir los archivos estaticos.
- El puerto interno `80` se publica como `18180` en la maquina local.
- Los formularios validan datos en frontend; no almacenan usuarios ni contrasenas.

## Autor

aki - INACAP
