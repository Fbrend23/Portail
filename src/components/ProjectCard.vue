<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'forest'
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: 'EXPLORER →'
  }
})
</script>

<template>
  <div class="card" :data-theme="theme">
    <img v-if="image" :src="image" class="preview-bg" alt="" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <a :href="link" class="btn" target="_blank">{{ btnText }}</a>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 250px;
  padding: 1.5rem;
  background: rgba(20, 20, 20, 0.4);
  /* Lighter, more transparent */
  border-radius: 16px;
  /* Smoother corners */
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(20px) saturate(180%);
  /* heavier blur + saturation for vibrancy */
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  /* Soft deep shadow */
}


.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(30, 30, 30, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px var(--accent-shadow-hover, rgba(255, 255, 255, 0.1));
}

.preview-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: blur(8px) saturate(0.5);
  transition: opacity 0.5s ease, filter 0.5s ease;
  z-index: 0;
  pointer-events: none;
}

.card:hover .preview-bg {
  opacity: 0.4;
  filter: blur(2px) saturate(1.2);
}

h2 {
  position: relative;
  z-index: 1;
  margin: 0 0 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent, #fff);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Sora', sans-serif;
}

p {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn {
  position: relative;
  z-index: 1;
  background-color: var(--accent, #fff);
  color: #000;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  display: inline-block;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  align-self: flex-start;
  margin-top: auto;
  border: none;
  cursor: pointer;
}

.btn:hover {
  filter: brightness(1.15);
  box-shadow: 0 0 15px var(--accent-shadow, rgba(255, 255, 255, 0.4));
  transform: translateY(-1px);
}
</style>
