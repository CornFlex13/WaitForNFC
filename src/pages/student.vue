<script setup>
import { VCard, VCardText, VRow, VCol, VPagination } from 'vuetify/lib/components/index.mjs';
import { ref } from 'vue';

const currentPage = ref(1);
const totalPages = ref(10);
const dialog = ref(false); // State for dialog visibility
const studentID = ref('');
const name = ref('');
const area = ref('');
const section = ref('');
const serialNumber = ref('');

const addStudent = () => {
  dialog.value = true; 
};
const submitStudent = () => {
  
  console.log({
    studentID: studentID.value,
    name: name.value,
    area: area.value,
    section: section.value,
    serialNumber: serialNumber.value
  });
  
 
  studentID.value = '';
  name.value = '';
  area.value = '';
  section.value = '';
  serialNumber.value = '';
  
  dialog.value = false; 
};

</script>

<template>
 <div style="display: flex; align-items: center;">
  <h3 style="font-size: 37px; margin-inline: 10px;">CP422101</h3>
  <h3 style="font-size: 14px;">การวิเคราะห์ฐานข้อมูล</h3>
</div>
<br />
<div style="display: flex; align-items: center; justify-content: space-between;">
  <div style="display: flex; align-items: center;">
    <VBtn 
  color="white" 
  @click="addStudent" 
  style="block-size : 90px; margin-inline-end: 10px;"
>
  <v-icon left>mdi-account-plus</v-icon>
  Add Student
</VBtn>

  </div>
  <p style="margin: 0; text-align: end;">
    AttendanceCheck / Course<br />
    / CP422022 การวิเคราะห์ฐานข้อมูล / Course Outline<br />
    / Student
  </p>
</div>


  <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
  <VCardText>
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 16px;">
      <span style="flex: 1; text-align: center;">StudentID :</span>
      <span style="flex: 1; text-align: center;">Name :</span>
      <span style="flex: 1; text-align: center;">Area :</span>
      <span style="flex: 1; text-align: center;">Section :</span>
      <span style="flex: 1; text-align: center;">Serial Number:</span>
    </div>

    <div style="margin-block-start: 10px;">
      <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333', marginBottom: '10px' }">
        <VCardText style="inline-size: 100%;">
          <div style="display: flex; align-items: center; padding: 5px; font-size: 18px;">
            <span style="flex: 1; text-align: center;">663380122-9</span>
            <span style="flex: 1; text-align: center;">ภูริพัฒน์ เกิดกลาง</span>
            <span style="flex: 1; text-align: center;">CP-Cy</span>
            <span style="flex: 1; text-align: center;">Sec-2</span>
            <span style="flex: 1; text-align: center;">FE:01:AE:05</span>
          </div>
        </VCardText>
      </VCard>

      <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333', marginBottom: '10px' }">
        <VCardText style="inline-size: 100%;">
          <div style="display: flex; align-items: center; padding: 5px; font-size: 18px;">
            <span style="flex: 1; text-align: center;">663380123-0</span>
            <span style="flex: 1; text-align: center;">xx</span>
            <span style="flex: 1; text-align: center;">CP-Cy</span>
            <span style="flex: 1; text-align: center;">Sec-3</span>
            <span style="flex: 1; text-align: center;">FE:01:AE:05</span>
          </div>
        </VCardText>
      </VCard>
    </div>

  </VCardText>
</VCard>
<VDialog v-model="dialog" max-width="500px" max-height="90vh">
    <template #title>
      <h3>Add Student</h3>
    </template>
    <VCard>
      <VCardText>
  <VForm>
    <!-- Title: Add Student -->
    <h2 style="text-align: center;">Add Student</h2>

    <VRow>
      <VCol>
        <VTextField
          v-model="studentID"
          label="Student ID"
          required
        />
      </VCol>
    </VRow>

    <!-- Name Field -->
    <VRow>
      <VCol>
        <VTextField
          v-model="name"
          label="Name"
          required
        />
      </VCol>
    </VRow>

    <!-- Area Field -->
    <VRow>
      <VCol cols="6">
        <VTextField
          v-model="area"
          label="Area"
          required
        />
      </VCol>
      <VCol cols="6">
        <VTextField
          v-model="section"
          label="Section"
          required
        />
      </VCol>
    </VRow>
    <!-- Serial Number Field -->
    <VRow>
      <VCol>
        <VTextField
          v-model="serialNumber"
          label="Serial Number"
          required
        />
      </VCol>
    </VRow>
  </VForm>
</VCardText>

      <template #actions>
        <VBtn color="primary" @click="submitStudent">Submit</VBtn>
        <VBtn @click="dialog = false">Cancel</VBtn>
      </template>
    </VCard>
  </VDialog>


</template>
