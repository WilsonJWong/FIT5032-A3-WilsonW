import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore";

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyAZJQXYfVKdKDURAvO6RhsFEZrnwocSHR0",
  authDomain: "ito5032-a3.firebaseapp.com",
  projectId: "ito5032-a3",
  storageBucket: "ito5032-a3.firebasestorage.app",
  messagingSenderId: "994961541627",
  appId: "1:994961541627:web:c747e473f4cf6a0bfde35e"
};

initializeApp(firebaseConfig);
const db = getFirestore()
export default db
