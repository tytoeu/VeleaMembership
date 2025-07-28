// firebase.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBI7FeWtjG49XxHOxRp1dgWjob5wID8q1E",
    authDomain: "velea-f739c.firebaseapp.com",
    databaseURL: "https://velea-f739c-default-rtdb.firebaseio.com",
    projectId: "velea-f739c",
    storageBucket: "velea-f739c.firebasestorage.app",
    messagingSenderId: "541415925350",
    appId: "1:541415925350:web:bc6dd87237760d14ffafa7"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getDatabase(app);