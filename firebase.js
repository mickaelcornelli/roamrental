import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPoIxJ3YsXnupSa-Tderzu9BjyvCcr73E",

    authDomain: "roamrental.firebaseapp.com",

    projectId: "roamrental",

    storageBucket: "roamrental.appspot.com",

    messagingSenderId: "1045386689280",

    appId: "1:1045386689280:web:f713bb6f33b667773cd1e5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
