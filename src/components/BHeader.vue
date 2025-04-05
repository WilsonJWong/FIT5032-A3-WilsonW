<template>
  <div class="container-fluid">
    <header class="d-flex justify-content-between py-3 w-100">
      <ul class="nav nav-pills w-100 m-0">
        <li class="nav-item flex-fill">
          <router-link to="/" class="nav-link" active-class="active">About Us</router-link>
        </li>
        <li class="nav-item flex-fill">
          <router-link to="/Community" class="nav-link" active-class="active"
            >Community</router-link
          >
        </li>
        <li class="nav-item flex-fill">
          <router-link to="/Publications" class="nav-link" active-class="active"
            >Publications</router-link
          >
        </li>
        <li class="nav-item flex-fill">
          <router-link to="/Resources" class="nav-link" active-class="active">Resource</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
::v-deep(.nav-pills) {
  background-color: lightpink !important;
}

::v-deep(.nav-pills .nav-link) {
  color: black !important;
  text-align: center;
}

::v-deep(.nav-pills .nav-link.active) {
  background-color: lightgrey !important;
  color: black !important;
  font-weight: bold;
}
</style>
