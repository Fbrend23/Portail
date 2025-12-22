<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const isTyping = ref(false)
const messages = ref([])
const chatBody = ref(null)
const lastFactIndex = ref(-1)

const botName = "Echo"

// FAQ Logic
const faqData = {
  start: {
    text: `Bonjour ! Je suis ${botName}, l'assistant virtuel de Brendan. Comment puis-je vous aider ?`,
    options: [
      { label: "Qui est Brendan ?", next: 'who' },
      { label: "Compétences", next: 'skills' },
      { label: "Disponibilité", next: 'availability' },
      { label: "Ses projets", next: 'projects' },
      { label: "Le contacter", next: 'contact' }
    ]
  },
  who: {
    text: "Brendan est un développeur passionné, s'orientant vers le web et les interfaces interactives. Il aime créer des expériences numériques soignées et immersives.",
    options: [
      { label: "Ses compétences ?", next: 'skills' },
      { label: "Voir ses projets", next: 'projects' },
      { label: "Retour au début", next: 'start' }
    ]
  },
  skills: {
    text: "Actuellement en formation, Brendan développe activement ses compétences dans l’écosystème web moderne, notamment avec Vue 3, AdonisJS et la conception d’interfaces claires, accessibles et structurées.",
    options: [
      { label: "Est-il disponible ?", next: 'availability' },
      { label: "Voir ses projets", next: 'projects' },
      { label: "Retour", next: 'start' }
    ]
  },
  availability: {
    text: "Brendan est actuellement ouvert à de nouvelles opportunités, qu’il s’agisse de projets, de collaborations ou de stages, en contexte local comme international.",
    options: [
      { label: "Le contacter", next: 'contact' },
      { label: "Fun fact", next: 'funfact' },
      { label: "Retour", next: 'start' }
    ]
  },
  funfact: {
    // Handled dynamically in handleOption
    text: "",
    options: []
  },
  projects: {
    text: "Il a réalisé plusieurs projets variés, allant de sites vitrines à des applications interactives et des jeux. Vous pouvez les découvrir directement via les cartes visibles en arrière-plan !",
    options: [
      { label: "Ses compétences", next: 'skills' },
      { label: "Le contacter", next: 'contact' }
    ]
  },
  contact: {
    text: "Vous souhaitez lui envoyer un message ? Vous pouvez utiliser le formulaire de contact officiel.",
    options: [{ label: "Retour au début", next: 'start' }],
    isContact: true
  }
}

// Initialize Chat
const initChat = () => {
  if (messages.value.length === 0) {
    addBotMessage(faqData.start)
  }
}

const toggleAssistant = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    initChat()
  }
}

const addBotMessage = (node) => {
  isTyping.value = true
  scrollToBottom()

  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      sender: 'bot',
      text: node.text,
      options: node.options,
      isContact: node.isContact
    })
    scrollToBottom()
  }, 1000) // Simulated delay
}

const handleOption = (option) => {
  // Add User Message
  messages.value.push({
    sender: 'user',
    text: option.label
  })
  scrollToBottom()

  // Trigger Bot Response
  let nextNode = faqData[option.next]

  // Handle Dynamic Fun Fact
  if (option.next === 'funfact') {
    const facts = [
      "Fun fact : Brendan adore transformer des idées simples en projets interactifs, parfois juste « pour voir jusqu’où ça peut aller »",
      "Fun fact : Brendan pratique la photographie, en particulier la photographie animalière, ce qui lui a appris la patience, l’observation et l’attention aux détails."
    ]

    // Pick a random fact different from the last one
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * facts.length)
    } while (newIndex === lastFactIndex.value && facts.length > 1)

    lastFactIndex.value = newIndex
    const randomFact = facts[newIndex]

    // Create a temporary node for display
    nextNode = {
      text: randomFact,
      options: [
        { label: "Voir ses projets", next: 'projects' },
        { label: "Autre fun fact ?", next: 'funfact' },
        { label: "Retour au début", next: 'start' }
      ]
    }
  }

  if (nextNode) {
    addBotMessage(nextNode)
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
  })
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

    <transition name="pop">
      <div v-if="isOpen" id="assistant-box">
        <div class="chat-header">
          <h3>{{ botName }}</h3>
          <button class="close-btn" @click="toggleAssistant">×</button>
        </div>

        <div class="chat-body" ref="chatBody">
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
            <div class="bubble">
              {{ msg.text }}

              <!-- Special Contact Action -->
              <div v-if="msg.isContact" class="contact-action">
                <a href="https://contact.brendanfleurdelys.ch/" target="_blank" class="btn-redirect">
                  Aller vers la page de contact →
                </a>
              </div>
            </div>

            <!-- Options (Only for bot messages) -->
            <div v-if="msg.sender === 'bot' && msg.options && msg.options.length" class="options-container">
              <button v-for="opt in msg.options" :key="opt.label" class="option-chip" @click="handleOption(opt)">
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message bot typing">
            <div class="bubble">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Main Container */
/* Main Container */
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
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
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
  0% {
    transform: scale(0.8);
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* Chat Box */
#assistant-box {
  position: absolute;
  bottom: 80px;
  /* Positioned just above the button */
  left: 10px;

  background: rgba(18, 18, 18, 0.9);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  width: 340px;
  height: 450px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom left;
}

/* Open State for Box */
/* Note: We target #assistant-box inside #assistant.open via the transition wrapper or direct css if simple */
/* Since we use v-if/transition in Vue, the enter/leave classes handle opacity/transform. 
   We just need base positioning to be correct relative to the 'flying' avatar. */

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.pop-enter-to,
.pop-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
}

.chat-header h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--accent, #fff);
  font-family: 'Sora', sans-serif;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 0.5rem;
}

.close-btn:hover {
  color: #fff;
}

.chat-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

/* Messages */
.message {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.message.bot {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
  align-items: flex-end;
}

.bubble {
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.message.bot .bubble {
  background: rgba(255, 255, 255, 0.1);
  color: #eee;
  border-top-left-radius: 2px;
}

.message.user .bubble {
  background: var(--accent, #33ccff);
  color: #000;
  border-top-right-radius: 2px;
  font-weight: 500;
}

/* Actions */
.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.option-chip {
  background: transparent;
  border: 1px solid var(--accent, #33ccff);
  color: var(--accent, #33ccff);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.option-chip:hover {
  background: var(--accent, #33ccff);
  color: #000;
}

.contact-action {
  margin-top: 0.8rem;
}

.btn-redirect {
  display: inline-block;
  background: #fff;
  color: #000;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-redirect:hover {
  transform: translateY(-2px);
}

/* Typing Indicator */
.typing .bubble {
  display: flex;
  gap: 4px;
  padding: 1rem;
  min-width: 60px;
  justify-content: center;
}

.dot {
  width: 6px;
  height: 6px;
  background: #aaa;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
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
