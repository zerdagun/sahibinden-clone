import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useFavorites = defineStore('favorites', () => {
const items = ref([])
function add(item) {
if (!items.value.find(i => i.id === item.id)) items.value.push(item)
}
function remove(id) { items.value = items.value.filter(i => i.id !== id) }
return { items, add, remove }
})