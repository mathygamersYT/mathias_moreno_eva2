# IT Progs - EVA 1

Proyecto web para la evaluacion EVA 1 de Analista Programador.

La pagina mantiene la idea original de **IT Progs** como landing de recursos, servicios y contacto, incorporando los requisitos de la rubrica: carrusel manual, formularios, validacion en JavaScript puro, almacenamiento de usuarios en JSON y evidencia de uso de IA.

## Archivos activos

Estos son los archivos principales que usa la pagina:

```text
.
|-- index.html
|-- css/
|   |-- styles.css
|-- js/
|   |-- script.js
|-- docs/
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
- Validacion manual de campos vacios, correo, texto peligroso basico y fortaleza de contraseñas (mínimo 8 caracteres, al menos 1 mayúscula y 1 carácter especial).
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

**Cómo levantar el proyecto (paso a paso)**

- **Iniciar servidor:** desde la carpeta del proyecto ejecuta:

```bash
node server.js
```

- **Abrir la web:** visita `http://localhost:3000` en tu navegador.

- **Comprobar la API (GET):**

```bash
curl -i http://localhost:3000/api/usuarios


```bash
curl -i -X POST http://localhost:3000/api/usuarios \
	-H "Content-Type: application/json" \
	-d '{"nombre":"Prueba","email":"prueba@example.com","password":"Passw0rd!","interes":"testing","id":123,"fechaRegistro":"2026-05-12"}'
```

- **Ubicación del archivo de datos:** los usuarios se persisten en [usuarios.json](usuarios.json) en la raíz del proyecto.

- **Nota sobre el frontend y `localStorage`:** si el servidor no responde (por ejemplo no está levantado o hay un error de red), el frontend guarda temporalmente los usuarios en `localStorage` del navegador. Si ves usuarios en la UI pero [usuarios.json](usuarios.json) sigue vacío, asegúrate de que el servidor esté corriendo y registra el usuario nuevamente, o borra el `localStorage` para forzar la escritura en el servidor.

**Diagnóstico rápido**

- Si `curl` a `/api/usuarios` devuelve un error, revisa la consola donde ejecutaste `node server.js` para ver mensajes de arranque o errores.
- Para limpiar el respaldo local en el navegador: abre DevTools → Application → Local Storage → elimina la clave `itProgsUsuarios`.

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
