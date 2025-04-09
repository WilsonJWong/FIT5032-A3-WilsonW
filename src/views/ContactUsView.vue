<template>
  <div class="container-fluid p-0 m-0">

    <!-- Inquiry Form -->
    <div class="text-center fw-bold title-box"> <h2>Inquiry form</h2></div>
    <div class="thick-line w-100"></div>

    <div class="inquiry-section px-3 py-4">
      <div class="row align-items-center">

        <!-- Left fields -->
        <div class="col-md-3">
          <div class="mb-2">
            <label><strong>Email:</strong></label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              :class="{'is-invalid': emailError}"
              @blur="validateEmail"
            />
            <div v-if="emailError" class="invalid-feedback">{{ emailErrorMessage }}</div>
          </div>
          <div>
            <label><strong>Name:</strong></label>
            <input
              type="text"
              v-model="name"
              class="form-control"
              :class="{'is-invalid': nameError}"
              @blur="validateName"
            />
            <div v-if="nameError" class="invalid-feedback">{{ nameErrorMessage }}</div>
          </div>
        </div>

        <!-- Arrow -->
        <div class="col-md-2 text-center">
          <div class="large-arrow">&rarr;</div>
        </div>

        <!-- Inquiry & Submit -->
        <div class="col-md-7">
          <textarea
            class="form-control mb-2"
            rows="4"
            placeholder="Please submit your inquiry here"
            v-model="inquiry"
            :class="{'is-invalid': inquiryError}"
            @blur="validateInquiry"
          ></textarea>
          <div v-if="inquiryError" class="invalid-feedback">{{ inquiryErrorMessage }}</div>
          <div class="d-flex justify-content-end">
            <button
              class="submit-btn"
              :class="{'submit-btn-active': !isFormInvalid, 'submit-btn-disabled': isFormInvalid}"
              :disabled="isFormInvalid"
              @click="sendEmail"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Space between inquiry form and contact/location section -->
    <div class="my-4"></div>

    <!-- Contact & Location Section -->
    <div class="row contact-location-row px-3 py-4">

      <!-- Persons of Contact -->
      <div class="col-md-6 border-end contact-col">
        <div class="section-title text-center mb-3">Persons of contact</div>
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="person-card d-flex align-items-center mb-3 contact-card-wrapper"
        >
          <div class="text-center me-3">
            <strong><small>{{ contact.label }}</small></strong>
          </div>
          <div class="contact-card">
            <p><strong>Email:</strong> {{ contact.email }}</p>
            <p><strong>Phone no:</strong> {{ contact.phone }}</p>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="col-md-6 location-col">
        <div class="section-title text-center mb-3">Location</div>
        <div class="d-flex align-items-stretch location-inner">
          <img src="../assets/building.jpg" alt="Building" class="building-image me-3" />
          <div class="location-card">
            <p><strong>Office address:</strong> 15 Ploon Avenue, Monash, VIC, Australia</p>
            <p><strong>Reception phone no:</strong> 1800 2162 2151</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

const contacts = [
  { id: 1, label: 'Deanh O. (Operations Manager):', email: 'wont.stop@ASRC.com.au', phone: '0446 235 848' },
  { id: 2, label: 'Olive D. (Program Coordinator):', email: 'bob.smith@ASRC.com.au', phone: '0412 987 654' },
]

const email = ref('')
const name = ref('')
const inquiry = ref('')

const emailError = ref(false)
const emailErrorMessage = ref('')
const nameError = ref(false)
const nameErrorMessage = ref('')
const inquiryError = ref(false)
const inquiryErrorMessage = ref('')

const validateEmail = () => {
  if (!email.value) {
    emailError.value = true
    emailErrorMessage.value = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = true
    emailErrorMessage.value = 'Email must be valid'
  } else {
    emailError.value = false
    emailErrorMessage.value = ''
  }
}

const validateName = () => {
  if (!name.value.trim()) {
    nameError.value = true
    nameErrorMessage.value = 'Name cannot be empty'
  } else if (!/^[A-Za-z\s]+$/.test(name.value)) {
    nameError.value = true
    nameErrorMessage.value = 'Name must only contain alphabets'
  } else {
    nameError.value = false
    nameErrorMessage.value = ''
  }
}

const validateInquiry = () => {
  if (!inquiry.value.trim()) {
    inquiryError.value = true
    inquiryErrorMessage.value = 'Inquiry cannot be empty'
  } else if (inquiry.value.length < 5) {
    inquiryError.value = true
    inquiryErrorMessage.value = 'Inquiry must be at least 5 characters'
  } else if (inquiry.value.length > 300) {
    inquiryError.value = true
    inquiryErrorMessage.value = 'Inquiry must be less than 300 characters'
  } else {
    inquiryError.value = false
    inquiryErrorMessage.value = ''
  }
}

const isFormInvalid = computed(() => {
  return !(
    email.value &&
    name.value &&
    inquiry.value &&
    !emailError.value &&
    !nameError.value &&
    !inquiryError.value
  )
})

const sendEmail = () => {
  alert("Form submitted!")
}
</script>


<style scoped>

.title-box{
  margin-bottom:24px;
}

.inquiry-section {
  background-color: #ffeeee;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
}

.large-arrow {
  font-size: 6rem;
  color: #999;
}

.submit-btn {
  background-color: orange;
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-btn-active {
  background-color: orange;
}

.submit-btn-disabled {
  background-color: grey;
  cursor: not-allowed;
}

.submit-btn:hover {
  background-color: darkorange;
}

.section-title {
  font-weight: bold;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
}

.contact-card-wrapper {
  background-color: #ffe6e6;
  border-radius: 10px;
  padding: 10px;
}

.contact-card {
  border: 2px solid red;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  flex-grow: 1;
}

.location-card {
  border: 2px solid red;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  width: 60%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-location-row {
  display: flex;
  align-items: stretch;
}

.contact-col,
.location-col {
  display: flex;
  flex-direction: column;
}

.location-inner {
  flex: 1;
  display: flex;
  align-items: stretch;
}

.building-image {
  max-width: 200px;
  height: auto;
  border-radius: 10px;
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.9rem;
}

.inquiry-section .row {
  display: flex;
  align-items: stretch;
}

.inquiry-section .form-control {
  flex-grow: 1;
}

.inquiry-section .col-md-7 {
  margin-top: 60px;
}
</style>

