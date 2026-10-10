(() => {
  const langButton = document.getElementById('lang-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  let language = 'es';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-es][data-en]').forEach((el) => {
      const value = el.dataset[language];
      if (value !== undefined) el.innerHTML = value;
    });
    langButton.textContent = language === 'es' ? 'EN' : 'ES';
    langButton.setAttribute('aria-label', language === 'es' ? 'Switch language to English' : 'Cambiar idioma a español');
    document.querySelector('.menu-toggle').setAttribute('aria-label', language === 'es' ? 'Abrir menú' : 'Open menu');
  }
  langButton.addEventListener('click', () => setLanguage(language === 'es' ? 'en' : 'es'));
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰';
  }));
  document.getElementById('year').textContent = '2021';
  document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`NOVAREX Global inquiry from ${name}`);
    const body = encodeURIComponent(`${language === 'es' ? 'Nombre' : 'Name'}: ${name}\nEmail: ${email}\n\n${message}\n\n${language === 'es' ? 'Mensaje preparado desde el sitio web de NOVAREX Global.' : 'Message prepared from the NOVAREX Global website.'}`);
    const status = document.getElementById('form-status');
    status.textContent = language === 'es' ? 'Se abrirá tu aplicación de correo con el borrador preparado. El formulario no transmite tus datos por sí mismo.' : 'Your email app will open with a prepared draft. The form itself does not transmit your data.';
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
})();
