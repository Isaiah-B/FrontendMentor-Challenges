export interface Flashcard {
    id: string,
    question: string,
    answer: string,
    category: string,
    knownCount: number
}

export interface FlashcardData {
    question: string,
    answer: string,
    category: string,
}