# IT Progs - EVA 1

Proyecto web para la evaluacion EVA 1 de Analista Programador.

La pagina mantiene la idea original de **IT Progs** como landing de recursos, servicios y contacto, incorporando los requisitos de la rubrica: carrusel manual, formularios, validacion en JavaScript puro, almacenamiento de usuarios en JSON y evidencia de uso de IA.

## Archivos activos

Estos son los archivos principales que usa la pagina:

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- server.js
|-- usuarios.json
|-- ia_consultas.txt
|-- images/
|   |-- hero-team.jpg
|   |-- about-team.jpg
|   |-- feature-consultoria.jpg
|   |-- feature-desarrollo.jpg
|   |-- feature-soporte.jpg
|   `-- favicon.ico
`-- README.md
```

## Funcionalidades

- Carrusel visual con Bootstrap 5, controlado manualmente con JavaScript puro.
- Popup de registro.
- Popup de login.
- Formulario de contacto.
- Validacion manual de campos vacios, correo y texto peligroso basico.
- Arreglo global `usuariosInscritos`.
- Clase `Usuario`.
- Funciones requeridas: `validarDatos()`, `cambiarImagen()` y `actualizarDOM()`.
- Servidor local en Node para guardar usuarios en `usuarios.json`.

## Uso local

Ejecuta el servidor desde la raiz del proyecto:

```bash
node server.js
```

Luego abre:

```text
http://localhost:3000
```

El servidor entrega la pagina y habilita la ruta `/api/usuarios` para leer y escribir en `usuarios.json`.

## Evidencia IA

El archivo `ia_consultas.txt` contiene los prompts simulados usados para crear las validaciones, el carrusel y los ajustes principales del proyecto.

## Control de versiones

La rubrica solicita al menos tres commits:

```text
Estructura
Logica JS
Final
```

En el historial del repositorio se encuentran esos commits aplicados en la rama `main`.
