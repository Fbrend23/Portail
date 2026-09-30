<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()

const GALLERY_URL = 'https://photographie.brendanfleurdelys.ch/'
</script>

<template>
  <section id="photo" class="photo" aria-labelledby="photo-title">
    <h2 id="photo-title">{{ t.photo.title }}</h2>
    <p class="photo-intro">{{ t.photo.intro }}</p>

    <div class="mosaic">
      <figure v-for="(item, index) in t.photo.items" :key="item.src" class="shot" :class="{ 'is-main': index === 0 }"
        tabindex="0">
        <img :src="item.src" :width="item.width" :height="item.height" :alt="item.alt" loading="lazy"
          decoding="async" />
        <figcaption>{{ item.caption }}</figcaption>
      </figure>
    </div>

    <p class="photo-cta">
      <a :href="GALLERY_URL" target="_blank" rel="noopener" class="cta-link">{{ t.photo.cta }}</a>
    </p>
  </section>
</template>

<style scoped>
.photo {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  text-align: center;
  color: var(--accent, #d4f1ff);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(212, 241, 255, 0.3);
}

.photo-intro {
  margin: 0 auto 2.5rem;
  max-width: 560px;
  text-align: center;
  color: #aaa;
}

.mosaic {
  display: grid;
  gap: 1rem;
}

.shot {
  position: relative;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(212, 241, 255, 0.15);
  border-radius: 12px;
  background: #0c1e2c;
}

.shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.shot figcaption {
  position: absolute;
  inset: auto 0 0 0;
  padding: 1.5rem 1rem 0.75rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  font-size: 0.9rem;
  color: #fff;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.shot:hover img,
.shot:focus-visible img {
  transform: scale(1.04);
}

.shot:hover figcaption,
.shot:focus-visible figcaption {
  opacity: 1;
  transform: none;
}

.shot:focus-visible {
  outline: 2px solid var(--accent, #d4f1ff);
  outline-offset: 2px;
}

/* Pas de survol (écran tactile) : la légende reste visible */
@media (hover: none) {
  .shot figcaption {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {

  .shot img,
  .shot figcaption {
    transition: none;
  }

  .shot:hover img,
  .shot:focus-visible img {
    transform: none;
  }

  .shot figcaption {
    opacity: 1;
    transform: none;
  }
}

.photo-cta {
  margin: 2rem 0 0;
  text-align: center;
}

.cta-link {
  color: var(--accent, #d4f1ff);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.cta-link:hover,
.cta-link:focus-visible {
  border-color: currentColor;
}

@media (min-width: 768px) {
  .mosaic {
    grid-template-columns: 2fr 1fr;
  }

  .shot.is-main {
    grid-row: span 2;
  }
}

@media (max-width: 768px) {
  .photo {
    padding: 3rem 1.25rem 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
  }
}
</style>
