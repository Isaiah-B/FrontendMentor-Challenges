import data from './data.json';

import type { Flashcard, FlashcardData } from '@/types/flashcard';

function updateCategoriesMap(cards: Flashcard[]) {
    const map = new Map();

    cards.forEach(card => {
        map.set(card.category, (map.get(card.category) ?? 0) + 1);
    });

    const categoriesSerialized = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('categories', categoriesSerialized);
}

export function InitializeLocalStorage() {
    if (!localStorage.getItem('flashcards')) {
        const flashcardsSerialized = JSON.stringify(data.flashcards);
        localStorage.setItem('flashcards', flashcardsSerialized);
    }
        
    if (!localStorage.getItem('categories')) {
        updateCategoriesMap(data.flashcards);
    }   
}

export function getCards(): Flashcard[] {
    const entry = localStorage.getItem('flashcards');

    if (entry) {
        return JSON.parse(entry);
    }

    throw new Error('Failed to retrieve flashcards from LocalStorage');
}

export function getCategories(): Map<string, number> {
    const entry = localStorage.getItem('categories');

    if (entry) {
        return new Map(JSON.parse(entry));
    }

    throw new Error('Failed to retrieve categories from LocalStorage');
}

export function createCard(cardData: FlashcardData): Flashcard {
    const entry = localStorage.getItem('flashcards');

    if (!entry) {
        const newCard = { id: 'fc001', ...cardData, knownCount: 0 };
        localStorage.setItem('flashcards', JSON.stringify(newCard));

        return newCard;
    }

    const flashcards: Flashcard[] = JSON.parse(entry);
    const newCardIndex = flashcards.length + 1;
    const newCard: Flashcard = {
        id: `fc${newCardIndex.toString().padStart(3, '0')}`,
        ...cardData,
        knownCount: 0,
    }

    flashcards.push(newCard);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    updateCategoriesMap(flashcards);

    return newCard;
}

export function updateCard(id: string, updated: Flashcard) {
    const entry = localStorage.getItem('flashcards');

    if (!entry) {
        throw new Error('Failed to update flashcard');
    }
    
    const data: Flashcard[] = JSON.parse(entry);
    const cards = data.map(card => {
        if (card.id === id)
            return updated;

        return card;
    });

    localStorage.setItem('flashcards', JSON.stringify(cards));

    return updated;
}

export function deleteCard(id: string) {
    const entry = localStorage.getItem('flashcards');

    if (!entry) {
        throw new Error('Failed to delete flashcard');
    }

    const data: Flashcard[] = JSON.parse(entry);
    const cards = data.filter(card => card.id != id);

    localStorage.setItem('flashcards', JSON.stringify(cards));

    updateCategoriesMap(cards);
}