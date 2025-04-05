<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-controller">
    <header><BHeader></BHeader></header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-box {
  flex: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
}
@media (min-width: 1024px) {
  .main-box {
    max-width: 1000px;
  }
}
</style>
