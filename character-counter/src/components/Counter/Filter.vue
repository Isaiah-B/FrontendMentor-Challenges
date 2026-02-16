<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [Array, Boolean],
  inputValue: Number,
  value: [Boolean, Number],
  hasInput: Boolean
});

const inputOpen = computed(() => {
  return props.modelValue && props.hasInput
})

const emit = defineEmits(['update:modelValue', 'update:inputValue']);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputModel = computed({
  get() {
    return props.inputValue;
  },
  set(val) {
    emit('update:inputValue', val);
  }
})

const onInputBlur = (inputValue: number | undefined) => {
  if (!inputValue) {
    emit('update:inputValue', 200);
    return;
  }
  if (inputValue < 10) {    
    emit('update:inputValue', 10);
    return
  }
}
</script>

<template>
  <div class="text-filter">
    <label class="text-md">
      <input type="checkbox" v-model="model" value="value" />
      {{ label }}
    </label>

    <input v-if="inputOpen" type="number" v-model="inputModel" @blur="onInputBlur(inputValue)">
  </div>
</template>

<style>
.text-filter {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

label {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;

  user-select: none;
  -moz-user-select: none;
}

input[type=checkbox] {
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

input[type=checkbox]:hover {
  background-color: var(--color-accent);
}

input[type=checkbox]:checked {
  background-color: var(--color-accent);
}

input[type=checkbox]:checked::before {
  content: url('../../assets/images/icon-check.svg');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 12px;
  height: 13px;
}

input[type=checkbox]:focus-visible {
  outline: 2px solid var(--color-accent);
  background: var(--white);
  border: 1px solid var(--neutral-200);
  box-shadow: 0 0 0 2px var(--white);
}
input[type=checkbox]:checked:focus-visible {
  outline: 2px solid var(--color-accent);
  background: var(--color-accent);
  border: 1px solid var(--neutral-200);
  box-shadow: 0 0 0 2px var(--white);
}
</style>
