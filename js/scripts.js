// Espera a que el DOM este cargado antes de registrar eventos.
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
});
