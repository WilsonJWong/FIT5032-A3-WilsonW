<template>
  <div class="container-fluid p-0 m-0">
    <div class="text-center fw-bold title-box">
      <h2>User Profile</h2>
    </div>
    <div class="thick-line w-100"></div>

    <div class="profile-section px-3 py-4">
      <div class="d-flex flex-column align-items-center text-center">

        <!-- User Icon -->
        <div class="user-icon mb-3">
          <p>🤘</p>
        </div>

        <!-- User's Name -->
        <h5 class="mb-3">{{ displayName || 'Guest User' }}</h5>
        <button class="btn btn-danger mb-4" @click="logout">Logout</button>

        <!-- Information box -->
        <div class="info-card p-3 w-100 w-md-75 w-lg-50">
          <p><strong>Email:</strong> {{ email }}</p>
          <p><strong>Gender:</strong> {{ gender }}</p>
          <p><strong>Status:</strong> {{ status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()
const router = useRouter()

const email = ref('')
const displayName = ref('')
const gender = ref('')
const status = ref('')

onMounted(async () => {
  const user = auth.currentUser

  if (user) {
    email.value = user.email

    // Get user data from Firestore
    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const data = userDocSnap.data()
      displayName.value = `${data.firstName} ${data.lastName}`
      gender.value = data.gender
      status.value = data.status
    } else {
      console.warn('User data not found in Firestore.')
    }
  } else {
    router.push('/Login')
  }
})

const logout = () => {
  signOut(auth).then(() => {
    router.push('/Login')
  })
}
</script>

<style scoped>
.title-box {
  margin-bottom: 24px;
}

.profile-section {
  background-color: #f2f2ff;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  min-height: 70vh;
}

.user-icon {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border: 3px solid red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.1);
  font-size: 3.5rem;
}

.info-card {
  background-color: #ffffff;
  border: 2px solid red;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.1);
  text-align: left;
}

.info-card p {
  font-size: 1.1rem;
  margin-bottom: 10px;
}
</style>
