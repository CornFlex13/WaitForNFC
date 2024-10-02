<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useRoute } from 'vue-router';

const route = useRoute();
const students = ref([]);
const dialog = ref(false);
const stdid = ref('');
const studentName = ref('');
const section = ref('');
const department = ref('');
const courseId = route.params.courseid; // รับค่าจาก route.params
const courseIdStr = String(courseId); // แปลงเป็น string

const fetchStudents = () => {
  const classRef = doc(db, 'cp422101', courseIdStr);
  const periodRef = collection(classRef, 'STDcheck'); 

  // ใช้ onSnapshot เพื่อติดตามการเปลี่ยนแปลง
  const unsubscribe = onSnapshot(periodRef, (querySnapshot) => {
    students.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, (error) => {
    console.error('Error fetching students: ', error);
  });

  // คืนค่า unsubscribe สำหรับการทำความสะอาดในอนาคต
  return unsubscribe;
};

// ดึงข้อมูลเมื่อหน้าเว็บถูกโหลด
onMounted(() => {
  const unsubscribe = fetchStudents();

  // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
  onUnmounted(() => {
    unsubscribe();
  });
});
</script>

<template>
  <div style="display: flex; align-items: center;">
    <h3 style="font-size: 37px; margin-inline-end: 10px;">Realtime Checking <br /></h3>
  </div>

  <br />
  <div style="display: flex; justify-content: space-between;">
    <p style="font-size: 15px; text-align: start;"></p>
    <p style="font-size: 18px; text-align: end;">
      <a href="/courses">Courses</a> /
      <a href="/cp422101">Cp422101 - Introduction to Computer Networking</a> <br />
      / Attendance Check
    </p>
  </div>

  <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
    <VCardText>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 18px;">
        <span style="flex: 1; text-align: center;">Student :</span>
        <span style="flex: 1; text-align: center;">Name :</span>
        <span style="flex: 1; text-align: center;">Time :</span>
      </div>

      <div v-for="student in students" :key="student.id" style="margin-block-start: 5px;">
        <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
          <VCardText style="inline-size: 100%;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 16px;">
              <span style="flex: 1; text-align: center;">{{ student.stdid }}</span>
              <span style="flex: 1; text-align: center;">{{ student.studentName }}</span>
              <span style="flex: 1; text-align: center;">{{ student.department }}</span>
            </div>
          </VCardText>
        </VCard>
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
            v-model="stdid" 
            label="Student ID" 
            required 
            class="mb-4"
            :style="{ marginTop: '20px' }"
          />
          <VTextField 
            v-model="studentName" 
            label="Student Name" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="department" 
            label="Department" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="section" 
            label="Section" 
            required 
            class="mb-4"
          />
          <VCardActions>
            <VBtn color="primary" @click="addStudent">Submit</VBtn>
            <VBtn @click="resetForm">Cancel</VBtn>
          </VCardActions>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
