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
        placeholder="🔍 Search for a position"
        class="form-control"
      />
      <select v-model="sortOption" class="sort-select">
        <option value="name">Sort by name</option>
        <option value="occupation">Sort by occupation</option>
        <option value="expertise">Sort by expertise</option>
      </select>
      <button class="sort-btn" @click="sortPersons">Sort</button>
    </div>

    <!-- List -->
    <div class="content-area px-3 py-4">
      <div
        v-for="person in filteredPersons"
        :key="person.id"
        class="person-row d-flex align-items-center mb-4"
      >
        <!-- Left -->
        <div class="left-section text-center me-3">
          <img :src="getImageUrl(person.image)" alt="Person" class="person-icon mb-2" />
          <div>{{ person.name }}</div>
        </div>

        <!-- Middle -->
        <div class="middle-section flex-grow-1">
          <div class="info-box">
            <p><strong>Occupation:</strong> {{ person.occupation }}</p>
            <p><strong>Field of expertise:</strong> {{ person.expertise }}</p>
            <p>{{ person.description }}</p>
          </div>
        </div>

        <!-- Right -->
        <div class="right-section text-center ms-3">
          <button class="connect-btn">Click to connect</button>
        </div>
      </div>

      <!-- No match -->
      <div v-if="filteredPersons.length === 0" class="text-center">
        <em>No matches found.</em>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const sortOption = ref('occupation')

const persons = ref([
  {
    id: 1,
    name: 'Jessie Mendoca',
    occupation: 'Career Coach',
    expertise: 'Financial Advisory',
    description: 'Specializes in transitioning into tech roles.',
    image: 'Picture1.png',
  },
  {
    id: 2,
    name: 'James Peterson',
    occupation: 'Academic Advisor',
    expertise: 'STEM Education',
    description: 'Guides students through STEM career paths.',
    image: 'Picture2.png',
  },
  {
    id: 3,
    name: 'Harry Balthormore',
    occupation: 'Mental Health Counselor',
    expertise: 'Youth Development',
    description: 'Helps young adults build emotional resilience.',
    image: 'Picture3.png',
  },
])

const sortedPersons = ref([])

const sortPersons = () => {
  sortedPersons.value = [...persons.value].sort((a, b) =>
    a[sortOption.value].localeCompare(b[sortOption.value])
  )
}

// Automatically sort on load
onMounted(() => {
  sortPersons()
})

const filteredPersons = computed(() =>
  sortedPersons.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const getImageUrl = (filename) => {
  return new URL(`../assets/${filename}`, import.meta.url).href
}
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
  width: 100px;
}

.person-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.info-box {
  border: 2px solid red;
  border-radius: 20px;
  padding: 15px;
  background-color: white;
}

.connect-btn {
  background-color: orange;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
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

.text-purple {
  color: #a065d0;
}
</style>
