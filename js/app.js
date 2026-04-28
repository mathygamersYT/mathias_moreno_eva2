const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registroForm = document.getElementById("registroForm");
const loginForm = document.getElementById("loginForm");
const mensajeRegistro = document.getElementById("mensajeRegistro");
const mensajeLogin = document.getElementById("mensajeLogin");

function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = "form-message " + tipo;
}

registroForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuarioRegistro").value.trim();
    const email = document.getElementById("emailRegistro").value.trim();
    const password = document.getElementById("passwordRegistro").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;

    if (usuario === "" || email === "" || password === "" || confirmarPassword === "") {
        mostrarMensaje(mensajeRegistro, "Por favor, completa todos los campos.", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        mostrarMensaje(mensajeRegistro, "Ingresa un email válido.", "error");
        return;
    }

    if (password.length < 8) {
        mostrarMensaje(mensajeRegistro, "La contraseña debe tener al menos 8 caracteres.", "error");
        return;
    }

    if (password !== confirmarPassword) {
        mostrarMensaje(mensajeRegistro, "Las contraseñas no coinciden.", "error");
        return;
    }

    mostrarMensaje(mensajeRegistro, "Registro exitoso. Bienvenido, " + usuario + "!", "success");
    registroForm.reset();
});

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value;

    if (email === "" || password === "") {
        mostrarMensaje(mensajeLogin, "Por favor, completa todos los campos.", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        mostrarMensaje(mensajeLogin, "Ingresa un email válido.", "error");
        return;
    }

    if (password.length < 8) {
        mostrarMensaje(mensajeLogin, "La contraseña debe tener al menos 8 caracteres.", "error");
        return;
    }

    mostrarMensaje(mensajeLogin, "Ingreso exitoso.", "success");
    loginForm.reset();
});
