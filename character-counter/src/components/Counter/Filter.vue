<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [Array, Boolean],
  value: [Boolean, Object],
});

const emit = defineEmits(['update:modelValue']);
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
});
</script>

<template>
  <div class="text-filter">
    <label class="text-md">
      <input type="checkbox" v-model="model" value="value" />
      {{ label }}
    </label>
  </div>
</template>

<style>
label {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
}

input[type='checkbox'] {
  position: relative;
  width: 1rem;
  height: 1rem;

  background: none;
  border-radius: var(--radius-4);
  border: 1px solid var(--checkbox-border);

  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

input[type='checkbox']:hover {
  background-color: var(--color-accent);
}

input[type='checkbox']:checked {
  background: var(--color-accent);
}

input[type='checkbox']:checked::before {
  content: url('../../assets/images/icon-check.svg');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 12px;
  height: 13px;
}
</style>
