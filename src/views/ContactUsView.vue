<template>
  <div class="container-fluid p-0 m-0">
    <!-- Inquiry Form -->
    <div class="text-center fw-bold title-box"><h2>Inquiry form</h2></div>
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
              :class="{ 'is-invalid': emailError }"
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
              :class="{ 'is-invalid': nameError }"
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
            :class="{ 'is-invalid': inquiryError }"
            @blur="validateInquiry"
          ></textarea>
          <div v-if="inquiryError" class="invalid-feedback">{{ inquiryErrorMessage }}</div>
          <div class="d-flex justify-content-end">
            <button
              class="submit-btn"
              :class="{ 'submit-btn-active': !isFormInvalid, 'submit-btn-disabled': isFormInvalid }"
              :disabled="isFormInvalid"
              @click="sendEmail"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

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
            <strong
              ><small>{{ contact.label }}</small></strong
            >
          </div>
          <div class="contact-card">
            <p><strong>Email:</strong> {{ contact.email }}</p>
            <p><strong>Phone no:</strong> {{ contact.phone }}</p>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="col-md-6 location-col">
        <div class="section-title text-center mb-3">Head office location</div>

        <!-- Full height row -->
        <div class="row location-image h-100">
          <div class="col-4 d-flex flex-column h-100">
            <div class="flex-grow-1">
              <img src="../assets/building.jpg" alt="Building" class="w-100 h-100" />
            </div>
            <span class="profile-label text-center mt-2">[Picture of office building]</span>
          </div>
          <div class="col-8 location-card d-flex flex-column justify-content-center h-100">
            <p><strong>Office address:</strong> 15 Ploon Avenue, Monash, VIC, Australia</p>
            <p><strong>Reception phone no:</strong> 1800 2162 2151</p>
          </div>
        </div>
      </div>

      <!-- Thankyou message-->
      <div v-if="showThankYouPopup" class="thank-you-popup">
        <div class="popup-content">
          <h3>Thank you for your inquiry!</h3>
          <p>
            Your inquiry has been successfully submitted. Our team will be intouch with you shortly.
          </p>
          <button @click="closeThankYouPopup">Close</button>
        </div>
      </div>
    </div>

    <!-- Geo location -->
    <div class="row">
      <div class="text-center fw-bold title-box"><h2>Map</h2></div>
      <div class="thick-line w-100"></div>

      <!-- 🔍 Search Bar -->
      <div class="search-bar d-flex align-items-center mb-3 px-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 Search by name or address"
          class="form-control"
        />
      </div>

      <!-- Map -->
      <div class="col-md-8 px-4">
        <div id="live-map" class="live-map"></div>
      </div>

      <!-- Location list -->
      <div class="col-md-4 px-4">
        <div class="location-list">
          <h5 class="text-center mb-3">Support Centre Locations</h5>
          <div
            v-for="(loc, index) in filteredLocations"
            :key="index"
            class="location-entry p-2 mb-2 border rounded"
          >
            <strong>{{ loc.name }}</strong>
            <p class="mb-0">
              <small>{{ loc.address }}</small>
            </p>
          </div>
        </div>
      </div>

      <!-- Closet location button -->
      <div class="px-4">
        <button @click="findClosestLocation" class="closest-btn w-100">
          Find Closest Support Center
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* Imports */
import { ref, computed, onMounted, watch } from 'vue'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from 'firebase/firestore'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

/* Firebase setup */
const auth = getAuth()
const db = getFirestore()

/* Contacts */
const contacts = [
  {
    id: 1,
    label: 'Deanh O. (Operations Manager):',
    email: 'wont.stop@ASRC.com.au',
    phone: '0446 235 848',
  },
  {
    id: 2,
    label: 'Olive D. (Program Coordinator):',
    email: 'bob.smith@ASRC.com.au',
    phone: '0412 987 654',
  },
]

/* Declarations */
const email = ref('')
const name = ref('')
const inquiry = ref('')

const emailError = ref(false)
const emailErrorMessage = ref('')
const nameError = ref(false)
const nameErrorMessage = ref('')
const inquiryError = ref(false)
const inquiryErrorMessage = ref('')

const showThankYouPopup = ref(false)

const locations = ref([])
const map = ref(null)
const markers = ref([])
const searchQuery = ref('')

/* Computed properties */
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

const filteredLocations = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return locations.value.filter(
    (loc) =>
      loc.name.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query)
  )
})

/* Form validation functions */
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

/* Form submission */
const sendEmail = async () => {
  validateEmail()
  validateName()
  validateInquiry()

  if (isFormInvalid.value) {
    alert('Please complete the form correctly before submitting.')
    return
  }

  try {
    await addDoc(collection(db, 'Inquiries'), {
      name: name.value,
      email: email.value,
      inquiry: inquiry.value,
      createdAt: new Date(),
    })

    showThankYouPopup.value = true
    resetForm()
  } catch (error) {
    console.error('Error submitting inquiry:', error.message)
    alert('Failed to submit inquiry. Please try again later.')
  }
}

/* Map initialisation */
onMounted(async () => {
  const user = auth.currentUser
  map.value = L.map('live-map')
  const australiaBounds = L.latLngBounds([-44.0, 112.0], [-10.0, 154.0])
  map.value.fitBounds(australiaBounds)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map.value)

  await fetchLocations()

  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data()
      email.value = user.email || ''
      name.value = `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
    } else {
      console.warn('User data not found in Firestore.')
    }
  }
})

/* Location & map utilities */
const fetchLocations = async () => {
  const querySnapshot = await getDocs(collection(db, 'Locations'))
  locations.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  updateMapMarkers()
}

const updateMapMarkers = () => {
  markers.value.forEach((marker) => map.value.removeLayer(marker))
  markers.value = []

  filteredLocations.value.forEach((loc) => {
    const marker = L.marker([loc.latitude, loc.longitude])
      .addTo(map.value)
      .bindPopup(`<strong>${loc.name}</strong><br/>${loc.address}`)
    markers.value.push(marker)
  })
}

/* Closest location */
const findClosestLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLat = position.coords.latitude
      const userLng = position.coords.longitude

      try {
        const response = await axios.post(
          'https://findclosestlocation-ulawfedg4a-uc.a.run.app',
          {
            latitude: userLat,
            longitude: userLng,
          }
        )

        if (response.status === 200 && response.data.closestLocation) {
          const closest = response.data.closestLocation
          map.value.setView([closest.latitude, closest.longitude], 13)
        } else {
          console.error('No closest location found.')
        }
      } catch (error) {
        console.error('Error finding closest location:', error.response || error.message)
      }
    })
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

/* Watcher */
watch(searchQuery, () => {
  updateMapMarkers()
})

/* Utility methods */
const resetForm = () => {
  inquiry.value = ''
  inquiryError.value = false
}

const closeThankYouPopup = () => {
  showThankYouPopup.value = false
}

</script>

<style scoped>

/* General spacing and typography */
.title-box {
  margin-top: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-weight: bold;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
}

/* Inquiry section */
.inquiry-section {
  background-color: #ffeeee;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  margin-top: 60px;
}

.inquiry-section .row {
  display: flex;
  align-items: stretch;
}

.inquiry-section .form-control {
  flex-grow: 1;
}

/* Form validation */
.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.9rem;
}

/* Arrow styling */
.large-arrow {
  font-size: 6rem;
  color: #999;
}

/* Submit button styles */
.submit-btn {
  background-color: orange;
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-btn-disabled {
  background-color: grey;
  cursor: not-allowed;
}

.submit-btn:hover {
  background-color: darkorange;
}

/* Contact section */
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

.contact-col,
.location-col {
  display: flex;
  flex-direction: column;
}

/* Location section */
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

.location-image {
  height: 100%;
}

.live-map {
  width: 100%;
  height: 500px;
  border: 2px solid red;
  border-radius: 10px;
  margin-top: 10px;
}

.location-list {
  height: 500px;
  overflow-y: auto;
  background-color: #fff5f5;
  border: 2px solid red;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

.location-entry {
  background-color: #fff;
}

/* Closest button */
.closest-btn {
  width: 100%;
  flex-grow: 1;
  margin: 10px 0;
  background-color: orange;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  padding: 10px;
}

/* Search bar */
.search-bar input {
  flex-grow: 1;
  border: 2px solid #d29fe8;
  border-radius: 20px;
  padding: 5px 15px;
}

/* Thank you popup */
.thank-you-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.popup-content button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: darkorange;
}

</style>
