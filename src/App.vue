<template>
  <div class="main-controller">

    <!-- Logo and navigation section -->
    <header class="logo-container">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-7 d-flex align-items-center">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
            <h1>ASRC | Asylum Seeker Refugee Centre</h1>
          </div>
          <div class="col-12 col-md-3 d-flex justify-content-center">
            <div class="row w-100">
              <div class="col-6">
                <router-link to="/Donate">
                  <section class="donate-box">
                    <p>Donate</p>
                  </section>
                </router-link>
              </div>
              <div class="col-6">
                <router-link to="/ContactUs">
                  <section class="contact-us-box">
                    <p>Contact Us</p>
                  </section>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-2 d-flex justify-content-center">
            <div class="d-flex gap-3 align-items-end">

              <!-- Language block -->
              <div class="d-flex flex-column align-items-center">
                <img src="@/assets/language.png" alt="Language" class="icon" />
                <span class="profile-label">[Language]</span>
              </div>

              <!-- Profile block -->
              <router-link
                :to="isLoggedIn ? '/Profile' : '/Login'"
                class="text-center text-decoration-none"
              >
                <div class="d-flex flex-column align-items-center">
                  <img src="@/assets/profile.png" alt="Profile" class="icon" />
                  <span class="profile-label">[{{ isLoggedIn ? 'Profile' : 'Login' }}]</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- BHeader component -->
    <BHeader />

    <!-- Main content section -->
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import BHeader from './components/BHeader.vue'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = user !== null
  })
})
</script>

<style scoped>

/* Header */
header {
  width: 100%;
}

.logo {
  max-width: 200px;
  height: auto;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

/* Navigation box*/
.donate-box,
.contact-us-box {
  background-color: white;
  border: 4px solid red;
  border-radius: 20px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.donate-box p,
.contact-us-box p {
  color: #333;
  margin: 0;
}

/* Profile and icon */
.profile-label {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  color: black;
}

.icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
</style>
