<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSun from './Icons/IconSun.vue';
import IconMoon from './Icons/IconMoon.vue';

const currentTheme = ref(localStorage.getItem('theme'));

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';

  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  currentTheme.value = newTheme;
}
</script>

<template>
  <header class="app-header">
    <img src="../assets/images/logo-dark-theme.svg" alt="logo" v-if="currentTheme === 'dark'" />
    <img src="../assets/images/logo-light-theme.svg" alt="logo" v-else />

    <button class="theme-toggle" @click="toggleTheme">
      <IconSun v-if="currentTheme === 'dark'" />
      <IconMoon v-else />
    </button>
  </header>
</template>

<style>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
