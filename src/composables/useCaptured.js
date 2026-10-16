import { ref, computed } from 'vue';

export const MAX_CAPTURED = 6;
const KEY = 'captured-pokemon';

const load = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data.slice(0, MAX_CAPTURED) : [];
  } catch {
    return [];
  }
};

const captured = ref(load());

const save = () => localStorage.setItem(KEY, JSON.stringify(captured.value));

export function useCaptured() {
  const isCaptured = (id) => captured.value.includes(Number(id));
  const isFull = computed(() => captured.value.length >= MAX_CAPTURED);

  const capture = (id) => {
    id = Number(id);
    if (isCaptured(id) || isFull.value) return false;
    captured.value = [...captured.value, id];
    save();
    return true;
  };

  const release = (id) => {
    captured.value = captured.value.filter((c) => c !== Number(id));
    save();
  };

  return { captured, isCaptured, isFull, capture, release };
}
