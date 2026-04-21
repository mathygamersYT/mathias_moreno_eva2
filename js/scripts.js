// Espera a que el DOM esté cargado antes de registrar eventos.
document.addEventListener('DOMContentLoaded', () => {
  // Maneja el scroll suave para enlaces internos (#hash).
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');

      if (href.length > 1) {
        const target = document.querySelector(href);

        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  // Maneja el formulario de contacto con un mensaje de confirmación.
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('Gracias por tu mensaje. Pronto nos pondremos en contacto.');
      form.reset();
    });
  }
});
