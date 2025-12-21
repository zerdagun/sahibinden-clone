import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import type { ICategory } from '~/types';

export const useCategoryStore = defineStore('categories', {
    state: () => ({
        categories: [] as ICategory[],
        loading: false,
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            try {
                const { $db } = useNuxtApp();
                
                const querySnapshot = await getDocs(collection($db, 'categories'));
                this.categories = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as ICategory[];

                if (this.categories.length === 0) {
                    this.categories = [
                        { id: '1', name: 'Emlak', slug: 'emlak', icon: '🏠' },
                        { id: '2', name: 'Vasıta', slug: 'vasita', icon: '🚗' },
                        { id: '3', name: 'Alışveriş', slug: 'alisveris', icon: '🛍️' },
                        { id: '4', name: 'Hizmetler', slug: 'hizmetler', icon: '🛠️' }
                    ];
                }
            } catch (e) {
                console.error("Error fetching categories", e);
            } finally {
                this.loading = false;
            }
        }
    }
});
