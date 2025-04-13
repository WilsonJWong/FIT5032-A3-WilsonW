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
        <h5 class="profile-name mb-3">
          <strong>{{ displayName || 'Guest User' }}</strong>
        </h5>
        <button class="btn btn-danger mb-4" @click="logout">Logout</button>

        <!-- Information box -->
        <div class="info-card p-3 w-100 w-md-75 w-lg-50">
          <h5 class="info-title">User Information</h5>
          <p><strong>Email:</strong> {{ email }}</p>
          <p><strong>Gender:</strong> {{ gender }}</p>
          <p><strong>Status:</strong> {{ status }}</p>
        </div>

        <!-- Donation Information -->
        <div class="donation-card p-3 w-100 w-md-75 w-lg-50 mt-4">
          <h5>Donation History</h5>

          <button class="btn btn-primary" @click="exportToPDF">Export to PDF</button>

          <!-- Donation Search and Sort -->
          <div class="search-bar d-flex align-items-center my-4 px-3">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="🔍Search by Amount, Frequency or Date"
              class="form-control"
            />
            <select v-model="sortOption" class="sort-select">
              <option value="amount">Sort by Amount (↓)</option>
              <option value="frequency">Sort by Frequency (↓)</option>
              <option value="createdAt">Sort by Donation Date (↓)</option>
            </select>
            <button class="sort-btn" @click="sortDonations">Sort</button>
          </div>

          <div v-for="(donation, index) in paginatedDonations" :key="index" class="donation-item">
            <div class="donation-box">
              <div class="donation-detail"><strong>Amount:</strong> ${{ donation.amount }}</div>
              <div class="donation-detail">
                <strong>Frequency:</strong> {{ donation.frequency }}
              </div>
              <div class="donation-detail">
                <strong>Donated on:</strong>
                {{ formatDate(donation.createdAt) }}
              </div>
            </div>
          </div>

          <!-- No match message -->
          <div v-if="filteredDonations.length === 0" class="text-center mt-3">
            <p>No donations found.</p>
          </div>
        </div>

        <!-- Pages -->
        <div class="Page-controls text-center mt-4">
          <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">
            Previous
          </button>
          <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
          <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

/* Imports */
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { jsPDF } from 'jspdf'

/* Declarations */
const auth = getAuth()
const db = getFirestore()
const router = useRouter()

const email = ref('')
const displayName = ref('')
const gender = ref('')
const status = ref('')

const donations = ref([])

const searchQuery = ref('')
const sortOption = ref('amount')

const currentPage = ref(1)
const donationsPerPage = 10

/* Fetch user and donations */
onMounted(async () => {
  const user = auth.currentUser

  if (user) {
    email.value = user.email

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

    const donationsQuery = query(collection(db, 'Donations'), where('donorEmail', '==', user.email))

    const querySnapshot = await getDocs(donationsQuery)
    donations.value = querySnapshot.docs.map((doc) => doc.data())
  } else {
    router.push('/Login')
  }
})

/* Logout handler */
const logout = () => {
  signOut(auth).then(() => {
    router.push('/Login')
  })
}

/* Search */
const filteredDonations = computed(() => {
  return donations.value.filter((donation) => {
    const searchLower = searchQuery.value.toLowerCase()
    return (
      donation.amount.toString().includes(searchLower) ||
      donation.frequency.toLowerCase().includes(searchLower) ||
      new Date(donation.createdAt.seconds * 1000).toLocaleDateString().includes(searchLower)
    )
  })
})

/* Sort */
const sortDonations = () => {
  if (sortOption.value === 'amount') {
    donations.value.sort((a, b) => b.amount - a.amount)
  } else if (sortOption.value === 'frequency') {
    const frequencyOrder = ['once off', 'monthly', 'annually']
    donations.value.sort(
      (a, b) => frequencyOrder.indexOf(a.frequency) - frequencyOrder.indexOf(b.frequency),
    )
  } else if (sortOption.value === 'createdAt') {
    donations.value.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
  }
}

/* Page */
const paginatedDonations = computed(() => {
  const startIndex = (currentPage.value - 1) * donationsPerPage
  const endIndex = currentPage.value * donationsPerPage
  return filteredDonations.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredDonations.value.length / donationsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

/* Date format */
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, '/')
}

/* Export PDF */
const exportToPDF = () => {
  const doc = new jsPDF()

  const donationsData = filteredDonations.value.map((donation) => ({
    Amount: donation.amount,
    Frequency: donation.frequency,
    DonatedOn: formatDate(donation.createdAt),
  }))

  doc.text('Donation History', 10, 10)

  donationsData.forEach((donation, index) => {
    const yPosition = 20 + index * 10
    doc.text(
      `Amount: $${donation.Amount}, Frequency: ${donation.Frequency}, Donated On: ${donation.DonatedOn}`,
      10,
      yPosition,
    )
  })

  doc.save('donations.pdf')
}
</script>

<style scoped>

/* Title box */
.title-box {
  margin-bottom: 24px;
}

/* Profile section */
.profile-section {
  background-color: #ffeeee;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  min-height: 70vh;
}

/* User */
.user-icon {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border: 3px solid orange;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
}

.profile-name {
  color: orange;
}

/* Info Card */
.info-card {
  background-color: #ffffff;
  border: 2px solid;
  border-radius: 10px;
  text-align: left;
}

.info-title {
  text-align: center;
  margin-bottom: 15px;
}

.info-card p {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Search */
.search-bar input {
  flex-grow: 1;
  border: 2px solid #d29fe8;
  border-radius: 20px;
  padding: 5px 15px;
}

/* Sort */
.sort-select {
  padding: 5px;
  border-radius: 5px;
  font-size: 1rem;
}

.sort-btn {
  background-color: #a065d0;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
}

.sort-btn:hover {
  background-color: #8c56b0;
}

/* Donation */
.donation-card {
  background-color: white;
  border: 2px solid;
  border-radius: 10px;
}

.donation-item {
  margin-top: 12px;
  margin-bottom: 12px;
}

.donation-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.donation-detail strong {
  margin-right: 5px;
}

/* Page */
.Page-controls {
  margin-bottom: 20px;
}
</style>

