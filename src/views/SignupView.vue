<template>
  <div class="container-fluid p-0 m-0">
    <div class="row g-0 full-height">
      <!-- Welcome Section -->
      <div class="col-md-4 d-flex justify-content-center align-items-center welcome-box">
        <div class="mb-3 w-100">
          <h2 class="text-center">Welcome!</h2>
        </div>
        <div class="mb-3 w-100">
          <p class="sign-in-text">
            Have an account?
            <router-link to="/Login" class="sign-in-link">Sign in</router-link>
          </p>
        </div>
      </div>

      <!-- Sign-up Form -->
      <div class="col-md-8 d-flex flex-column justify-content-center align-items-start px-5">
        <h4 class="text-center mb-4">Please provide your details to create an account</h4>

        <div class="mb-3 w-100">
          <label for="email" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" v-model="email" />
        </div>

        <div class="mb-3 w-100">
          <div class="row g-3">
            <div class="col-6">
              <label for="firstName" class="form-label">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="firstName" />
            </div>
            <div class="col-6">
              <label for="lastName" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="lastName" />
            </div>
          </div>
        </div>

        <div class="mb-3 w-100">
          <div class="row g-3">
            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" />
            </div>
            <div class="col-6">
              <label for="confirmPassword" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                v-model="confirmPassword"
              />
            </div>
          </div>
        </div>

        <div class="mb-3 w-100">
          <div class="row g-3">
            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" class="form-control" v-model="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to disclose">Prefer not to disclose</option>
              </select>
            </div>
            <div class="col-6">
              <label for="status" class="form-label">Status</label>
              <select id="status" class="form-control" v-model="status">
                <option value="Asylum Seeker">Asylum Seeker</option>
                <option value="Refugee">Refugee</option>
                <option value="Australian Citizen">Australian Citizen</option>
              </select>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between w-100">
          <button class="btn btn-primary" @click="signUp">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')
const confirmPassword = ref('')
const gender = ref('')
const status = ref('')

const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signUp = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      gender: gender.value,
      status: status.value,
      createdAt: new Date(),
    })

    console.log('Firebase Register Successful!', user)
    router.push('/Login')
  } catch (error) {
    console.error('Error registering:', error.code, error.message)
    alert(error.message)
  }
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
