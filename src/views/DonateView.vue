<template>
  <div class="container-fluid p-0 m-0">
    <div class="row g-0 full-height">
      <!-- Header -->
      <div class="col-md-12 d-flex flex-column align-items-center welcome-box">
        <div class="mb-3 w-100 text-center">
          <h2>Donation Form</h2>
        </div>

        <div class="thick-line"></div>

        <!-- Donation box -->
        <div class="form-section">
          <h5><strong>Donation</strong></h5>
          <div class="row mb-2">
            <div class="col-md-6">
              <label>Amount:</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-md-6">
              <label>Frequency:</label>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>

        <!-- Contact box -->
        <div class="form-section">
          <h5><strong>Contact information</strong></h5>
          <div class="row mb-2">
            <div class="col-md-6">
              <label>Name:</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-md-6">
              <label>Email:</label>
              <input type="email" class="form-control" />
            </div>
          </div>
        </div>

        <!-- Payment box -->
        <div class="form-section">
          <h5><strong>Payment information</strong></h5>
          <div class="mb-2">
            <label>Card owner name:</label>
            <input type="text" class="form-control" />
          </div>
          <div class="mb-2">
            <label>Card number:</label>
            <input type="text" class="form-control" />
          </div>
          <div class="row mb-2">
            <div class="col-md-6">
              <label>Card expiry date:</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-md-6">
              <label>Card CVV:</label>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>

        <!-- Button to pay-->
        <div class="d-flex justify-content-center w-100">
          <button class="btn custom-btn" @click="sendEmail">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style>

.thick-line {
  height: 5px;
  background-color: black;
  width: 99%;
  margin-bottom:50px;
}

.form-section {
  background-color: #ffe6e6;
  border: 3px solid black;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  width: 99%;
}

label {
  margin-top: 5px;
  margin-bottom: 5px;
}

.custom-btn {
  background-color: darkorange;
  color: white;
  border: none;
  width: 99%;
  padding: 15px;
  text-align: center;
}
.custom-btn:hover {
  background-color: darkorange;
  color: white;
}
</style>
