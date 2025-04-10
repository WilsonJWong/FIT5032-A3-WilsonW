import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZJQXYfVKdKDURAvO6RhsFEZrnwocSHR0",
  authDomain: "ito5032-a3.firebaseapp.com",
  projectId: "ito5032-a3",
  storageBucket: "ito5032-a3.firebasestorage.app",
  messagingSenderId: "994961541627",
  appId: "1:994961541627:web:c747e473f4cf6a0bfde35e"
};

initializeApp(firebaseConfig);

const app = createApp(App)
const db = getFirestore(app);
const auth = getAuth(app);


app.use(router)
app.mount('#app')

app.use(PrimeVue, { theme: { preset: Aura } })

export { db, auth };



