<template>
  <div class="container-fluid p-0 m-0">
    <!-- Header -->
    <div class="header-bar text-center py-3">
      <strong>Guidance hub</strong>
    </div>

    <!-- List of persons -->
    <div class="content-area px-3 py-4">
      <div v-for="person in persons" :key="person.id" class="person-row d-flex align-items-center mb-4">

        <!-- Left Icon + Name -->
        <div class="left-section text-center me-3">
          <img :src="getImageUrl(person.image)" alt="Person" class="person-icon mb-2" />
          <div>{{ person.name }}</div>
        </div>

        <!-- Middle Info Box -->
        <div class="middle-section flex-grow-1">
          <div class="info-box">
            <p><strong>Occupation:</strong> {{ person.occupation }}</p>
            <p><strong>Field of expertise:</strong> {{ person.expertise }}</p>
            <p>{{ person.description }}</p>
          </div>
        </div>

        <!-- Right Connect -->
        <div class="right-section text-center ms-3">
          <button class="connect-btn">Click to connect</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const persons = [
  { id: 1, name: 'Jessie Mendoca', occupation: 'xxx', expertise: 'xxx', description: 'Description', image: 'Picture1.png' },
  { id: 2, name: 'Harry Balthormore', occupation: 'xxx', expertise: 'xxx', description: 'Description', image: 'Picture2.png' },
  { id: 3, name: 'James Peterson', occupation: 'xxx', expertise: 'xxx', description: 'Description', image: 'Picture3.png' }
]

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
</style>
