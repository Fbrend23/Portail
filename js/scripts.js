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

// Réseaux sociaux
document.getElementById("toggle-social").addEventListener("click", function () {
    document.querySelector(".social-mobile").classList.toggle("open");
  });

  //Assistant
  document.getElementById("assistant-toggle").addEventListener("click", () => {
    document.getElementById("assistant").classList.toggle("open");
  });
  
  //Forms
 
  document.getElementById("cancel-form").addEventListener("click", () => {
    document.getElementById("assistant").classList.remove("open");
    document.getElementById("assistant-form").reset();
  });
  
  document.getElementById("assistant-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Merci pour ton message Brendan ! 📬");
    e.target.reset();
    document.getElementById("assistant").classList.remove("open");
  });
  