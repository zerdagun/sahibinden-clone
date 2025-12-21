import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: "AIzaSyBkzIUsEixP1iriu02Dc8nvsAA7t0BZTpM",
        authDomain: "sahibinden-clone-c6504.firebaseapp.com",
        projectId: "sahibinden-clone-c6504",
        storageBucket: "sahibinden-clone-c6504.firebasestorage.app",
        messagingSenderId: "896685238798",
        appId: "1:896685238798:web:f9c5545f8ea47275312a5f",
        measurementId: "G-ESK8Q1DCMP"
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    return {
        provide: {
            db: firestore,
            auth: auth
        }
    };
});
