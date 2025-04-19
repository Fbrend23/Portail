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
  
  document.getElementById("assistant-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const form = this;
    const data = new FormData(form);
  
    fetch(form.action, {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        // Masquer le formulaire et afficher confirmation
        form.style.display = "none";
        document.getElementById("assistant-confirmation").classList.add("show");
  
        // Optionnel : refermer le panneau après 4s
        setTimeout(() => {
          document.getElementById("assistant").classList.remove("open");
          // Réinitialiser le formulaire
          form.reset();
          form.style.display = "block";
          document.getElementById("assistant-confirmation").classList.remove("show");
        }, 4000);
      })
      .catch((error) => {
        alert("Une erreur s'est produite. Réessaie plus tard.");
        console.error("Erreur : ", error);
      });
  });
  