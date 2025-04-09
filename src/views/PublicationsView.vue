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
const cards = [
  {
    id: 1,
    title: 'Blog & news updates',
    description: 'Stay updated with the latest news and trends in the world of blogging.',
  },
  {
    id: 2,
    title: 'Legal & immigration guides',
    description: 'Find important legal advice and immigration guidelines for your journey.',
  },
  {
    id: 3,
    title: 'Mental health & well-being articles',
    description: 'Learn about mental health awareness and tips for maintaining well-being.',
  },
  {
    id: 4,
    title: 'Business & career development tips',
    description: 'Explore articles about career growth and business strategies.',
  },
  {
    id: 5,
    title: 'Education scholarship & financial aid',
    description: 'Get information on scholarships and financial aid opportunities.',
  },
  {
    id: 6,
    title: 'Tech & innovation news',
    description: 'Stay informed about the latest in technology and innovations.',
  },
  {
    id: 7,
    title: 'Mentorship programs',
    description: 'Discover various mentorship programs to guide your professional growth.',
  },
  {
    id: 8,
    title: 'Fitness & wellness tips',
    description: 'Find tips for staying fit and living a healthy, balanced life.',
  },
  {
    id: 9,
    title: 'Parenting & child development',
    description: 'Learn about parenting strategies and child development stages.',
  },
]
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
