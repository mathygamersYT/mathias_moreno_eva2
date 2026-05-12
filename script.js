// Estado de la aplicacion: se carga desde usuarios.json y se usa para validar registro/login en memoria.
const usuariosInscritos = [];
const API_USUARIOS = "/api/usuarios";
const STORAGE_KEY = "itProgsUsuarios";

// Modelo simple de usuario. En una app real la contrasena se guardaria con hash en backend.
class Usuario {
  constructor(nombre, email, password, interes) {
    this.id = Date.now();
    this.nombre = nombre;
    this.email = email.toLowerCase();
    this.password = password;
    this.interes = interes;
    this.fechaRegistro = new Date().toLocaleString("es-CL");
  }
}

const imagenesCarrusel = [
  {
    src: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1400",
    alt: "Computador gamer con iluminacion RGB y componentes internos visibles",
    titulo: "PC Gaming Ryzen 7800X3D",
    texto: "Equipo pensado para baja latencia, alto FPS y juegos competitivos."
  },
  {
    src: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1400",
    alt: "Tarjeta grafica moderna instalada en una placa madre",
    titulo: "Radeon RX 7900 XTX",
    texto: "GPU de 24 GB de VRAM para gaming 4K, streaming y creacion de contenido."
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1400",
    alt: "Rack de servidores usado para virtualizacion y redes",
    titulo: "Homelab Proxmox con Intel 125H",
    texto: "Nodo eficiente para VMs, contenedores LXC, NAS, monitoreo y laboratorios de red."
  }
];

let indiceImagenActual = 0;
let carouselTimer = null;

// Punto de arranque: primero se conectan eventos, luego se cargan datos y se pinta el DOM.
document.addEventListener("DOMContentLoaded", async () => {
  configurarMenuMovil();
  configurarPopups();
  configurarFormularios();
  await cargarUsuarios();
  actualizarDOM();
  // Inicia avance automatico del carrusel
  startAutoAdvance();
});

function configurarMenuMovil() {
  const boton = document.getElementById("menuButton");
  const menu = document.getElementById("mainMenu");

  boton.addEventListener("click", () => {
    const estaAbierto = menu.classList.toggle("show");
    boton.setAttribute("aria-expanded", estaAbierto.toString());
  });
}

// Centraliza los popups para mantener Registro y Login con el mismo comportamiento.
function configurarPopups() {
  document.getElementById("abrirLogin").addEventListener("click", () => abrirPopup("loginPopup", "loginEmail"));
  document.getElementById("cerrarLogin").addEventListener("click", () => cerrarPopup("loginPopup"));
  document.getElementById("abrirRegistro").addEventListener("click", () => abrirPopup("registroPopup", "registroNombre"));
  document.getElementById("abrirRegistroHero").addEventListener("click", () => abrirPopup("registroPopup", "registroNombre"));
  document.getElementById("cerrarRegistro").addEventListener("click", () => cerrarPopup("registroPopup"));

  document.querySelectorAll(".login-popup").forEach((popup) => {
    popup.addEventListener("click", (evento) => {
      if (evento.target === popup) {
        cerrarPopup(popup.id);
      }
    });
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      document.querySelectorAll(".login-popup.is-open").forEach((popup) => cerrarPopup(popup.id));
    }
  });
}

function configurarFormularios() {
  document.getElementById("formInscripcion").addEventListener("submit", procesarInscripcion);
  document.getElementById("formLogin").addEventListener("submit", procesarLogin);
  document.getElementById("formContacto").addEventListener("submit", procesarContacto);
}

// Entrada de datos desde el JSON: el servidor local evita depender de archivos seleccionados manualmente.
async function cargarUsuarios() {
  try {
    const respuesta = await fetch(API_USUARIOS, { cache: "no-store" });

    if (!respuesta.ok) {
      throw new Error("No se pudo leer usuarios.json desde el servidor local.");
    }

    const usuarios = await respuesta.json();
    usuariosInscritos.splice(0, usuariosInscritos.length, ...usuarios);
  } catch (error) {
    const usuariosLocales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    usuariosInscritos.splice(0, usuariosInscritos.length, ...usuariosLocales);
  }
}

// Salida de datos hacia usuarios.json: POST al servidor local y respaldo local solo si se abre sin servidor.
async function guardarUsuario(nuevoUsuario) {
  try {
    const respuesta = await fetch(API_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "No se pudo guardar el usuario.");
    }

    return datos;
  } catch (error) {
    guardarEnLocalStorage(nuevoUsuario);
    return nuevoUsuario;
  }
}

// Validacion manual: no se confia solo en HTML5 para cumplir la rubrica y controlar mensajes propios.
function validarDatos(formulario) {
  const campos = Array.from(formulario.querySelectorAll("input, textarea, select"));
  const errores = [];
  const emailRegex = /^(?!.*\.\.)(?!.*[<>"'`;])([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}$/;
  const textoPeligrosoRegex = /<[^>]*>|javascript:|onerror=|onload=|script/gi;

  limpiarEstadoCampos(campos);

  campos.forEach((campo) => {
    const valor = campo.value.trim();
    const etiqueta = obtenerTextoLabel(campo);

    if (valor === "") {
      errores.push(`${etiqueta} no puede estar vacio.`);
      marcarCampoInvalido(campo);
      return;
    }

    if (campo.name.toLowerCase().includes("email") && !emailRegex.test(valor)) {
      errores.push(`${etiqueta} debe tener un formato de correo valido.`);
      marcarCampoInvalido(campo);
    }

    if (textoPeligrosoRegex.test(valor)) {
      errores.push(`${etiqueta} contiene texto no permitido por seguridad.`);
      marcarCampoInvalido(campo);
    }

    textoPeligrosoRegex.lastIndex = 0;
  });

  const password = formulario.querySelector('input[type="password"]');
  if (password && password.value.trim().length < 8) {
    errores.push("La contrasena debe tener al menos 8 caracteres.");
    marcarCampoInvalido(password);
  }

  return {
    valido: errores.length === 0,
    errores
  };
}

// Registro: valida, evita correos repetidos y persiste el nuevo usuario en usuarios.json.
async function procesarInscripcion(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const resultado = validarDatos(formulario);
  const mensaje = document.getElementById("mensajeInscripcion");
  const salida = document.getElementById("salidaRegistro");

  if (!resultado.valido) {
    mostrarMensaje(mensaje, resultado.errores.join(" "), "error");
    salida.textContent = "";
    return;
  }

  const email = limpiarTexto(document.getElementById("registroEmail").value).toLowerCase();
  const existeUsuario = usuariosInscritos.some((usuario) => usuario.email === email);

  if (existeUsuario) {
    mostrarMensaje(mensaje, "Este correo ya esta inscrito.", "error");
    marcarCampoInvalido(document.getElementById("registroEmail"));
    salida.textContent = "";
    return;
  }

  const nuevoUsuario = new Usuario(
    limpiarTexto(document.getElementById("registroNombre").value),
    email,
    document.getElementById("registroPassword").value.trim(),
    limpiarTexto(document.getElementById("registroInteres").value)
  );

  try {
    const usuarioGuardado = await guardarUsuario(nuevoUsuario);
    usuariosInscritos.push(usuarioGuardado);
    formulario.reset();
    mostrarMensaje(mensaje, "", "success");
    salida.textContent = "Registro correcto!";
    actualizarDOM();
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
    salida.textContent = "";
  }
}

// Login: compara contra los usuarios cargados desde JSON y muestra una salida limpia sin contrasena.
function procesarLogin(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const resultado = validarDatos(formulario);
  const mensaje = document.getElementById("mensajeLogin");
  const salida = document.getElementById("salidaLogin");

  if (!resultado.valido) {
    mostrarMensaje(mensaje, resultado.errores.join(" "), "error");
    salida.value = "Salida: credenciales rechazadas por validacion.";
    return;
  }

  const email = limpiarTexto(document.getElementById("loginEmail").value).toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();
  const usuario = usuariosInscritos.find((item) => item.email === email && item.password === password);

  if (!usuario) {
    mostrarMensaje(mensaje, "Credenciales incorrectas o usuario no registrado.", "error");
    salida.value = "Salida: no existe una coincidencia en usuarios.json.";
    return;
  }

  formulario.reset();
  mostrarMensaje(mensaje, `Bienvenido/a, ${usuario.nombre}.`, "success");
  salida.value = `Salida JSON: ${JSON.stringify(sinPassword(usuario))}`;
}

// Contacto no persiste datos; solo demuestra validacion independiente para el tercer formulario.
function procesarContacto(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const resultado = validarDatos(formulario);
  const mensaje = document.getElementById("mensajeContacto");

  if (!resultado.valido) {
    mostrarMensaje(mensaje, resultado.errores.join(" "), "error");
    return;
  }

  formulario.reset();
  mostrarMensaje(mensaje, "Mensaje enviado. Te contactaremos para revisar tu solicitud.", "success");
}

// Funcion requerida por la rubrica: cambia el indice y luego actualiza la interfaz.
function cambiarImagen(direccion) {
  indiceImagenActual += direccion;

  if (indiceImagenActual < 0) {
    indiceImagenActual = imagenesCarrusel.length - 1;
  }

  if (indiceImagenActual >= imagenesCarrusel.length) {
    indiceImagenActual = 0;
  }

  actualizarDOM();
}

// Funcion requerida por la rubrica: centraliza actualizaciones visibles del DOM.
function actualizarDOM() {
  actualizarCarrusel();
}

// Render del carrusel: modifica src, alt, titulo, texto, contador e indicadores desde el arreglo.
function actualizarCarrusel() {
  const imagen = imagenesCarrusel[indiceImagenActual];
  const imagenDOM = document.getElementById("imagenCarrusel");
  const tituloDOM = document.getElementById("tituloCarrusel");
  const textoDOM = document.getElementById("textoCarrusel");
  const contadorDOM = document.getElementById("contadorCarrusel");
  const indicadoresDOM = document.getElementById("indicadoresCarrusel");

  imagenDOM.src = imagen.src;
  imagenDOM.alt = imagen.alt;
  tituloDOM.textContent = imagen.titulo;
  textoDOM.textContent = imagen.texto;
  contadorDOM.textContent = `${indiceImagenActual + 1} / ${imagenesCarrusel.length}`;

  indicadoresDOM.innerHTML = "";
  imagenesCarrusel.forEach((_, indice) => {
    const punto = document.createElement("button");
    punto.className = `carousel-dot${indice === indiceImagenActual ? " active" : ""}`;
    punto.type = "button";
    punto.setAttribute("aria-label", `Ir a imagen ${indice + 1}`);
    punto.addEventListener("click", () => {
      indiceImagenActual = indice;
      actualizarDOM();
    });
    indicadoresDOM.appendChild(punto);
  });

    // Reinicia el temporizador para que el auto-advance se mantenga tras interacciones manuales
    startAutoAdvance();
}

  // Temporizador que avanza el carrusel automaticamente cada 5 segundos.
  function startAutoAdvance() {
    stopAutoAdvance();
    carouselTimer = setInterval(() => {
      cambiarImagen(1);
    }, 5000);
  }

  function stopAutoAdvance() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

// Abre una capa flotante y manda el foco al primer campo para mejorar el flujo del usuario.
function abrirPopup(idPopup, idPrimerCampo) {
  const popup = document.getElementById(idPopup);
  popup.classList.add("is-open");
  popup.setAttribute("aria-hidden", "false");
  document.getElementById(idPrimerCampo).focus();
}

// Cierra el popup sin borrar datos, por si el usuario lo abrio por error.
function cerrarPopup(idPopup) {
  const popup = document.getElementById(idPopup);
  popup.classList.remove("is-open");
  popup.setAttribute("aria-hidden", "true");
}

function limpiarEstadoCampos(campos) {
  campos.forEach((campo) => campo.classList.remove("is-invalid-manual"));
}

function marcarCampoInvalido(campo) {
  campo.classList.add("is-invalid-manual");
}

function obtenerTextoLabel(campo) {
  const etiqueta = document.querySelector(`label[for="${campo.id}"]`);
  return etiqueta ? etiqueta.textContent : campo.name;
}

function limpiarTexto(texto) {
  return texto.trim().replace(/[<>]/g, "");
}

function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `form-message mt-3 ${tipo}`;
}

// Evita mostrar la contrasena en mensajes de salida del login.
function sinPassword(usuario) {
  const { password, ...datosPublicos } = usuario;
  return datosPublicos;
}

// Respaldo para pruebas abriendo index.html directamente, aunque el flujo recomendado es node server.js.
function guardarEnLocalStorage(nuevoUsuario) {
  const usuariosLocales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (usuariosLocales.some((usuario) => usuario.email === nuevoUsuario.email)) {
    throw new Error("Este correo ya esta inscrito.");
  }

  usuariosLocales.push(nuevoUsuario);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuariosLocales));
}
