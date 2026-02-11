<script setup lang="ts">
import Header from './components/Header.vue'
import Counter from './components/Counter/Counter.vue'

const initTheme = () => {
  let theme = localStorage.getItem('theme');

  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    return;
  }

  theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

initTheme()
</script>

<template>
  <Header />

  <main>
    <h1 class="main-heading">Analyze your text in real-time.</h1>

    <Counter />
  </main>
</template>

<style scoped>
main {
  margin-top: var(--spacing-600);
}

.main-heading {
  max-width: 55%;
  margin: 0 auto var(--spacing-600) auto;
  text-align: center;
}
</style>
