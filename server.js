const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "usuarios.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml"
};

function asegurarUsuariosJson() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

function leerUsuarios() {
  asegurarUsuariosJson();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(usuarios, null, 2), "utf8");
}

function responderJSON(respuesta, estado, datos) {
  respuesta.writeHead(estado, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  respuesta.end(JSON.stringify(datos));
}

function leerCuerpo(peticion) {
  return new Promise((resolve, reject) => {
    let cuerpo = "";

    peticion.on("data", (fragmento) => {
      cuerpo += fragmento;
    });

    peticion.on("end", () => resolve(cuerpo));
    peticion.on("error", reject);
  });
}

async function manejarAPI(peticion, respuesta) {
  if (peticion.url === "/api/usuarios" && peticion.method === "GET") {
    responderJSON(respuesta, 200, leerUsuarios());
    return;
  }

  if (peticion.url === "/api/usuarios" && peticion.method === "POST") {
    const nuevoUsuario = JSON.parse(await leerCuerpo(peticion));
    const usuarios = leerUsuarios();

    if (usuarios.some((usuario) => usuario.email === nuevoUsuario.email)) {
      responderJSON(respuesta, 409, { mensaje: "Este correo ya esta inscrito." });
      return;
    }

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    responderJSON(respuesta, 201, nuevoUsuario);
    return;
  }

  responderJSON(respuesta, 404, { mensaje: "Ruta API no encontrada." });
}

function servirArchivo(peticion, respuesta) {
  const urlLimpia = decodeURIComponent(peticion.url.split("?")[0]);
  const rutaSolicitada = urlLimpia === "/" ? "/index.html" : urlLimpia;
  const rutaArchivo = path.normalize(path.join(ROOT, rutaSolicitada));

  if (!rutaArchivo.startsWith(ROOT)) {
    respuesta.writeHead(403);
    respuesta.end("Acceso denegado");
    return;
  }

  fs.readFile(rutaArchivo, (error, contenido) => {
    if (error) {
      respuesta.writeHead(404);
      respuesta.end("Archivo no encontrado");
      return;
    }

    const extension = path.extname(rutaArchivo).toLowerCase();
    respuesta.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    respuesta.end(contenido);
  });
}

const servidor = http.createServer(async (peticion, respuesta) => {
  try {
    if (peticion.url.startsWith("/api/")) {
      await manejarAPI(peticion, respuesta);
      return;
    }

    servirArchivo(peticion, respuesta);
  } catch (error) {
    responderJSON(respuesta, 500, { mensaje: "Error interno del servidor.", detalle: error.message });
  }
});

servidor.listen(PORT, () => {
  console.log(`Servidor local disponible en http://localhost:${PORT}`);
});
