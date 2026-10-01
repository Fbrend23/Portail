<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { useI18n } from '../i18n'

interface Option {
  label: string
  next?: string
}

interface FaqNode {
  text: string
  options?: Option[]
  isContact?: boolean
}

interface Message extends FaqNode {
  sender: 'bot' | 'user'
}

const { t } = useI18n()

const isOpen = ref(false)
const isTyping = ref(false)
const messages = ref<Message[]>([])
const chatBody = ref<HTMLElement | null>(null)
const toggleButton = ref<HTMLButtonElement | null>(null)
const lastFactIndex = ref(-1)

const botName = 'Echo'

// FAQ de la langue courante (src/i18n)
const faqData = t.value.echo.faq as Record<string, FaqNode>

// Délais de « saisie » en cours : annulés si le composant disparaît avant la réponse
const timers = new Set<ReturnType<typeof setTimeout>>()
onBeforeUnmount(() => timers.forEach(clearTimeout))

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

// Échap ferme le chat et rend le focus au bouton qui l'a ouvert
const closeAssistant = () => {
  if (!isOpen.value) return
  isOpen.value = false
  toggleButton.value?.focus()
}

// Le clavier suit la conversation : focus sur la première réponse proposée
const focusFirstOption = () => {
  nextTick(() => {
    const groups = chatBody.value?.querySelectorAll('.options-container')
    groups?.[groups.length - 1]?.querySelector<HTMLButtonElement>('.option-chip')?.focus()
  })
}

const addBotMessage = (node: FaqNode) => {
  isTyping.value = true
  scrollToBottom()

  const timer = setTimeout(() => {
    timers.delete(timer)
    isTyping.value = false
    messages.value.push({
      sender: 'bot',
      text: node.text,
      options: node.options,
      isContact: node.isContact
    })
    scrollToBottom()
    if (isOpen.value) focusFirstOption()
  }, 1000) // Simulated delay
  timers.add(timer)
}

const handleOption = (option: Option) => {
  // Add User Message
  messages.value.push({
    sender: 'user',
    text: option.label
  })
  scrollToBottom()

  // Trigger Bot Response
  let nextNode: FaqNode | undefined = option.next ? faqData[option.next] : undefined

  // Handle Dynamic Fun Fact
  if (option.next === 'funfact') {
    const facts = t.value.echo.facts

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
      options: t.value.echo.factOptions
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
  <div id="assistant" :class="{ open: isOpen }" @keydown.esc="closeAssistant">

    <button id="assistant-toggle" ref="toggleButton" type="button" @click="toggleAssistant"
      :aria-label="isOpen ? t.echo.close : t.echo.open" :aria-expanded="isOpen" aria-controls="assistant-box">
      <div class="icon-wrapper">
        <div v-if="!isOpen" class="greeting-bubble">{{ t.echo.greeting }}</div>
        <img src="/assets/assistant.webp" :alt="t.echo.avatarAlt" width="64" height="64" />
        <div class="glow-ring"></div>
      </div>
    </button>

    <transition name="pop">
      <div v-if="isOpen" id="assistant-box" role="dialog" aria-labelledby="assistant-title">
        <div class="chat-header">
          <h3 id="assistant-title">{{ botName }}</h3>
          <button class="close-btn" type="button" :aria-label="t.echo.close" @click="closeAssistant">×</button>
        </div>

        <div class="chat-body" ref="chatBody" aria-live="polite">
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
            <div class="bubble">
              {{ msg.text }}

              <!-- Special Contact Action -->
              <div v-if="msg.isContact" class="contact-action">
                <a href="https://contact.brendanfleurdelys.ch/" target="_blank" rel="noopener" class="btn-redirect">
                  {{ t.echo.contactLink }}
                </a>
              </div>
            </div>

            <!-- Options (Only for bot messages) -->
            <div v-if="msg.sender === 'bot' && msg.options && msg.options.length" class="options-container">
              <button v-for="opt in msg.options" :key="opt.label" type="button" class="option-chip" @click="handleOption(opt)">
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message bot typing" aria-hidden="true">
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

.greeting-bubble {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: black;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: float 3s ease-in-out infinite;
  pointer-events: none;
}

.greeting-bubble::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
}

@keyframes float {

  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  50% {
    transform: translateX(-50%) translateY(-5px);
  }
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
  font-family: var(--font-family-header);
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
    bottom: 1rem;
    left: 1rem;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .greeting-bubble {
    display: none;
  }

  #assistant-box {
    width: 300px;
    left: 0;
  }
}
</style>
