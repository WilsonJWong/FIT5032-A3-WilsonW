<template>
  <div class="container-fluid p-0 m-0">
    <div class="row g-0 full-height">
      <div class="col-md-4 d-flex justify-content-center align-items-center welcome-box">
        <div class="mb-3 w-100">
          <h2 class="text-center">Welcome!</h2>
        </div>
        <div class="mb-3 w-100">
          <p class="sign-up-text">
            Don't have an account?
            <router-link to="/Signup" class="sign-up-link">Sign up</router-link>
          </p>
        </div>
      </div>

      <div class="col-md-8 d-flex flex-column justify-content-center align-items-start px-5">
        <h4 class="text-center mb-4">Please sign in to continue</h4>
        <div class="mb-3 w-100">
          <input type="text" class="form-control" placeholder="Email" v-model="email" />
        </div>
        <div class="mb-3 w-100">
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
        </div>
        <div class="d-flex justify-content-between w-100">
          <button class="btn btn-primary" @click="signin">Sign in</button>
          <button class="btn btn-link forgot-btn" @click="forgotPassword">
            Forgot username / password?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const auth = getAuth()

const signin = () => {
  if (!email.value || !password.value) {
    alert('Please enter both email and password.')
    return
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Firebase Login Successful!', userCredential.user)
      router.push('/Profile')
    })
    .catch((error) => {
      console.error('Login error:', error.code, error.message)
      alert('Login failed: ' + error.message)
    })
}

const forgotPassword = () => {
  router.push({ name: 'LoginReset' })
}
</script>

<style scoped>
.full-height {
  min-height: 100vh;
  height: auto;
  display: flex;
}

.welcome-box {
  background-color: #fce4ec;
  border: 5px solid #f8bbd0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

h2 {
  color: #ec407a;
}

.sign-up-text {
  margin-top: auto;
}

button {
  margin-top: 20px;
}

.forgot-btn {
  align-self: flex-end;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}
</style>
