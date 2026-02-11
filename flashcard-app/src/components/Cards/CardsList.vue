<script setup lang="ts">
    import { ref, watch } from 'vue';

    import { Button } from '../ui/button';
    import CardItem from './CardItem.vue';

    import { useFlashcardStore } from '@/stores/flashcards';

    const store = useFlashcardStore();
    const numLoadedCards = ref(12);
    const loading = ref(false);

    const sortedCards = ref([...store.flashcards].reverse());

    watch(() => store.flashcards, () => {
        sortedCards.value = [...store.flashcards].reverse();
    })

    const loadCards = () => {
        loading.value = true;
        numLoadedCards.value += 12;
        loading.value = false;
    }
</script>

<template>
    <div class="list-wrapper">
        <div class="card-list">
            <CardItem v-for="card in sortedCards.slice(0, numLoadedCards)"
                :key="card.id" 
                :card="card"
            />
        </div>
    
        <div v-if="loading">Loading...</div>
        <Button v-else
            class="load-more-btn"
            variant="secondary_pop"
            @click="loadCards"
        >
            Load More
        </Button>
    </div>
</template>

<style>
    .list-wrapper {
        text-align: center;
    }

    .card-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(min-content, 1fr));
        gap: 1.5rem;
        text-align: left;
    }

    .load-more-btn {
        margin-top: var(--app-spacing-32);
    }
</style>