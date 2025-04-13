<template>
  <div class="container-fluid p-0 m-0">
    <!-- Header -->
    <div class="header-bar text-center py-3">
      <strong>Job search</strong>
    </div>

    <!-- Search Bar and Sort Button -->
    <div class="search-bar d-flex align-items-center my-4 px-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍Search for a position, employment contract, location or description"
        class="form-control"
      />
      <select v-model="sortOption" class="sort-select">
        <option value="role">Sort by Role (↓)</option>
        <option value="location">Sort by Location (↓)</option>
        <option value="employ">Sort by Employment (↓)</option>
      </select>
      <button class="sort-btn" @click="sortJobs">Sort</button>
    </div>

    <!-- Job Cards or Messages -->
    <div class="job-cards-box px-3 py-4 mt-2">
      <!-- Conditional Rendering Based on Login and Status -->
      <div v-if="!isLoggedIn">
        <p class="text-center"><strong>Please log in to view available jobs.</strong></p>
      </div>

      <div v-else-if="userStatus === 'Australian Citizen'">
        <p class="text-center">
          <strong>
            We regret to inform you that these job opportunities are part of a program targeted
            specifically for refugees and asylum seekers supported by ASRC.
          </strong>
        </p>
      </div>

      <div v-else>
        <!-- Title Row -->
        <div class="row job-card mb-2">
          <div class="col role-title text-center"><strong>Role</strong></div>
          <div class="col desc-title text-center"><strong>Description</strong></div>
          <div class="col apply-title text-center"><strong>Apply</strong></div>
        </div>

        <!-- Job Cards -->
        <div v-for="job in paginatedJobs" :key="job.id" class="row job-card mb-4">
          <div class="col role-box text-center">{{ job.role }}</div>
          <div class="col desc-box">
            <p><strong>Contract:</strong> {{ job.employ }}</p>
            <p><strong>Location:</strong> {{ job.location }}</p>
            <p class="mt-2 mb-1">{{ job.description }}</p>
            <a href="#" class="view-more">Click to view more</a>
          </div>
          <div class="col apply-box text-center">
            <button class="apply-btn">Apply</button>
          </div>
        </div>

        <!-- No match message -->
        <div v-if="paginatedJobs.length === 0" class="text-center mt-3">
          <em>No jobs found.</em>
        </div>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

/* Declarations*/
const searchQuery = ref('')
const sortOption = ref('role')
const currentPage = ref(1)
const jobsPerPage = 10

const isLoggedIn = ref(false)
const userStatus = ref(null)
const jobs = ref([])

/* Firebase setup */
const auth = getAuth()
const db = getFirestore()

/* Fetch jobs from firestore */
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'Jobs'))
  jobs.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true
      const userDoc = await getDocs(db, 'users', user.uid)
      if (userDoc.exists()) {
        userStatus.value = userDoc.data().status
      }
    } else {
      isLoggedIn.value = false
      userStatus.value = null
    }
  })
})

/* Filter jobs */
const filteredJobs = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return jobs.value.filter(
    (job) =>
      job.role.toLowerCase().includes(query) ||
      job.employ.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query),
  )
})

/* Sort jobs */
const sortJobs = () => {
  if (sortOption.value === 'location') {
    jobs.value.sort((a, b) => a.location.localeCompare(b.location))
  } else if (sortOption.value === 'employ') {
    jobs.value.sort((a, b) => a.employ.localeCompare(b.employ))
  } else if (sortOption.value === 'role') {
    jobs.value.sort((a, b) => a.role.localeCompare(b.role))
  }
}

/* Page split */
const paginatedJobs = computed(() => {
  const startIndex = (currentPage.value - 1) * jobsPerPage
  const endIndex = currentPage.value * jobsPerPage
  return filteredJobs.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / jobsPerPage)
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
</script>

<style scoped>
/* Header */
.header-bar {
  background-color: #e48d8d;
  font-size: 1.2rem;
  margin: auto;
  width: 99%;
}

/* Search bar and sorting controls */
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  flex-grow: 1;
  border: 2px solid #d29fe8;
  border-radius: 20px;
  padding: 5px 15px;
}

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

/* Job cards container */
.job-cards-box {
  background-color: #d29fe8;
  border-radius: 10px;
  padding: 20px;
  width: 99%;
  margin: auto;
}

/* Job cards */
.job-card .role-title,
.job-card .desc-title,
.job-card .apply-title {
  background-color: #db0ffa94;
  color: white;
  margin-bottom: 15px;
  min-width: 18%;
}

.job-card {
  background-color: transparent;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.job-card .col {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 20px;
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-more {
  font-style: italic;
  font-weight: bold;
  color: black;
  text-decoration: underline;
  align-self: flex-end;
  margin-top: 10px;
}

/* Headings */
.role-box,
.desc-box,
.apply-box {
  background-color: #f7e3fa94;
  min-width: 18%;
}

.role-box,
.role-title {
  flex: 1;
  margin-left: 20px;
}

.desc-title {
  flex: 7;
}

.desc-box {
  flex: 7;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  text-align: left;
}

.desc-box p {
  font-weight: normal;
  width: 100%;
}

/* Apply Button */
.apply-btn {
  background-color: orange;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  width: 100%;
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apply-box,
.apply-title {
  padding: 0;
  border: none;
  margin-right: 20px;
}

/* Page controls */
.Page-controls {
  margin-bottom: 20px;
}
</style>
