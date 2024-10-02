<script setup>
import { ref } from 'vue';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns'; // ใช้ format เพื่อตั้งรูปแบบวันที่เป็น dd/MM/yyyy
import { VIcon } from 'vuetify/lib/components/index.mjs';

const classPeriods = ref([]);
const route = useRoute();
const dialog = ref(false);
const deleteDialog = ref(false);
const editDialog = ref(false); // เพิ่มตัวแปรนี้
const editingId = ref(''); // เพิ่มตัวแปรนี้
const periodName = ref('');
const date = ref('');
const time = ref('');
const currentDeleteId = ref('');
const periodId = ref(route.params.courseid);
const students = ref([]);
const dialogs = ref(false);
const editDialogs = ref(false);
const deleteDialogs = ref(false);
const stdid = ref('');
const studentName = ref('');
const section = ref('');
const department = ref('');
const editingIds = ref('');
const currentDeleteIds = ref('');



// ฟังก์ชันเคลียร์ค่าฟอร์ม
const resetForm = () => {
  stdid.value = '';
  studentName.value = '';
  department.value = '';
  section.value = '';
  dialogs.value = false;
  editDialogs.value = false;
};

// ฟังก์ชันดึงข้อมูลนักเรียน
const fetchStudents = async () => {
  try {
    const classRef = doc(db, 'cp422021', 'students');
    const periodRef = collection(classRef, 'students'); 
    const querySnapshot = await getDocs(periodRef);

    students.value = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      // .filter(student => student.status !== "") // กรองเฉพาะที่ status ไม่ใช่ค่าว่าง
      .sort((a, b) => (a.section === b.section ? a.stdid.localeCompare(b.stdid) : a.section.localeCompare(b.section)));
  } catch (error) {
    console.error('Error fetching students: ', error);
  }
};


// ฟังก์ชันเพิ่มข้อมูลนักเรียน
const addStudent = async () => {
  try {
    const classRef = doc(db, 'cp422021', 'students'); 
    const periodRef = collection(classRef, 'students'); 

    await addDoc(periodRef, { stdid: stdid.value, studentName: studentName.value, section: section.value, department: department.value});
    resetForm();
    await fetchStudents();
  } catch (error) {
    console.error('Error adding student: ', error);
  }
};

// ฟังก์ชันเปิด Dialog สำหรับการแก้ไขข้อมูลนักเรียน
const openEditDialogs = (student) => {
  editingIds.value = student.id;
  stdid.value = student.stdid;
  studentName.value = student.studentName;
  department.value = student.department;
  // status.value = student.status;
  section.value = student.section;
  editDialogs.value = true;
};

// ฟังก์ชันอัปเดตข้อมูลนักเรียน
const updateStudent = async () => {
  try {
    const classRef = doc(db, 'cp422021', 'students');
    const studentRef = doc(classRef, 'students', editingIds.value);
    await updateDoc(studentRef, { stdid: stdid.value, studentName: studentName.value,section: section.value, department: department.value });
    resetForm();
    await fetchStudents();
  } catch (error) {
    console.error('Error updating student: ', error);
  }
};

// ฟังก์ชันเปิด Dialog ยืนยันการลบ
const confirmDeleteStudents = (id) => {
  currentDeleteIds.value = id;
  deleteDialogs.value = true;
};

// ฟังก์ชันลบข้อมูลนักเรียน
const deleteStudent = async () => {
  try {
    const classRef = doc(db, 'cp422021', 'students');
    const studentRef = doc(classRef, 'students', currentDeleteIds.value);
    await deleteDoc(studentRef);
    await fetchStudents();
    deleteDialogs.value = false;
  } catch (error) {
    console.error('Error deleting student: ', error);
  }
};

// ดึงข้อมูลเมื่อหน้าเว็บถูกโหลด
onMounted(() => {
  fetchStudents();
});

// ฟังก์ชันเคลียร์ค่าฟอร์ม
const resetFormP = () => {
  periodName.value = '';
  date.value = '';
  time.value = '';
  dialog.value = false;
  editDialog.value = false;
};

// ฟังก์ชันดึงข้อมูลจาก Firestore
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "cp422021"));
  
  classPeriods.value = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => {
      const lessonComparison = a.lesson.localeCompare(b.lesson);
      if (lessonComparison === 0) {
        return new Date(a.date) - new Date(b.date);
      }
      return lessonComparison;
    });
};

// ฟังก์ชันเพิ่มข้อมูลใหม่
const subClassPeriod = async () => {
  await addDoc(collection(db, "cp422021"), {
    lesson: periodName.value,
    date: date.value, // จัดเก็บวันที่เป็นรูปแบบ dd/MM/yyyy
    time: time.value,
  });
  await fetchData();
  resetFormP();
};

// ฟังก์ชันเปิด Dialog เพื่อเพิ่มข้อมูล
const addClassPeriod = () => {
  resetFormP();
  dialog.value = true;
  
};

// ฟังก์ชันเปิด Dialog สำหรับการแก้ไข
const editClassPeriod = (id, lesson, dateValue, timeValue) => {
  editingId.value = id;
  periodName.value = lesson;
  date.value = dateValue; // นำค่ามาจาก Firestore แล้วตั้งเป็น Date object
  time.value = timeValue;
  editDialog.value = true;
};

// ฟังก์ชันอัปเดตข้อมูลที่ถูกแก้ไข
const updateClassPeriod = async () => {
  const docRef = doc(db, "cp422021", editingId.value);
  await updateDoc(docRef, {
    lesson: periodName.value,
    date: format(new Date(date.value), 'dd/MM/yyyy'), // จัดเก็บวันที่เป็นรูปแบบ dd/MM/yyyy
    time: time.value,
  });
  await fetchData();
  resetFormP();
};

// ฟังก์ชันเปิด Dialog ยืนยันการลบ
const confirmDeleteClassPeriod = (id) => {
  currentDeleteId.value = id;
  deleteDialog.value = true;
};

// ฟังก์ชันลบข้อมูล
const deleteClassPeriod = async () => {
  await deleteDoc(doc(db, "cp422021", currentDeleteId.value));
  await fetchData();
  deleteDialog.value = false;
};


// เรียก fetchData ตอนโหลดหน้าเว็บ
fetchData();
</script>

<template>

  <div>
    <div style="display: flex; align-items: center;"> 
      <h1>CP422021 -  Web and Mobile Application Architecture</h1>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px; text-align: start;"></p>
      <p style="font-size: 18px; text-align: end;">
        <a href="/courses">Courses</a> / Cp422021 -  Web and Mobile Application Architecture <br />
      </p>
    </div>
    
    <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
      <VCardText>
        <div>
          <VBtn color="primary" @click="addClassPeriod" class="mr-2">
            <v-icon left>mdi-plus</v-icon>
            Add Class Period
          </VBtn>
        </div>

        <div style="margin-block-start: 10px;">
          <VCard
            v-for="period in classPeriods"
            :key="period.id"
            :style="{ backgroundColor: '#D9D9D9', color: '#333', marginBottom: '10px' }"
          >
            <VCardText style="inline-size: 100%;">
              <div style="display: flex; align-items: center; padding: 5px; font-size: 18px;">
                <span style="flex: 1; text-align: start;">{{ period.lesson }}</span>
                <span style="flex: 1;margin-inline-end: 10px; text-align: start;">{{ period.date }}</span>
                <span style="flex: 1;margin-inline-end: 10px; text-align: start;">{{ period.time }}</span>
                <VBtn icon @click="$router.push(`/cp422021_atd_check/${period.id}`)" style="margin-inline-start: auto;" color="green">
                  <v-icon>mdi-page-next-outline</v-icon>
                </VBtn>
                <VBtn icon @click="editClassPeriod(period.id, period.lesson, period.date, period.time)" style="margin-inline-start: auto;" color="blue">
                  <v-icon>mdi-pencil-circle-outline</v-icon>
                </VBtn>
                <VBtn icon @click="confirmDeleteClassPeriod(period.id)" style="margin-inline-start: auto;" color="red">
                  <v-icon>mdi-delete-forever</v-icon>
                </VBtn>
              </div>
            </VCardText>
          </VCard>
        </div>
      </VCardText>
    </VCard>
    
    <!-- Students -->
    <VCard class="mt-5" :style="{ backgroundColor: '#747070', color: '#fff' }">
    <VCardText>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 18px;">
        <span style="flex: 1; text-align: center;">Student :</span>
        <span style="flex: 1; text-align: center;">Name :</span>
        <span style="flex: 1; text-align: right;">Department :</span>
        <span style="flex: 1; text-align: right">Section :</span>
        <span style="flex: 1; text-align: center;"></span>
      </div>

      <div v-for="student in students" :key="student.id" style="margin-block-start: 10px;">
        <VCard :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
          <VCardText style="inline-size: 100%;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; font-size: 16px;">
              <span style="flex: 1; text-align: center;">{{ student.stdid }}</span>
              <span style="flex: 1; text-align: center;">{{ student.studentName }}</span>
              <span style="flex: 1; text-align: center;">{{ student.department }}</span>
              <span style="flex: 1; text-align: center">{{ student.section }}</span>
              <VBtn icon @click="openEditDialogs(student)" color="blue" style="margin-left: auto;">
                <v-icon>mdi-pencil</v-icon>
              </VBtn>
              <VBtn icon @click="confirmDeleteStudents(student.id)" color="red">
                <v-icon>mdi-delete</v-icon>
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </div>

      <div style="margin-block-start: 20px; text-align: center;">
        <VBtn color="primary" @click="dialogs = true">
          <v-icon left>mdi-plus</v-icon>
          Add Student
        </VBtn>
      </div>
    </VCardText>
  </VCard>

  <!-- Dialog สำหรับเพิ่มข้อมูลนักเรียน -->
<VDialog v-model="dialogs" max-width="600px">
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
        <VSelect 
          v-model="department" 
          :items="['CP-CY', 'CP-AI', 'CP-CS', 'CP-IT', 'CP-GIS']" 
          label="Department" 
          required 
          class="mb-4"
        />
        <VSelect 
          v-model="section" 
          :items="['1', '2', '3', '4', '5']" 
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
<VDialog v-model="editDialogs" max-width="600px">
  <template #title>
    <h3>Edit Student</h3>
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
        <VSelect 
          v-model="department" 
          :items="['CP-CY', 'CP-AI', 'CP-CS', 'CP-IT', 'CP-GIS']" 
          label="Department" 
          required 
          class="mb-4"
        />
        <VSelect 
          v-model="section" 
          :items="['1', '2', '3', '4', '5']" 
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
  <VDialog v-model="deleteDialogs" max-width="400px">
    <template #title>
      <h3>Confirm Delete</h3>
    </template>
    <VCard>
      <VCardText :style="{ marginTop: '20px' }">
        Are you sure you want to delete this student?
      </VCardText>
      <VCardActions>
        <VBtn color="red" @click="deleteStudent">Delete</VBtn>
        <VBtn @click="deleteDialogs = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
    
    <!-- Dialog สำหรับเพิ่มข้อมูล -->
    <VDialog v-model="dialog" max-width="600px">
      <template #title>
        <h3>Add Class Period</h3>
      </template>
      <VCard>
        <VCardText>
          <VForm>
            <VTextField 
              v-model="periodName" 
              label="Lesson Name e.g., Lecxx: xxxx" 
              required 
              class="mb-4" 
              style="margin-top: 20px;" 
            />
            <VTextField 
              v-model="date" 
              label="Date" 
              required 
              placeholder="e.g., 04/04/2005" 
            />
            <VTextField 
              v-model="time" 
              label="Time (e.g., 14:30 - 16:00)" 
              required 
              class="mt-4"
            />
            <VCardActions>
              <VBtn color="primary" @click="subClassPeriod">Submit</VBtn>
              <VBtn @click="dialog = false">Cancel</VBtn>
            </VCardActions>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Dialog ยืนยันการลบ -->
    <VDialog v-model="deleteDialog" max-width="400px">
      <template #title>
        <h3>Confirm Delete</h3>
      </template>
      <VCard>
        <VCardText style="margin-top: 20px;">
          Are you sure you want to delete this class period?
        </VCardText>
        <VCardActions>
          <VBtn color="red" @click="deleteClassPeriod">Yes</VBtn>
          <VBtn @click="deleteDialog = false">No</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  
    <!-- Dialog แก้ไขข้อมูล -->
    <VDialog v-model="editDialog" max-width="600px">
      <template #title>
        <h3>Edit Class Period</h3>
      </template>
      <VCard>
        <VCardText>
          <VForm>
            <VTextField v-model="periodName" label="Lesson Name" required style="margin-top: 20px"/>
            <VTextField v-model="date" label="Date" required />
            <VTextField v-model="time" label="Time" required />
            <VCardActions>
              <VBtn color="primary" @click="updateClassPeriod">Update</VBtn>
              <VBtn @click="editDialog = false">Cancel</VBtn>
            </VCardActions>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
