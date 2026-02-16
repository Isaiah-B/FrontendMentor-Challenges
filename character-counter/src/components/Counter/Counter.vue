<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useCounterStore } from '@/stores/counter';

import Filter from './Filter.vue';
import Card from './Card.vue';
import DensityChart from './DensityChart.vue';
import IconInfo from '../Icons/IconInfo.vue';

const store = useCounterStore();

const { text, charLimit } = storeToRefs(store);

const excludeSpaces = ref(false);

const textareaMaxLength = computed(() =>
  charLimit.value.hasLimit
    ? charLimit.value.limit
    : undefined
);

const showError = computed(() => {
  if (charLimit.value.hasLimit) {
    return text.value.length > charLimit.value.limit;
  }

  return false;
});

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

    <div v-if="showError" class="error-message text-md">
      <IconInfo />
      Limit reached! Your text exceeds {{ charLimit.limit }} characters.
    </div>

    <div class="textarea-footer">
      <div class="filters">
        <Filter label="Exclude Spaces" v-model:model-value="excludeSpaces" />
        <Filter
          label="Set Character Limit"
          v-model:model-value="charLimit.hasLimit"
          v-model:input-value="charLimit.limit"
          has-input
        />
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

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;

  color: var(--color-error);
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
