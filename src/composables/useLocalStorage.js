import { ref, onMounted } from "vue";

function useLocalStorage(key) {
  const data = ref([]);

  const loadData = () => {
    const storageData = localStorage.getItem(key);
    if (storageData) {
      data.value = JSON.parse(storageData);
    }
  };

  const saveData = () => {
    localStorage.setItem(key, JSON.stringify(data.value));
  };

  onMounted(loadData);

  return { data, saveData };
}

export default useLocalStorage;
