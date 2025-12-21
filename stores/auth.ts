import { defineStore } from 'pinia';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import {
    doc,
    setDoc,
    serverTimestamp
} from 'firebase/firestore';
import type { IUser } from '~/types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as IUser | null,
        loading: true,
    }),
    actions: {
        initAuth() {
            
            const demoUser = localStorage.getItem('demoUser');
            if (demoUser) {
                this.user = JSON.parse(demoUser);
            }
            this.loading = false;

            try {
                const { $auth } = useNuxtApp();
                if ($auth) {
                    
                    onAuthStateChanged($auth, (firebaseUser) => {
                        if (firebaseUser) {
                            this.user = {
                                uid: firebaseUser.uid,
                                email: firebaseUser.email,
                                displayName: firebaseUser.displayName,
                            };
                        }
                        this.loading = false;
                    });
                }
            } catch (e) {
                
                console.log('Firebase not configured, using demo mode');
            }
        },
        async register(email: string, pass: string, name: string) {
            try {
                const { $auth, $db } = useNuxtApp();
                
                const userCredential = await createUserWithEmailAndPassword($auth, email, pass);
                await updateProfile(userCredential.user, { displayName: name });

                await setDoc(doc($db, 'users', userCredential.user.uid), {
                    email: email,
                    displayName: name,
                    createdAt: serverTimestamp(),
                    role: 'user'
                });

                this.user = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: name,
                };
            } catch (e) {
                
                const mockUser = {
                    uid: 'demo-' + Date.now(),
                    email: email,
                    displayName: name,
                };
                this.user = mockUser;
                localStorage.setItem('demoUser', JSON.stringify(mockUser));
            }
        },
        async login(email: string, pass: string) {
            try {
                const { $auth } = useNuxtApp();
                
                await signInWithEmailAndPassword($auth, email, pass);
            } catch (e) {
                
                const mockUser = {
                    uid: 'demo-' + Date.now(),
                    email: email,
                    displayName: email.split('@')[0],
                };
                this.user = mockUser;
                localStorage.setItem('demoUser', JSON.stringify(mockUser));
            }
        },
        async logout() {
            try {
                const { $auth } = useNuxtApp();
                
                await signOut($auth);
            } catch (e) {
                
            }
            this.user = null;
            localStorage.removeItem('demoUser');
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    }
});
