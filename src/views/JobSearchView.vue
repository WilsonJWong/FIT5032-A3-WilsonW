<template>
  <div class="container-fluid p-0 m-0">
    <!-- Header -->
    <div class="header-bar text-center py-3">
      <strong>Job search</strong>
    </div>

    <!-- Search Bar and Sort Button -->
    <div class="search-bar d-flex align-items-center my-4 px-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍Search for a position"
        class="form-control"
      />
      <select v-model="sortOption" class="sort-select">
        <option value="role">Sort by Role</option>
        <option value="location">Sort by Location</option>
        <option value="employ">Sort by Employment</option>
      </select>
      <button class="sort-btn" @click="sortJobs">Sort</button>
    </div>

    <!-- Job Cards Box -->
    <div class="job-cards-box px-3 py-4 mt-2">
      <!-- Title Row -->
      <div class="row job-card mb-2">
        <div class="col role-title text-center">
          <strong>Role</strong>
        </div>
        <div class="col background-title text-center">
          <strong>Background</strong>
        </div>
        <div class="col desc-title text-center">
          <strong>Description</strong>
        </div>
        <div class="col apply-title text-center">
          <strong>Apply</strong>
        </div>
      </div>

      <!-- Job Cards -->
      <div v-for="job in paginatedJobs" :key="job.id" class="row job-card mb-4">
        <div class="col role-box text-center">
          {{ job.role }}
        </div>
        <div class="col background-box text-center">
          <div class="location-line"><strong>Location:</strong> {{ job.location }}</div>
          <div class="contract-line"><strong>Contract:</strong> {{ job.employ }}</div>
        </div>
        <div class="col desc-box">
          <p class="mb-1">{{ job.description }}</p>
          <a href="#" class="view-more">Click to view more</a>
        </div>
        <div class="col apply-box text-center">
          <button class="apply-btn">Apply</button>
        </div>
      </div>

      <!-- No match message -->
      <div v-if="paginatedJobs.length === 0" class="text-center mt-3">
        <em>No jobs found.</em>
      </div>
    </div>

    <!-- Pages -->
    <div class="Page-controls text-center mt-4">
      <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">
        Previous
      </button>
      <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const sortOption = ref('role')
const currentPage = ref(1)
const jobsPerPage = 10

const jobs = ref([
  {
    id: 1,
    role: 'Carpenter',
    description:
      'As a carpenter, you will be responsible for building and repairing wooden structures, furniture, and frameworks. You will work with both traditional tools and modern machinery to create precise and functional designs.',
    location: 'SYD, NSW',
    employ: 'Full-time',
  },
  {
    id: 2,
    role: 'Finance Associate',
    description:
      'Finance Associates provide support for the financial operations of a company, including budgeting, forecasting, and financial reporting. You will assist in analyzing financial data and preparing reports for management.',
    location: 'SYD, NSW',
    employ: 'Part-time',
  },
  {
    id: 3,
    role: 'Graduate Software Engineer',
    description:
      'As a graduate software engineer, you will be involved in the development, testing, and maintenance of software applications. You will work alongside senior engineers to enhance existing systems and develop new features.',
    location: 'SYD, NSW',
    employ: 'Full-time',
  },
  {
    id: 4,
    role: 'Personal Trainer',
    description:
      'Personal trainers design and deliver fitness programs tailored to individual clients. You will assess clients’ fitness levels, set goals, and guide them through exercises to achieve their health and fitness objectives.',
    location: 'SYD, NSW',
    employ: 'Casual',
  },
  {
    id: 5,
    role: 'Graduate Finance Analyst',
    description:
      'As a graduate finance analyst, you will assist in managing financial data, preparing financial models, and conducting analysis to support business decisions. You will work closely with other analysts and senior managers to optimize financial performance.',
    location: 'MEL, VIC',
    employ: 'Full-time',
  },
  {
    id: 6,
    role: 'M&A Consultant',
    description:
      'M&A consultants advise companies on mergers and acquisitions, providing insights into potential transactions, financial evaluations, and strategic recommendations. You will work with various teams to facilitate successful deals.',
    location: 'MEL, VIC',
    employ: 'Part-time',
  },
  {
    id: 7,
    role: 'Technology Risk (Senior Con)',
    description:
      'Technology Risk Consultants help organizations manage and mitigate risks related to their technology infrastructure. You will assess security risks, evaluate compliance standards, and recommend solutions to safeguard the company’s digital assets.',
    location: 'MEL, VIC',
    employ: 'Full-time',
  },
  {
    id: 8,
    role: 'Hairdresser',
    description:
      'Hairdressers provide styling, cutting, and coloring services to clients, ensuring that each hairstyle meets the customer’s needs. You will also provide hair care advice and recommend products based on clients’ hair types.',
    location: 'MEL, VIC',
    employ: 'Casual',
  },
  {
    id: 9,
    role: 'Waitress',
    description:
      'As a waitress, you will take orders, serve food and beverages, and ensure that customers have an enjoyable dining experience. You will also be responsible for maintaining cleanliness in your designated area and handling payments.',
    location: 'BNE, QLD',
    employ: 'Full-time',
  },
  {
    id: 10,
    role: 'Architecture',
    description:
      'Architects design and plan the construction of buildings and structures. You will create detailed blueprints, select materials, and work with construction teams to bring your designs to life, ensuring functionality and aesthetic appeal.',
    location: 'BNE, QLD',
    employ: 'Part-time',
  },
  {
    id: 11,
    role: 'Data Engineer',
    description:
      'Data engineers design and implement systems to collect, store, and process large sets of data. You will build pipelines, ensure data integrity, and optimize data systems for ease of use and efficiency in analysis.',
    location: 'BNE, QLD',
    employ: 'Full-time',
  },
  {
    id: 12,
    role: 'Full Stack Developer',
    description:
      'Full stack developers are responsible for both the front-end and back-end development of web applications. You will design user interfaces, implement server-side logic, and integrate various components into cohesive, efficient systems.',
    location: 'BNE, QLD',
    employ: 'Casual',
  },
])

const filteredJobs = computed(() =>
  jobs.value.filter((job) => job.role.toLowerCase().includes(searchQuery.value.toLowerCase())),
)

const sortJobs = () => {
  if (sortOption.value === 'location') {
    jobs.value.sort((a, b) => a.location.localeCompare(b.location))
  } else if (sortOption.value === 'employ') {
    jobs.value.sort((a, b) => a.employ.localeCompare(b.employ))
  } else if (sortOption.value === 'role') {
    jobs.value.sort((a, b) => a.role.localeCompare(b.role))
  }
}

// Page for jobs
const paginatedJobs = computed(() => {
  const startIndex = (currentPage.value - 1) * jobsPerPage
  const endIndex = currentPage.value * jobsPerPage
  return filteredJobs.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / jobsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
.header-bar {
  background-color: #e48d8d;
  font-size: 1.2rem;
  margin: auto;
  width: 99%;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  flex-grow: 1;
  border: 2px solid #d29fe8;
  border-radius: 20px;
  padding: 5px 15px;
}

.sort-select {
  padding: 5px;
  border-radius: 5px;
  font-size: 1rem;
}

.sort-btn {
  background-color: #a065d0;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
}

.sort-btn:hover {
  background-color: #8c56b0;
}

.text-purple {
  color: #a065d0;
}

.job-cards-box {
  background-color: #d29fe8;
  border-radius: 10px;
  padding: 20px;
  width: 99%;
  margin: auto;
}

.job-card .role-title,
.job-card .background-title,
.job-card .desc-title,
.job-card .apply-title {
  background-color: #db0ffa94;
  color: white;
  margin-bottom: 15px;
  min-width: 20%;
}

.job-card {
  background-color: transparent;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}

.job-card .col {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 20px;
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-box,
.background-box,
.desc-box,
.apply-box
{
  background-color: #f7e3fa94;
  min-width: 20%;
}

.role-box,
.role-title {
  flex: 1;
  margin-left: 20px;
}

.background-box,
.background-title {
  flex: 1;
}

.background-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.location-line,
.contract-line {
  margin: 5px 0;
}

.desc-title {
  flex: 7;
}

.desc-box {
  flex: 7;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  text-align: left;
}
.desc-box p {
  font-weight: normal;
  width: 100%;
}

.view-more {
  font-style: italic;
  font-weight: bold;
  color: black;
  text-decoration: underline;
  align-self: flex-end;
  margin-top: auto;
}

.apply-btn {
  background-color: orange;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  width: 100%;
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apply-box,
.apply-title {
  padding: 0;
  border: none;
  margin-right: 20px;
}

.Page-controls {
  margin-bottom: 20px;
}
</style>
