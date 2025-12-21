import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IAd } from '~/types';

export const useCartStore = defineStore('cart', () => {
    const items = ref<IAd[]>([]);

    const addToCart = (product: IAd) => {
        if (!items.value.find(p => p.id === product.id)) {
            items.value.push(product);
        }
    };

    const removeFromCart = (productId: string) => {
        items.value = items.value.filter(p => p.id !== productId);
    };

    const clearCart = () => {
        items.value = [];
    };

    const itemCount = computed(() => items.value.length);
    const totalAmount = computed(() => items.value.reduce((sum, item) => sum + (item.price || 0), 0));

    return {
        items,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        totalAmount
    };
});
