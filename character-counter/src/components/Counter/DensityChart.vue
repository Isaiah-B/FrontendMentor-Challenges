<script setup lang="ts">
import { computed, ref } from 'vue';

import IconChevron from '../Icons/IconChevron.vue';

import { useCounterStore } from '@/stores/counter';

const PREVIEW_LEN = 5;

const store = useCounterStore();

const showAll = ref(false);
const charMap = ref(new Map<string, number>());

const toggleExpand = () => {
  showAll.value = !showAll.value;
};


const characters = computed(() => {
  return store.getCharacters({ spaces: false, punctuation: false });
});

const charArr = computed(() => {
  charMap.value.clear();

  characters.value.chars.split('').forEach((char) => {
    if (char.match(/[a-zA-z]/)) {
      charMap.value.set(char, (charMap.value.get(char) ?? 0) + 1);
    }
  });

  return Array.from(charMap.value.entries())
    .sort((a, b) => b[1] - a[1])
    .map((pair) => ({
      ...pair,
      percent: (pair[1] / characters.value.count) * 100,
    }));
});
</script>

<template>
  <div class="density">
    <h3>Letter Density</h3>

    <p v-if="characters.count < 1">No characters found. Start typing to see letter density.</p>

    <div v-else class="wrapper">
      <div :class="['density-item-list', { expanded: showAll }]">
        <div class="density-item" v-for="val in charArr.slice(0, showAll ? undefined : PREVIEW_LEN)">
          <span class="density-letter text-md">{{ val[0] }}</span>
          <div class="density-bar">
            <div class="bar-fill" :style="{ width: `${val.percent}%` }" />
          </div>
          <span class="density-count text-md">{{ `${val[1]} (${val.percent.toFixed(2)}%)` }}</span>
        </div>

        <button @click="toggleExpand" class="expand-btn">
          See more
          <IconChevron />
        </button>
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

.density-item-list.expanded {
  grid-template-rows: auto;
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
  background-color: var(--color-primary);
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
  transition: all 0.2s;
}

.expand-btn {
  width: fit-content;
}
.expand-btn svg {
  fill: var(--color-text);
  margin-left: 0.375rem;
}
</style>
