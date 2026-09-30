<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <section id="runeado" class="client" aria-labelledby="client-title">
    <h2 id="client-title">{{ t.client.title }}</h2>

    <div class="client-card">
      <p class="meta">
        <span class="badge">{{ t.client.badge }}</span>
        {{ t.client.places }}
      </p>
      <h3>{{ t.client.name }}</h3>
      <p class="intro">{{ t.client.intro }}</p>

      <ol class="features">
        <li v-for="feature in t.client.features" :key="feature.title">
          <time>{{ feature.date }}</time>
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.text }}</p>
        </li>
      </ol>

      <ul class="tags" :aria-label="t.card.techs">
        <li v-for="tech in t.client.techs" :key="tech">{{ tech }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.client {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 1.5rem 0;
}

h2 {
  margin: 0 0 1.5rem;
  font-size: 2rem;
  text-align: center;
  color: var(--accent, #d4f1ff);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(212, 241, 255, 0.3);
}

.client-card {
  padding: 2rem;
  border: 1px solid var(--accent, #d4f1ff);
  border-radius: 12px;
  background-color: rgba(13, 13, 13, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(51, 204, 255, 0.05), 0 0 20px rgba(51, 204, 255, 0.08) inset;
  transition: box-shadow 0.3s;
}

.client-card:hover {
  box-shadow: 0 0 30px var(--accent-shadow-hover, rgba(51, 204, 255, 0.3)), 0 0 20px var(--accent, #d4f1ff);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: #aaa;
}

.badge {
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  background: var(--accent, #d4f1ff);
  color: #000;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

h3 {
  margin: 0 0 0.75rem;
  font-size: 1.8rem;
  color: #fff;
}

.intro {
  margin: 0 0 1.75rem;
  color: #ccc;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
}

.features li {
  padding: 1rem;
  border: 1px solid rgba(212, 241, 255, 0.2);
  border-radius: 8px;
  background: rgba(13, 13, 13, 0.4);
}

time {
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--accent, #d4f1ff);
}

h4 {
  margin: 0.25rem 0 0.5rem;
  font-size: 1.05rem;
  color: #fff;
}

.features p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #bbb;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 0.15rem 0.55rem;
  border: 1px solid var(--accent, #d4f1ff);
  border-radius: 999px;
  color: var(--accent, #d4f1ff);
  background: rgba(13, 13, 13, 0.6);
  font-size: 0.72rem;
  letter-spacing: 0.03em;
}

@media (max-width: 768px) {
  .client {
    padding: 3rem 1.25rem 0;
  }

  h2 {
    font-size: 1.6rem;
  }

  .client-card {
    padding: 1.25rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style>
