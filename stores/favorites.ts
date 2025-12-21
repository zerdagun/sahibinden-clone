import { defineStore } from 'pinia';
import {
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    query,
    where,
    doc
} from 'firebase/firestore';
import { useAuthStore } from './auth';

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: [] as any[],
        loading: false,
    }),
    actions: {
        async fetchFavorites() {
            const auth = useAuthStore();
            if (!auth.user) return;

            this.loading = true;
            try {
                const { $db } = useNuxtApp();

                const q = query(collection($db, 'favorites'), where('userId', '==', auth.user.uid));
                const snap = await getDocs(q);

                const rawItems = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));

                // Deduplicate items based on adId
                const uniqueItems = [];
                const seenIds = new Set();

                for (const item of rawItems) {
                    const adIdStr = String(item.adId);
                    if (!seenIds.has(adIdStr)) {
                        seenIds.add(adIdStr);
                        uniqueItems.push(item);
                    } else {
                        // Optional: Clean up duplicates from Firestore in background
                        // deleteDoc(doc($db, 'favorites', item.firestoreId));
                    }
                }

                // Preserve optimistic items (those with null firestoreId) that aren't in the fetched list
                // logic: if an optimistic item's ID matches a fetched item, the fetched item takes precedence (it's confirmed)
                // if the optimistic item is NOT in fetched, we keep it (it's still pending or just added)
                const pendingItems = this.items.filter(i => i.firestoreId === null);

                for (const pending of pendingItems) {
                    const adIdStr = String(pending.adId);
                    if (!seenIds.has(adIdStr)) {
                        uniqueItems.push(pending);
                        seenIds.add(adIdStr);
                    }
                }

                this.items = uniqueItems;
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        async addFavorite(ad: any) {
            const auth = useAuthStore();
            if (!auth.user) {
                alert("Please login first");
                return;
            }
            // Check against local state to prevent duplicates (client-side protection)
            // Ensure comparison uses String to avoid type number/string mismatches
            if (this.items.find(i => String(i.adId) === String(ad.id))) return;

            const { $db } = useNuxtApp();

            // OPTIMISTIC UPDATE: Add to valid items immediately with a temporary ID/flag
            // This prevents "double-click" duplicates because the next click sees it in `this.items`
            const optimisticItem = {
                firestoreId: null, // Pending
                userId: auth.user.uid,
                adId: ad.id,
                title: ad.title,
                price: ad.price,
                image: ad.images?.[0] || 'placeholder.jpg'
            };

            this.items.push(optimisticItem);

            try {
                const docRef = await addDoc(collection($db, 'favorites'), {
                    userId: auth.user.uid,
                    adId: ad.id,
                    title: ad.title,
                    price: ad.price,
                    image: ad.images?.[0] || 'placeholder.jpg'
                });

                // Update the item with the real Firestore ID
                const item = this.items.find(i => i.adId === ad.id);
                if (item) {
                    item.firestoreId = docRef.id;
                }
            } catch (error) {
                console.error("Add favorite error:", error);
                // Rollback if failed
                this.items = this.items.filter(i => i.adId !== ad.id);
                alert("Favorilere eklenirken bir hata oluştu.");
            }
        },
        async removeFavorite(adId: string) {
            const auth = useAuthStore();
            if (!auth.user) return;

            const favIndex = this.items.findIndex(i => i.adId === adId);
            if (favIndex === -1) return;

            const favItem = this.items[favIndex];

            // OPTIMISTIC UPDATE: Remove immediately
            this.items.splice(favIndex, 1);

            // If it was a pending item (no ID yet), we can't delete via ID. 
            // In a real app, we might need to cancel the pending add, but for now, 
            // we skip the DB delete if we don't have an ID (the DB might end up with an orphan, 
            // but the UI is consistent). 
            // Better strategy: Wait for ID? 
            // For now, simple check:
            if (!favItem.firestoreId) {
                // If it has no ID, it means the add request is still flying or finished just now.
                // We'll trust the user interaction. 
                // Note: This leaves a risk of 'phantom favorite' in DB if the Add succeeds after this Remove.
                return;
            }

            try {
                const { $db } = useNuxtApp();
                await deleteDoc(doc($db, 'favorites', favItem.firestoreId));
            } catch (error) {
                console.error("Remove favorite error:", error);
                // Rollback
                this.items.push(favItem); // Put it back
                alert("Favorilerden çıkarılırken bir hata oluştu.");
            }
        }
    }
});
