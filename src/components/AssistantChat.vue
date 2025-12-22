<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)
const showConfirmation = ref(false)
const isLoading = ref(false)

const form = reactive({
  prenom: '',
  email: '',
  message: '',
  website: ''
})

const toggleAssistant = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    showConfirmation.value = false
  }
}

const cancelForm = () => {
    isOpen.value = false
    form.prenom = ''
    form.email = ''
    form.message = ''
}

const handleSubmit = async () => {
  if (form.website) return
  
  isLoading.value = true
  


  setTimeout(() => {
    isLoading.value = false
    showConfirmation.value = true
    showConfirmation.value = true
    form.prenom = ''
    form.email = ''
    form.message = ''
  }, 1500)
}
</script>

<template>
  <div id="assistant" :class="{ open: isOpen }">

    <button id="assistant-toggle" @click="toggleAssistant" aria-label="Toggle Assistant">
      <div class="icon-wrapper">
         <img src="/assets/assistant.png" alt="Assistant IA" />
         <div class="glow-ring"></div>
      </div>
    </button>


    <div id="assistant-box">
      <div v-if="!showConfirmation">
        <h3>Contact</h3>
        <p class="subtitle">Une question ? Je vous écoute.</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
             <label for="prenom">Prénom</label>
             <input type="text" id="prenom" v-model="form.prenom" required placeholder="Votre prénom...">
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required placeholder="email@exemple.com">
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="3" required placeholder="Comment puis-je vous aider ?"></textarea>
          </div>


          <input type="text" v-model="form.website" style="display:none;" autocomplete="off">

          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="cancelForm">Fermer</button>
            <button type="submit" class="btn-submit" :disabled="isLoading">
                <span v-if="!isLoading">Envoyer</span>
                <span v-else>Envoi...</span>
            </button>
          </div>
        </form>
      </div>


      <div v-else class="confirmation-screen">
        <div class="success-icon">✓</div>
        <p>Message envoyé !</p>
        <p class="small">Brendan vous répondra dès que possible.</p>
        <button class="btn-close" @click="toggleAssistant">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#assistant {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 999;
}

#assistant-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#assistant-toggle:hover {
  transform: scale(1.1);
}

.icon-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
}

#assistant-toggle img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
}

.glow-ring {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 2px solid var(--accent, #d4f1ff);
  opacity: 0;
  animation: pulse-ring 2s infinite;
}

#assistant-toggle:hover .glow-ring {
  opacity: 1;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 0; }
}

/* Chat Box Container */
#assistant-box {
  position: absolute;
  bottom: 80px;
  left: 10px;
  background: rgba(18, 18, 18, 0.85);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 
              0 0 0 1px rgba(255,255,255,0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 1.5rem;
  width: 340px;
  transform-origin: bottom left;
  transform: scale(0.9) translateY(20px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

#assistant.open #assistant-box {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
}

h3 {
  margin-bottom: 0.2rem;
  color: var(--accent, #fff);
  font-family: 'Sora', sans-serif;
}

.subtitle {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1.2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
  color: #aaa;
}

input, textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  color: white;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--accent, #fff);
  box-shadow: 0 0 0 2px var(--accent-shadow, rgba(255,255,255,0.1));
}

textarea {
  resize: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

button {
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.btn-cancel {
  background: transparent;
  color: #aaa;
}

.btn-cancel:hover {
  color: #fff;
}

.btn-submit {
  background: var(--accent, #fff);
  color: #000;
}

.btn-submit:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Confirmation Screen */
.confirmation-screen {
  text-align: center;
  padding: 2rem 0;
  animation: fadeIn 0.4s ease;
}

.success-icon {
  width: 50px;
  height: 50px;
  background: rgba(0, 255, 128, 0.2);
  color: #00ff80;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
  border: 1px solid rgba(0, 255, 128, 0.4);
}

.confirmation-screen p {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #fff;
}

.confirmation-screen .small {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1.5rem;
}

.btn-close {
    background: rgba(255,255,255,0.1);
    color: #fff;
}
.btn-close:hover {
    background: rgba(255,255,255,0.2);
}

@media (max-width: 768px) {
  #assistant {
    bottom: 1.5rem;
    left: 1.5rem;
  }
  
  #assistant-box {
    width: 300px;
    left: 0; 
  }
}
</style>
