<script setup lang="ts">
import { computed, ref } from 'vue';

import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();

const charMap = ref(new Map<string, number>());

const charArr = computed(() => {
  charMap.value.clear()
  store.characters.chars.split('').forEach((char) => {
    if (char.match(/[a-zA-z]/)) {
      charMap.value.set(char, (charMap.value.get(char) ?? 0) + 1);
    }
  })

  return Array.from(charMap.value.entries())
    .sort((a, b) => b[1] - a[1])
    .map((pair) => ({
      ...pair,
      percent: (pair[1] / store.characters.count) * 100,
    }));
})
</script>

<template>
  <div class="density">
    <h3>Letter Density</h3>

    <p v-if="store.characters.count < 1">
      No characters found. Start typing to see letter density.
    </p>

    <div v-else class="density-item-list">
      <div class="density-item" v-for="val in charArr">
        <span class="density-letter text-md">{{ val[0] }}</span>
        <div class="density-bar">
          <div class="bar-fill" :style="{ width: `${val.percent}%` }" />
        </div>
        <span class="density-count text-md">{{ `${val[1]} (${val.percent.toFixed(2)}%)` }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.density {
  margin-top: var(--spacing-300);
}
.density h3 {
  margin-bottom: 1.25rem;
}

.density-item-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.density-item {
  width: 100%;
  display: grid;
  align-items: center;
  gap: 0.875rem;
  grid-template-columns: 2% auto 10%;
}

.density-letter {
  text-transform: capitalize;
  text-align: left;
}

.density-bar {
  position: relative;
  width: 100%;
  background-color: var(--color-input);
  border-radius: var(--radius-full);
  height: 0.75rem;
}

.bar-fill {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translateY(-50%);
  height: 100%;

  border-radius: var(--radius-full);
  background-color: var(--color-accent);
}
</style>
