<script setup>
import { ref, onMounted } from 'vue';
import { doc, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useRoute } from 'vue-router';

const route = useRoute();
const periodId = ref(route.params.courseid);
const students = ref([]);
const dialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const stdid = ref('');
const studentName = ref('');
const section = ref('');
const department = ref('');
const editingId = ref('');
const currentDeleteId = ref('');
const status = ref('');

// ฟังก์ชันเคลียร์ค่าฟอร์ม
const resetForm = () => {
  stdid.value = '';
  studentName.value = '';
  department.value = '';
  section.value = '';
  status.value = '';
  dialog.value = false;
  editDialog.value = false;
};

// ฟังก์ชันดึงข้อมูลนักเรียน
const fetchStudents = async () => {
  try {
    const classRef = doc(db, 'cp422101', 'students');
    const periodRef = collection(classRef, 'students'); 
    const querySnapshot = await getDocs(periodRef);

    students.value = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(student => student.status === "In time" ) // กรองเฉพาะที่ status Intime
      .sort((a, b) => (a.section === b.section ? a.stdid.localeCompare(b.stdid) : a.section.localeCompare(b.section)));
  } catch (error) {
    console.error('Error fetching students: ', error);
  }
};


// ฟังก์ชันเพิ่มข้อมูลนักเรียน
const addStudent = async () => {
  try {
    const classRef = doc(db, 'cp422101', 'students'); 
    const periodRef = collection(classRef, 'students'); 

    await addDoc(periodRef, { stdid: stdid.value, studentName: studentName.value, section: section.value, department: department.value,status: "absent" });
    resetForm();
    await fetchStudents();
  } catch (error) {
    console.error('Error adding student: ', error);
  }
};

// ฟังก์ชันเปิด Dialog สำหรับการแก้ไขข้อมูลนักเรียน
const openEditDialog = (student) => {
  editingId.value = student.id;
  stdid.value = student.stdid;
  studentName.value = student.studentName;
  department.value = student.department;
  status.value = student.status;
  section.value = student.section;
  editDialog.value = true;
};

// ฟังก์ชันอัปเดตข้อมูลนักเรียน
const updateStudent = async () => {
  try {
    const classRef = doc(db, 'cp422101', 'students');
    const studentRef = doc(classRef, 'students', editingId.value);
    await updateDoc(studentRef, { stdid: stdid.value, studentName: studentName.value, status: status.value,section: section.value, department: department.value });
    resetForm();
    await fetchStudents();
  } catch (error) {
    console.error('Error updating student: ', error);
  }
};

// ฟังก์ชันเปิด Dialog ยืนยันการลบ
const confirmDeleteStudent = (id) => {
  currentDeleteId.value = id;
  deleteDialog.value = true;
};

// ฟังก์ชันลบข้อมูลนักเรียน
const deleteStudent = async () => {
  try {
    const classRef = doc(db, 'cp422101', 'students');
    const studentRef = doc(classRef, 'students', currentDeleteId.value);
    await deleteDoc(studentRef);
    await fetchStudents();
    deleteDialog.value = false;
  } catch (error) {
    console.error('Error deleting student: ', error);
  }
};

// ดึงข้อมูลเมื่อหน้าเว็บถูกโหลด
onMounted(() => {
  fetchStudents();
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
      <a href="/cp422101">CP422101 - Introduction to Computer Networking</a> <br />
      / Attendance Check
    </p>
  </div>

  <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
    <VCardText>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 18px;">
        <span style="flex: 1; text-align: center;">Student :</span>
        <span style="flex: 1; text-align: center;">Name :</span>
        <span style="flex: 1; text-align: center;">Department :</span>
        <span style="flex: 1; text-align: center;">Status :</span>
        <span style="flex: 1; text-align: center">Section :</span>
      </div>

      <div v-for="student in students" :key="student.id" style="margin-block-start: 10px;">
        <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
          <VCardText style="inline-size: 100%;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 16px;">
              <span style="flex: 1; text-align: center;">{{ student.stdid }}</span>
              <span style="flex: 1; text-align: center;">{{ student.studentName }}</span>
              <span style="flex: 1; text-align: center;">{{ student.department }}</span>
              <span style="flex: 1; text-align: center;">{{ student.status }}</span>
              <span style="flex: 1; text-align: center">{{ student.section }}</span>
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

  <!-- Dialog สำหรับแก้ไขข้อมูลนักเรียน -->
  <VDialog v-model="editDialog" max-width="600px">
    <template #title>
      <h3>Edit Student</h3>
    </template>
    <VCard>
      <VCardText>
        <VForm>
          <VTextField :style="{ marginTop: '20px' }"
            v-model="stdid" 
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
            v-model="department" 
            label="Department" 
            required 
            class="mb-4"
          />
          <VTextField 
            v-model="status" 
            label="status" 
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
            <VBtn color="primary" @click="updateStudent">Update</VBtn>
            <VBtn @click="resetForm">Cancel</VBtn>
          </VCardActions>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Dialog สำหรับยืนยันการลบข้อมูลนักเรียน -->
  <VDialog v-model="deleteDialog" max-width="400px">
    <template #title>
      <h3>Confirm Delete</h3>
    </template>
    <VCard>
      <VCardText :style="{ marginTop: '20px' }">
        Are you sure you want to delete this student?
      </VCardText>
      <VCardActions>
        <VBtn color="red" @click="deleteStudent">Delete</VBtn>
        <VBtn @click="deleteDialog = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
