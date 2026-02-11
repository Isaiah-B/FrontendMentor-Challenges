<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string
  value: number
  color: string
  iconPath: string
}>();

const cardStyle = {
  backgroundImage: `url(${props.iconPath})`,
  backgroundColor: props.color,
}

const formattedValue = computed(() => props.value.toString().padStart(2, '0'));
</script>

<template>
  <div class="card" :style="cardStyle">
    <h2>{{ formattedValue }}</h2>
    <span class="text-lg">{{ label }}</span>
  </div>
</template>

<style>
.card {
  width: 100%;
  padding: 1.5rem 1rem;
  text-align: left;
  color: var(--card-foreground);
  border-radius: var(--radius-12);

  background-position-x: 118%;
  background-repeat: no-repeat;
}
</style>
