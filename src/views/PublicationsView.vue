<template>
  <div class="container-fluid p-0 m-0">
    <div class="row px-3 py-4">
      <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4" v-for="card in cards" :key="card.id">

        <div class="info-card">
          <!-- Title -->
          <h6 class="card-title text-danger fw-bold">{{ card.title }}</h6>

          <!-- Description -->
          <p class="mb-2">{{ card.description }}</p>

          <!-- Placeholder icon/image (stretches across the row) -->
          <div class="icon-row d-flex justify-content-start mb-2">
            <div class="placeholder-box"></div>
          </div>

          <!-- View more link -->
          <div class="text-end">
            <a href="#" class="view-more">Click to view more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// Imports
import { ref, onMounted } from 'vue'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'

// Declarations
const db = getFirestore()
const cards = ref([])

// Fetch data
onMounted(() => {
  const publicationsRef = collection(db, 'Publications')

  onSnapshot(publicationsRef, (snapshot) => {
    cards.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
    }))
  })
})
</script>

<style scoped>
.info-card {
  border: 2px solid red;
  border-radius: 20px;
  background-color: white;
  padding: 15px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title {
  font-size: 0.95rem;
}

.placeholder-box {
  width: 100%;
  height: 100px;
  background-color: #ddd;
  border-radius: 4px;
}

.view-more {
  font-style: italic;
  font-weight: bold;
  color: black;
  text-decoration: underline;
}
</style>
