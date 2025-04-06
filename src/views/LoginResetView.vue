<template>
  <div class="container-fluid p-0 m-0">
    <div class="row g-0 full-height">
      <div class="col-md-4 d-flex justify-content-center align-items-center welcome-box">
        <div class="mb-3 w-100">
          <h2 class="text-center">Reset Password !</h2>
          <p class="sign-in-text">
            <router-link to="/Login" class="sign-in-link">Back to login</router-link>
          </p>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column justify-content-center align-items-start px-5">
        <h4 class="text-center mb-4">Please enter your email used for the account</h4>
        <div class="mb-3 w-100">
          <input type="text" class="form-control" placeholder="Email" v-model="email" />
        </div>
        <div class="d-flex justify-content-between w-100">
          <button class="btn btn-primary" @click="sendEmail">Send reset to email</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.full-height {
  min-height: 100vh;
  height: auto;
  display: flex;
}

.welcome-box {
  background-color: #fce4ec;
  border: 5px solid #f8bbd0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

h2 {
  color: #ec407a;
}

.sign-up-text {
  margin-top: auto;
}

button {
  margin-top: 20px;
}
</style>

<script setup>
// No script needed for now
</script>
