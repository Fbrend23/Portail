// Chargement du site
window.scrollTo(0, 0);
setTimeout(() => {
    const main = document.getElementById('main-content');
    const intro = document.getElementById('intro-overlay');
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';
    if (intro) intro.remove(); // Supprime l’élément
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
  
  
// Fonction déclenchée par reCAPTCHA invisible une fois validé
function onSubmit(token) {
  document.getElementById("assistant-form").dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true })
  );
}

// Envoi du formulaire avec fetch et gestion de la réponse
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
      // Si reCAPTCHA échoue, afficher le message d'erreur
      if (result.includes("Erreur reCAPTCHA")) {
        showAssistantMessage(result);
        return;
      }

      // En cas de succès, masquer le formulaire et afficher la confirmation
      form.style.display = "none";
      document.getElementById("assistant-confirmation").classList.add("show");

      // Réinitialisation après quelques secondes
      setTimeout(() => {
        document.getElementById("assistant").classList.remove("open");
        form.reset();
        form.style.display = "block";
        document.getElementById("assistant-confirmation").classList.remove("show");
      }, 4000);
    })
    .catch((error) => {
      showAssistantMessage("Une erreur s'est produite. Réessaie plus tard.");
      console.error("Erreur : ", error);
    });
});

// Affiche un message d’erreur dans le bloc assistant
function showAssistantMessage(text) {
  const box = document.getElementById("assistant-box");
  box.innerHTML = `<p class="assistant-error">${text}</p>`;
}

// Affichage des cartes progressivement
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));


// Flèche pour descendre aux projets
const scrollBtn = document.querySelector(".scroll-down");

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    document.querySelector("#cards-section")?.scrollIntoView({
      behavior: "smooth"
    });
  });
}
