import { defineStore } from 'pinia';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from './auth';

export const useOrderStore = defineStore('orders', {
    state: () => ({
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async createOrder(product: any, serviceFee: number, totalAmount: number) {
            const authStore = useAuthStore();
            if (!authStore.user) throw new Error('User not authenticated');

            this.loading = true;
            this.error = null;

            try {
                const { $db } = useNuxtApp();

                const orderData = {
                    productId: product.id,
                    productTitle: product.title,
                    price: product.price,
                    serviceFee: serviceFee,
                    totalAmount: totalAmount,
                    buyerEmail: authStore.user.email,
                    buyerId: authStore.user.uid,
                    status: 'pending',
                    createdAt: serverTimestamp()
                };

                await addDoc(collection($db, 'orders'), orderData);
                return true;
            } catch (e: any) {
                console.error("Order creation failed", e);
                this.error = e.message;
                throw e;
            } finally {
                this.loading = false;
            }
        }
    }
});
