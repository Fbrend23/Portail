// Chargement du site
setTimeout(() => {
    const main = document.getElementById('main-content');
    const intro = document.getElementById('intro-overlay');
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';
    if (intro) intro.remove(); // facultatif : supprime l’élément
  }, 3000);

// Animation des points de Intilisation...
  const dots = document.getElementById("dots-loading");
  let i = 0;
  setInterval(() => {
    dots.textContent = ".".repeat((i++ % 4));
  }, 400);

