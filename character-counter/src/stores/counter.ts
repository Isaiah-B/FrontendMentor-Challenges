import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const excludeSpaces = ref(false)
  const charLimit = ref<{ hasLimit: boolean; limit: number }>({
    hasLimit: false,
    limit: 200,
  })

  const text = ref('')

  const characters = computed(() => {
    if (excludeSpaces.value === true) {
      const res = text.value.replace(/\s/g, '')
      return {
        chars: res,
        count: res.length,
      }
    }

    const res = text.value
    return {
      chars: res,
      count: res.length,
    }
  })

  const totalWords = computed(() => text.value.split(' ').filter((w) => w.length > 0).length)

  const totalSentences = computed(() => Array.from(text.value.matchAll(/\w.\./g)).length)

  const readTime = computed(() => {
    const totalSeconds = (totalWords.value / 200) * 60
    const minutes = Math.floor(totalSeconds / 60)

    if (minutes < 1) {
      return '< 1 minute'
    }

    const rounded = Math.round(minutes)
    return `${rounded} minute${rounded === 1 ? '' : 's'}`
  })
  return {
    excludeSpaces,
    charLimit,
    text,
    characters,
    totalWords,
    totalSentences,
    readTime,
  }
})
