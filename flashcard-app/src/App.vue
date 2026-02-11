<script setup lang="ts">
  import { RouterView } from 'vue-router'

  import { Toaster } from './components/ui/sonner';
  
  import Header from './components/Header.vue';
  import { useFlashcardStore } from './stores/flashcards';

  const flashcardState = useFlashcardStore();
  flashcardState.initStore();
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <Toaster />
</template>

<style scoped>
  main {
    flex-grow: 1;
    width: 100%;
    margin-top: 24px;
  }
</style>
