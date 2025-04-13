<template>
  <div class="container-fluid p-0 m-0">
    <!-- Header -->
    <div class="header-bar text-center py-3">
      <strong>Mentors hub</strong>
    </div>

    <!-- Search Bar -->
    <div class="search-bar d-flex align-items-center my-4 px-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍 Search for a mentor, occupation, expertise, or description"
        class="form-control"
      />
      <select v-model="sortOption" class="sort-select">
        <option value="name">Sort by name (↓)</option>
        <option value="occupation">Sort by occupation (↓)</option>
        <option value="expertise">Sort by expertise (↓)</option>
        <option value="rating">Sort by rating (↓)</option>
      </select>
      <button class="sort-btn" @click="sortMentors">Sort</button>
    </div>

    <!-- List -->
    <div class="content-area px-3 py-4">
      <div
        v-for="person in paginatedMentors"
        :key="person.id"
        class="person-row d-flex align-items-center mb-4"
      >
        <!-- Left -->
        <div class="left-section text-center me-3">
          <div class="person-icon mb-2">{{ person.name.charAt(0) }}</div>
          <div>{{ person.name }}</div>
        </div>

        <!-- Middle -->
        <div class="middle-section flex-grow-1">
          <div class="info-box">
            <p><strong>Occupation:</strong> {{ person.occupation }}</p>
            <p><strong>Field of expertise:</strong> {{ person.expertise }}</p>
            <p><strong>Rating:</strong> {{ person.rating.toFixed(2) }} / 5</p>
            <p><strong>Contact:</strong> {{ person.phone }}</p>
            <p>{{ person.description }}</p>
          </div>
          <button class="review-btn" @click="openReviewModal(person)">Rate</button>
        </div>

        <!-- Popup review -->
        <div
          v-if="isReviewModalOpen && selectedMentor.id === person.id"
          class="review-modal-overlay"
        >
          <div class="review-modal">
            <h4>Rate {{ selectedMentor?.name }}</h4>
            <div class="rating">
              <button v-for="n in 5" :key="n" @click="submitReview(n)" class="rating-btn">
                {{ n }}
              </button>
            </div>
            <button @click="closeReviewModal" class="close-btn">Close</button>
          </div>
        </div>
      </div>

      <!-- No match -->
      <div v-if="filteredMentors.length === 0" class="text-center">
        <em>No matches found.</em>
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
import { getFirestore, collection, getDocs} from 'firebase/firestore'

const searchQuery = ref('')
const sortOption = ref('name')
const mentors = ref([])
const isReviewModalOpen = ref(false)
const selectedMentor = ref(null)
const db = getFirestore()

const fetchMentors = async () => {
  const querySnapshot = await getDocs(collection(db, 'mentors'))
  mentors.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

onMounted(() => {
  fetchMentors()
})

const sortMentors = () => {
  if (sortOption.value === 'rating') {
    mentors.value.sort((a, b) => b.rating - a.rating)
  } else {
    mentors.value.sort((a, b) => a[sortOption.value].localeCompare(b[sortOption.value]))
  }
}

const filteredMentors = computed(() => {
  const query = String(searchQuery.value).toLowerCase()
  return mentors.value.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(query) ||
      mentor.occupation.toLowerCase().includes(query) ||
      mentor.expertise.toLowerCase().includes(query) ||
      mentor.description.toLowerCase().includes(query) ||
      mentor.phone.includes(query),
  )
})

const currentPage = ref(1)
const mentorsPerPage = 10

const paginatedMentors = computed(() => {
  const startIndex = (currentPage.value - 1) * mentorsPerPage
  const endIndex = currentPage.value * mentorsPerPage
  return filteredMentors.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredMentors.value.length / mentorsPerPage)
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

const openReviewModal = (mentor) => {
  selectedMentor.value = mentor
  isReviewModalOpen.value = true
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
  selectedMentor.value = null
}

import axios from 'axios';

const submitReview = async (rating) => {
  if (selectedMentor.value) {
    const mentorId = selectedMentor.value.id;

    try {
      console.log('Sending review:', { mentorId, rating });
      const response = await axios.post('https://submitreview-ulawfedg4a-uc.a.run.app', {
        mentorId,
        rating,
      });

      if (response.status === 200) {
        console.log('Review submitted successfully');
        await fetchMentors();
        closeReviewModal();
      } else {
        console.error('Error submitting review:', response.data);
      }
    } catch (error) {
      console.error('Error submitting review via axios:', error.response || error.message);
    }
  }
};
</script>

<style scoped>
.header-bar {
  background-color: #e48d8d;
  font-size: 1.2rem;
  margin: auto;
  width: 99%;
}

.content-area {
  background-color: #ffe6e6;
  border-radius: 8px;
  margin: auto;
  width: 99%;
}

.person-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-section {
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.person-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #a065d0;
  color: white;
  font-size: 1.5rem;
  line-height: 60px;
  font-weight: bold;
}

.middle-section {
  flex-grow: 1;
  margin: 0 15px;
  padding: 10px;
}

.info-box {
  border: 2px solid red;
  border-radius: 20px;
  padding: 15px;
  background-color: white;
}

.review-btn {
  width: 100%;
  flex-grow: 1;
  margin: 5px 0;
  background-color: orange;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  padding: 10px;
}

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

.review-btn {
  margin-top: 10px;
}

.text-purple {
  color: #a065d0;
}

.review-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.review-modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.rating-btn {
  margin: 5px;
  padding: 10px;
  background-color: #a065d0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.rating-btn:hover {
  background-color: #8c56b0;
}

.close-btn {
  margin-top: 15px;
  background-color: #e48d8d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #d38c8c;
}
</style>
