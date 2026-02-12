import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface GetCharactersOptions {
  spaces?: boolean;
  punctuation?: boolean;
}
const GetCharactersOptionsDefaultValue: GetCharactersOptions = {
  spaces: true,
  punctuation: true,
};

export const useCounterStore = defineStore('counter', () => {
  const text = ref('');

  const charLimit = ref<{ hasLimit: boolean; limit: number }>({
    hasLimit: false,
    limit: 200,
  });

  const totalWords = computed(() => text.value.split(' ').filter((w) => w.length > 0).length);

  const totalSentences = computed(() => Array.from(text.value.matchAll(/[\w\d]+[\.\?\!]/g)).length);

  const readTime = computed(() => {
    const totalSeconds = (totalWords.value / 200) * 60;
    const minutes = Math.floor(totalSeconds / 60);

    if (minutes < 1) {
      return '< 1 minute';
    }

    const rounded = Math.round(minutes);
    return `${rounded} minute${rounded === 1 ? '' : 's'}`;
  });

  const getCharacters = (options: GetCharactersOptions = GetCharactersOptionsDefaultValue) => {
    let filter = '';

    if (options.spaces === false) {
      filter += '\\s';
    }
    if (options.punctuation === false) {
      filter += '\\W';
    }

    if (filter.length) {
      filter = '[' + filter + ']';
      const regex = new RegExp(filter, 'g');
      const res = text.value.replace(regex, '');

      return {
        chars: res,
        count: res.length,
      };
    }

    return {
      chars: text.value,
      count: text.value.length,
    };
  };
  return {
    charLimit,
    text,
    totalWords,
    totalSentences,
    readTime,
    getCharacters,
  };
});
