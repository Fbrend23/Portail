<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { proGroups } from '../data/proProjects'

const { t } = useI18n()

const groups = computed(() =>
  proGroups.map((group) => ({
    ...group,
    ...t.value.pro.groups[group.id],
    projects: group.projects?.map((project) => ({
      ...project,
      ...t.value.pro.projects[project.id]
    }))
  }))
)
</script>

<template>
  <section id="pro" class="client" aria-labelledby="client-title">
    <h2 id="client-title">{{ t.pro.title }}</h2>

    <article v-for="group in groups" :id="group.id" :key="group.id" class="client-card">
      <p class="meta">
        <span class="badge">{{ group.badge }}</span>
        {{ group.places }}
      </p>
      <h3>{{ group.name }}</h3>
      <p class="intro">{{ group.intro }}</p>

      <ol v-if="group.features" class="features">
        <li v-for="feature in group.features" :key="feature.title">
          <time>{{ feature.date }}</time>
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.text }}</p>
        </li>
      </ol>

      <div v-if="group.projects" class="sub-projects">
        <article v-for="project in group.projects" :key="project.id" class="sub-project">
          <h4>{{ project.name }}</h4>
          <p class="sub-intro">{{ project.intro }}</p>
          <ul class="points">
            <li v-for="point in project.points" :key="point">{{ point }}</li>
          </ul>
          <ul class="tags" :aria-label="t.card.techs">
            <li v-for="tech in project.techs" :key="tech">{{ tech }}</li>
          </ul>
          <a v-if="project.link" :href="project.link" class="btn" target="_blank" rel="noopener">{{ t.pro.visit }}</a>
        </article>
      </div>

      <ul v-if="group.techs" class="tags" :aria-label="t.card.techs">
        <li v-for="tech in group.techs" :key="tech">{{ tech }}</li>
      </ul>
    </article>
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

.client-card + .client-card {
  margin-top: 1.5rem;
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
}

.features li,
.sub-project {
  padding: 1rem;
  border: 1px solid rgba(212, 241, 255, 0.2);
  border-radius: 8px;
  background: rgba(13, 13, 13, 0.4);
}

.sub-projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.sub-project {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sub-project h4 {
  margin: 0;
  font-size: 1.15rem;
}

.sub-intro {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #ccc;
}

.points {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: #bbb;
}

.points li + li {
  margin-top: 0.35rem;
}

.sub-project .tags {
  margin-top: auto;
}

.btn {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: var(--accent, #d4f1ff);
  color: #000;
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
}

.btn:hover,
.btn:focus-visible {
  filter: brightness(1.3);
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

  .features,
  .sub-projects {
    grid-template-columns: 1fr;
  }
}
</style>
