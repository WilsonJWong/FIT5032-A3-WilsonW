<template>
  <div class="container-fluid my-5 px-4">

    <!-- Mission & Vision section -->
    <div class="row mb-5 align-items-center">
      <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <div class="text-center">
          <img src="../assets/Background.png" alt="Mission" class="img-fluid centered-image" />
          <span class="profile-label d-block mt-2"
            >[Picture of people from different walks of life]</span
          >
        </div>
      </div>
      <div class="col-md-8">
        <h5 class="section-title">Our mission & vision</h5>
        <p>
          The Asylum Seeker Refugee Centre (ASRC) is the largest independent, non-profit charity
          organisation in Australia dedicated to supporting asylum seekers and refugees. We provide
          essential resources for such people including food, shelter, healthcare, and general
          supplies. We also offer legal aid, community support, and educational services. Our
          mission is to sustain and strengthen the physical, mental, and social wellbeing of asylum
          seekers / refugees.
        </p>
        <p>
          Through this online platform, we can provide faster and more accessible aid, enabling more
          precise tailoring of support services. If you are an Asylum Seeker or Refugee, this will
          mean we can more easily assess your requirements and connect you with the right resources
          for assistance in obtaining refugee status. Additionally, the platform will further assist
          you in adapting to their new environment by offering information and community driven
          support to ease your transition.
        </p>
      </div>
    </div>

    <!-- Service section -->
    <div class="row p-4 rounded justify-content-center">

      <!-- Asylum Seekers -->
      <div class="col-md-5 d-flex align-items-start asylum-box">
        <div class="text-center w-100 title-box">
          <h6>Asylum Seekers</h6>
        </div>
        <div class="description w-100">
          <p>
            An asylum seeker is someone who has fled their home country and is seeking protection in
            another country due to fear of persecution based on factors like race, religion,
            nationality, political opinion, or membership in a particular social group. They apply
            for asylum, hoping to be recognized as a refugee and granted legal protection. While
            waiting for a decision on their application, asylum seekers may experience uncertainty
            about their future and face challenges integrating into their new environment.
          </p>
        </div>
      </div>

      <!-- Refugees -->
      <div class="col-md-5 d-flex align-items-start refugee-box">
        <div class="text-center w-100 title-box">
          <h6>Refugees</h6>
        </div>
        <div class="description w-100">
          <p>
            A refugee is a person who has been forced to leave their home country due to fear of
            persecution and has already been granted refugee status in another country. Refugees
            have legally recognized protection and may have access to rights and services that
            asylum seekers do not. They often face significant challenges in adjusting to life in a
            new country, including cultural differences, language barriers, and the trauma of
            displacement.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Layout containers */
.container-fluid {
  margin-left: 20px;
  margin-right: 20px;
}

.row {
  width: 100%;
}

/* Section Titles */
.section-title {
  border-bottom: 2px solid black;
  padding-bottom: 5px;
  margin-bottom: 20px;
}

/* Image and labels */

.img-fluid {
  max-width: 100%;
  height: auto;
}

.profile-label {
  font-size: 1rem;
  color: black;
  user-select: none;
}

/* Info boxes */
.asylum-box,
.refugee-box {
  background-color: #ffecec;
  border: 2px solid red;
  border-radius: 20px;
  padding: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.col-md-5 {
  flex: 45%;
}

/* Title inside each box */

.title-box {
  margin-bottom: 10px;
}

/* Icon styling (if applicable in future use) */

.icon {
  font-size: 2rem;
  color: #333;
}

</style>
