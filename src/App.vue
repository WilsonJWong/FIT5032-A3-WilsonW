<script setup>
import BHeader from './components/BHeader.vue';
</script>

<template>
  <div class = "main-controller">
    <header><BHeader></BHeader></header>
    <main class = "main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
}

header {
  line-height: 1.5;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.main-box {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .main-container {
    flex-direction: column;
  }

  header {
    display: flex;
    justify-content: center;
  }

  .main-box {
    max-width: 1000px;
  }
}
</style>
