# IT Progs - Landing Page

Landing page estatica para **IT Progs**, desarrollada con HTML, CSS y JavaScript vanilla como parte de la EVA 1.

El sitio presenta servicios, recursos utiles para desarrollo y dos formularios funcionales con validaciones en frontend.

## Funcionalidades

- Navegacion interna con scroll suave.
- Seccion principal con imagen hero.
- Tarjetas de servicios.
- Tabla de enlaces rapidos a herramientas de desarrollo.
- Formulario de registro con validacion de usuario, email, contrasena y confirmacion.
- Formulario de login con validacion de email y contrasena.
- Diseno responsive para escritorio y dispositivos moviles.

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla

## Estructura Del Proyecto

```text
.
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- app.js
|   `-- scripts.js
|-- images/
|   |-- hero-team.jpg
|   |-- about-team.jpg
|   |-- feature-consultoria.jpg
|   |-- feature-desarrollo.jpg
|   |-- feature-soporte.jpg
|   `-- favicon.ico
|-- docs/
|   |-- ai_consultas.txt
|   `-- changes_aplicados.txt
`-- README.md
```

## Uso Local

La forma mas simple es abrir `index.html` directamente en el navegador.

Tambien puedes levantar un servidor local desde la raiz del proyecto:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Formularios

El archivo `js/app.js` contiene las validaciones principales:

- email con formato valido mediante expresion regular
- contrasena de minimo 8 caracteres
- confirmacion de contrasena igual a la original
- campos obligatorios en registro y login

## Rama Docker

La rama `arcane` contiene una variante preparada para ejecutarse con Docker Compose y Nginx.

```bash
git checkout arcane
docker compose up --build
```

## Autor

aki - INACAP
