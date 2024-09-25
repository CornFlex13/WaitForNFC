<script setup>
import { VCard, VTextField, VBtn, VIcon } from 'vuetify/lib/components/index.mjs';
import { ref, onMounted } from 'vue';
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Import Firebase ที่ตรงกับ path ของคุณ
import { db } from '../firebase'; // เปลี่ยนตาม path ที่ใช้งานจริง

const students = ref([]); // เก็บข้อมูลนักเรียนที่ดึงมาจาก Firestore
const dialog = ref(false); // สำหรับเปิด/ปิด Dialog การเพิ่ม Student
const studentId = ref('');
const studentName = ref('');
const area = ref('');
const section = ref('');
const status = ref('');
const serialNumber = ref('');

// ฟังก์ชันเพิ่มข้อมูลนักเรียนลงใน Firestore
const addStudent = async () => {
  await addDoc(collection(db, 'students'), { // เก็บข้อมูลใน Collection ชื่อว่า 'students'
    studentId: studentId.value,
    studentName: studentName.value,
    area: area.value,
    section: section.value,
    status: status.value,
    serialNumber: serialNumber.value,
  });

  // เคลียร์ค่าฟอร์มหลังจากเพิ่มข้อมูล
  studentId.value = '';
  studentName.value = '';
  area.value = '';
  section.value = '';
  status.value = '';
  serialNumber.value = '';
  dialog.value = false; // ปิด Dialog หลังเพิ่มข้อมูลเสร็จ

  // ดึงข้อมูลใหม่หลังเพิ่มนักเรียน
  fetchStudents();
};

// ฟังก์ชันดึงข้อมูลนักเรียนจาก Firestore
const fetchStudents = async () => {
  const querySnapshot = await getDocs(collection(db, 'students'));
  students.value = querySnapshot.docs.map(doc => doc.data());
};

// ดึงข้อมูลเมื่อหน้าเว็บถูกโหลด
onMounted(() => {
  fetchStudents();
});
</script>

<template>
  <div style="display: flex; align-items: center;">
    <h3 style="font-size: 37px; margin-inline-end: 10px;">
      Attendance Check<br />
    </h3>
  </div>

  <br />
  <div style="display: flex; justify-content: space-between;">
    <p style="font-size: 15px; text-align: start;"></p>
    <p style="font-size: 18px; text-align: end;">
      <a href="/home">Classroom</a> /<br />
    </p>
  </div>

  <!-- ลบข้อมูลนักเรียนที่ถูกเขียนไว้ใน frontend ออก -->
  
  <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
    <VCardText>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 18px;">
        <span style="flex: 1; text-align: center;">Student :</span>
        <span style="flex: 1; text-align: center;">Name :</span>
        <span style="flex: 1; text-align: end;">Section :</span>
        <span style="flex: 1; text-align: end;">Status :</span>
        <span style="flex: 1; text-align: end;">Serial Number :</span>
      </div>

      <!-- แสดงข้อมูลนักเรียนที่ดึงมาจาก Firestore -->
      <div v-for="student in students" :key="student.studentId" style="margin-block-start: 10px;">
        <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
          <VCardText style="inline-size: 100%;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 16px;">
              <span style="flex: 1; text-align: center;">{{ student.studentId }}</span>
              <span style="flex: 1; text-align: center;">{{ student.studentName }}</span>
              <span style="flex: 1; text-align: end;">{{ student.section }}</span>
              <span style="flex: 1; text-align: end;">{{ student.status }}</span> 
              <span style="flex: 1; text-align: end;">{{ student.serialNumber }}</span>
            </div>
          </VCardText>
        </VCard>
      </div>

      <!-- เพิ่มปุ่ม Add Student -->
      <div style="margin-block-start: 20px; text-align: center;">
        <VBtn color="primary" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon>
          Add Student
        </VBtn>
      </div>
    </VCardText>
  </VCard>

  <!-- Dialog สำหรับเพิ่มข้อมูลนักเรียน -->
  <VDialog v-model="dialog" max-width="600px">
    <template #title>
      <h3>Add Student</h3>
    </template>
    <VCard>
      <VCardText>
        <VForm>
          <VTextField 
            v-model="studentId" 
            label="Student ID" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="studentName" 
            label="Student Name" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="area" 
            label="Area" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="section" 
            label="Section" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="status" 
            label="Status" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="serialNumber" 
            label="Serial Number" 
            required 
            class="mb-4"
          />
          <VCardActions>
            <VBtn color="primary" @click="addStudent">Submit</VBtn>
            <VBtn @click="dialog = false">Cancel</VBtn>
          </VCardActions>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
