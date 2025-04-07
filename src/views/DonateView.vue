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
              <input
                type="text"
                v-model="amount"
                class="form-control"
                :class="{'is-invalid': amountError}"
                @blur="validateAmount"
              />
              <div v-if="amountError" class="invalid-feedback">{{ amountErrorMessage }}</div>
            </div>
            <div class="col-md-6">
              <label>Frequency:</label>
              <select
                v-model="frequency"
                class="form-control"
              >
                <option value="">Select Frequency</option>
                <option value="once off">Once off</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Contact box -->
        <div class="form-section">
          <h5><strong>Contact information</strong></h5>
          <div class="row mb-2">
            <div class="col-md-6">
              <label>Name:</label>
              <input
                type="text"
                v-model="name"
                class="form-control"
                :class="{'is-invalid': nameError}"
                @blur="validateName"
              />
              <div v-if="nameError" class="invalid-feedback">{{ nameErrorMessage }}</div>
            </div>
            <div class="col-md-6">
              <label>Email:</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                :class="{'is-invalid': emailError}"
                @blur="validateEmail"
              />
              <div v-if="emailError" class="invalid-feedback">{{ emailErrorMessage }}</div>
            </div>
          </div>
        </div>

        <!-- Payment box -->
        <div class="form-section">
          <h5><strong>Payment information</strong></h5>
          <div class="mb-2">
            <label>Card owner name:</label>
            <input
              type="text"
              v-model="cardOwner"
              class="form-control"
              :class="{'is-invalid': cardOwnerError}"
              @blur="validateCardOwner"
            />
            <div v-if="cardOwnerError" class="invalid-feedback">{{ cardOwnerErrorMessage }}</div>
          </div>
          <div class="mb-2">
            <label>Card number:</label>
            <input
              type="text"
              v-model="cardNumber"
              class="form-control"
              :class="{'is-invalid': cardNumberError}"
              @blur="validateCardNumber"
            />
            <div v-if="cardNumberError" class="invalid-feedback">
              <div v-if="cardNumberNonNumericError">Card number must be numeric</div>
              <div v-if="cardNumberLengthError">Card number must be 16 digits long</div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6">
              <label>Card expiry date:</label>
              <input
                type="text"
                v-model="expiryDate"
                class="form-control"
                :class="{'is-invalid': expiryDateError}"
                @blur="validateExpiryDate"
              />
              <div v-if="expiryDateError" class="invalid-feedback">{{ expiryDateErrorMessage }}</div>
            </div>
            <div class="col-md-6">
              <label>Card CVV:</label>
              <input
                type="text"
                v-model="cvv"
                class="form-control"
                :class="{'is-invalid': cvvError}"
                @blur="validateCvv"
              />
              <div v-if="cvvError" class="invalid-feedback">{{ cvvErrorMessage }}</div>
            </div>
          </div>
        </div>

        <!-- Button to pay-->
        <div class="d-flex justify-content-center w-100">
          <button
            class="btn custom-btn"
            @click="sendEmail"
            :disabled="isFormInvalid"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const amount = ref('')
const frequency = ref('')
const name = ref('')
const email = ref('')
const cardOwner = ref('')
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')

const amountError = ref(false)
const amountErrorMessage = ref('')
const nameError = ref(false)
const nameErrorMessage = ref('')
const emailError = ref(false)
const emailErrorMessage = ref('')
const cardOwnerError = ref(false)
const cardOwnerErrorMessage = ref('')
const cardNumberError = ref(false)
const cardNumberNonNumericError = ref(false)
const cardNumberLengthError = ref(false)
const expiryDateError = ref(false)
const expiryDateErrorMessage = ref('')
const cvvError = ref(false)
const cvvErrorMessage = ref('')

const validateAmount = () => {
  if (isNaN(amount.value)) {
    amountError.value = true
    amountErrorMessage.value = 'Amount must be a number'
  } else if (Number(amount.value) <= 0) {
    amountError.value = true
    amountErrorMessage.value = 'Amount must be greater than 0'
  } else {
    amountError.value = false
    amountErrorMessage.value = ''
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

const validateCardOwner = () => {
  if (!cardOwner.value.trim()) {
    cardOwnerError.value = true
    cardOwnerErrorMessage.value = 'Card owner name cannot be empty'
  } else if (!/^[A-Za-z\s]+$/.test(cardOwner.value)) {
    cardOwnerError.value = true
    cardOwnerErrorMessage.value = 'Card owner name must only contain alphabets'
  } else {
    cardOwnerError.value = false
    cardOwnerErrorMessage.value = ''
  }
}

const validateCardNumber = () => {
  cardNumberNonNumericError.value = false
  cardNumberLengthError.value = false
  if (!/^\d+$/.test(cardNumber.value)) {
    cardNumberNonNumericError.value = true
    cardNumberError.value = true
  } else if (cardNumber.value.length !== 16) {
    cardNumberLengthError.value = true
    cardNumberError.value = true
  } else {
    cardNumberError.value = false
    cardNumberNonNumericError.value = false
    cardNumberLengthError.value = false
  }
}

const validateExpiryDate = () => {
  expiryDateError.value = false
  expiryDateErrorMessage.value = ''
  if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
    expiryDateError.value = true
    expiryDateErrorMessage.value = 'Expiry date must be in MM/YY format'
  } else {
    const [month, year] = expiryDate.value.split('/').map((el) => el.trim())
    if (month < 1 || month > 12) {
      expiryDateError.value = true
      expiryDateErrorMessage.value = 'Month must be between 01 and 12'
    }
  }
}

const validateCvv = () => {
  if (cvv.value.length !== 3 || !/^\d+$/.test(cvv.value)) {
    cvvError.value = true
    cvvErrorMessage.value = 'CVV must be 3 digits long'
  } else {
    cvvError.value = false
    cvvErrorMessage.value = ''
  }
}

const isFormInvalid = computed(() => {
  return !(
    amount.value &&
    frequency.value &&
    name.value &&
    email.value &&
    cardOwner.value &&
    cardNumber.value &&
    expiryDate.value &&
    cvv.value &&
    !amountError.value &&
    !nameError.value &&
    !emailError.value &&
    !cardOwnerError.value &&
    !cardNumberError.value &&
    !expiryDateError.value &&
    !cvvError.value
  )
})

const sendEmail = () => {
  alert("Form submitted!")
}
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

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.9rem;
}
</style>
