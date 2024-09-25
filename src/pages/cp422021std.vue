<script setup>
import { VCard } from 'vuetify/lib/components/index.mjs';
import { ref } from 'vue';

const currentPage = ref(1);  // หน้าที่ผู้ใช้เลือก
const totalPages = ref(10);  // จำนวนหน้าทั้งหมดที่สามารถแสดงได้
const absentCount = ref(3); 
const attendedCount = ref(15); 
const onTimeCount = ref(12); 


const fetchData = (page) => {
  console.log(`Fetching data for page ${page}`);

};

</script>
<template>
  <div style="display: flex; align-items: center;">
    <h3 style="font-size: 37px; margin-inline-end: 10px;">CP422021</h3>
    <h3 style="font-size: 14px;">Database Analysis</h3>
  </div>
  <br />
  <div style="display: flex; justify-content: space-between;">
    <p style="font-size: 15px; text-align: start;"></p>
    <p style="font-size: 18px; text-align: end;">AttendanceCheck / Course<br />
      / CP422022 Database Analysis / ประวัติการเข้าเรียน</p>
  </div>

  <VRow style="gap: 0;"> <!-- ปรับระยะห่างของแถว -->
    <VCol cols="4" class="d-flex align-start justify-start">
      <VCard class="mt-0" :style="{ backgroundColor: '#D9D9D9', color: '#333', padding: '20px' }">
        <VCardText>
          <div class="summary-card" style=" display: flex; align-items: center;block-size: 50px;">
            <p style="font-size: 18px; text-align: center;">ขาดเรียน<br />
              <span style="font-size: 18px;">{{ absentCount }}</span>
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="4" class="d-flex align-start justify-start">
      <VCard class="mt-0" :style="{ backgroundColor: '#D9D9D9', color: '#333', padding: '20px' }">
        <VCardText>
          <div class="summary-card" style=" display: flex; align-items: center;block-size: 50px;">
            <p style="font-size: 18px; text-align: center;">เข้าเรียน<br />
              <span style="font-size: 18px;">{{ attendedCount }}</span>
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="4" class="d-flex align-start justify-center">
      <VCard class="mt-0" :style="{ backgroundColor: '#D9D9D9', color: '#333', padding: '20px' }">
        <VCardText>
          <div class="summary-card" style=" display: flex; align-items: center;block-size: 50px;">
            <p style="font-size: 18px; text-align: center;">ตรงเวลา<br />
              <span style="font-size: 18px;">{{ onTimeCount }}</span>
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>



  <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
    <VCardText>
      <!-- Header row for labels -->
      <VRow style=" padding: 5px;font-size: 16px;">
        <VCol class="text-center">Data :</VCol>
        <VCol class="text-center">Status :</VCol>
        <VCol class="text-center">Time to start checking :</VCol>
        <VCol class="text-center">Time checked :</VCol>
      </VRow>

      <div style="margin-block-start: 10px;">
        <!-- First Data Row -->
        <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
          <VCardText>
            <VRow style="padding: 5px; font-size: 18px; ">
              <VCol class="text-center">13/05/2024</VCol>
              <VCol class="text-center">มาเรียน</VCol>
              <VCol class="text-center">13:00-13:15</VCol>
              <VCol class="text-center">13:05</VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- Second Data Row -->
        <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333', marginTop: '10px' }">
          <VCardText>
            <VRow style=" padding: 5px; font-size: 18px;">
              <VCol class="text-center">14/05/2024</VCol>
              <VCol class="text-center">ขาดเรียน</VCol>
              <VCol class="text-center">13:00-13:15</VCol>
              <VCol class="text-center">-</VCol>
            </VRow>
          </VCardText>
        </VCard>
      </div>
    </VCardText>

    <!-- Pagination -->
    <div class="mt-4 d-flex justify-center">
      <VPagination v-model="currentPage" :length="totalPages" :total-visible="5" @input="fetchData"
        style="color: white;" />
    </div>
  </VCard>
</template>
