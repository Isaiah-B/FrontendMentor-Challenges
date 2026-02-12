<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useCounterStore } from '@/stores/counter';

import Filter from './Filter.vue';
import Card from './Card.vue';
import DensityChart from './DensityChart.vue';

const store = useCounterStore();

const { charLimit } = storeToRefs(store);

const excludeSpaces = ref(false);

const textareaMaxLength = charLimit.value.hasLimit ? charLimit.value.limit : undefined;
</script>

<template>
  <div class="container">
    <textarea
      v-model="store.text"
      :maxlength="textareaMaxLength"
      rows="6"
      class="text-input text-lg"
      placeholder="Start typing here… (or paste your text)"
    />

    <div class="textarea-footer">
      <div class="filters">
        <Filter label="Exclude Spaces" v-model="excludeSpaces" />
        <Filter label="Set Character Limit" v-model="store.charLimit.hasLimit" />
      </div>

      <span>Approx. reading time: {{ store.readTime }}</span>
    </div>

    <div class="cards">
      <Card
        label="Total Characters"
        :value="store.getCharacters({ spaces: !excludeSpaces }).count"
        color="#d3a0fa"
        icon-path="/src/assets/images/pattern-character-count.svg"
      />
      <Card
        label="Word Count"
        :value="store.totalWords"
        color="#ff9f00"
        icon-path="/src/assets/images/pattern-word-count.svg"
      />
      <Card
        label="Sentence Count"
        :value="store.totalSentences"
        color="#fe8159"
        icon-path="/src/assets/images/pattern-sentence-count.svg"
      />
    </div>

    <DensityChart />
  </div>
</template>

<style>
.container {
  width: 100%;
}

.text-input {
  width: 100%;
  padding: 1.25rem;
  color: inherit;
  border-radius: var(--radius-12);
  resize: none;
}

.textarea-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

.filters {
  display: flex;
  gap: 1.5rem;
}

.cards {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: var(--spacing-600);
}
</style>
