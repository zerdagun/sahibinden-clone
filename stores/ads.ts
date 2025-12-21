import { defineStore } from 'pinia';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    query,
    where,
    Timestamp
} from 'firebase/firestore';
import type { IAd } from '~/types';
import { mockAdverts } from '~/data/mockAdverts';

export const useAdStore = defineStore('ads', {
    state: () => ({
        ads: [] as IAd[],
        currentAd: null as IAd | null,
        loading: false,
    }),
    actions: {
        async fetchAds() {
            this.loading = true;
            try {

                this.ads = mockAdverts;

            } catch (e) {
                console.error("Error fetching ads", e);
                
                this.ads = mockAdverts;
            } finally {
                this.loading = false;
            }
        },
        async fetchAdById(id: string) {
            this.loading = true;
            try {
                
                let found = this.ads.find(a => a.id === id);

                if (!found) {

                    found = mockAdverts.find(a => a.id === id);
                }

                if (found) {
                    this.currentAd = found;
                    return;
                }

                const { $db } = useNuxtApp();
                
                const docRef = doc($db, 'ads', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.currentAd = { id: docSnap.id, ...docSnap.data() } as IAd;
                } else {
                    this.currentAd = null;
                }
            } catch (e) {
                console.error("Error fetching ad", e);

                this.currentAd = mockAdverts.find(a => a.id === id) || null;
            } finally {
                this.loading = false;
            }
        },
        async createAd(ad: Omit<IAd, 'id' | 'date' | 'status'>) {
            const { $db } = useNuxtApp();
            const newAd = {
                ...ad,
                date: Timestamp.now(),
                status: 'active'
            };
            
            await addDoc(collection($db, 'ads'), newAd);
            await this.fetchAds(); 
        }
    }
});
