
<template>
  <h3 style="font-size: 37px">Classroom</h3>
  <VCard class="mt-8" :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
    <VCardText>
      <VRow>
        <VCol cols="4" class="d-flex align-center justify-center">
          <v-btn 
          rounded size="x-large" 
          block height="250" 
          class="text-start" 
          color="white"
          @click="$router.push('/cp422021')">
            CP422021<br/>Web and Mobile Application Architecture
          </v-btn>
        </VCol>
        <VCol cols="4" class="d-flex align-center justify-center">
          <v-btn 
          rounded size="x-large" 
          block height="250" 
          class="text-start" 
          color="white"
          @click="$router.push('/cp422101std')">
            CP422101<br />Introduction to Computer Networking
          </v-btn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

