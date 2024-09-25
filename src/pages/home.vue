<template>
  <h3 style="font-size: 37px">Classroom</h3>

  <VCard class="mt-8" :style="{ backgroundColor: '#D9D9D9', color: '#333' }">
    <VCardText>
      <VRow>
        <!-- Loop through courses array from Firestore -->
        <VCol v-for="course in courses" :key="course.id" cols="4" class="d-flex align-center justify-center">
          <v-btn
            rounded
            size="x-large"
            block
            height="250"
            class="text-start"
            color="white"
            @click="$router.push(`/${course.courseid}`)">
            {{ course.courseid }}<br />{{ course.name }}
          </v-btn>
        </VCol>

        <!-- Button for adding a new classroom -->
       
      </VRow>
    </VCardText>
  </VCard>

  <!-- Modal สำหรับเพิ่มคอร์สใหม่ -->
  <VDialog v-model="dialog" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Add New Classroom</span>
      </VCardTitle>

      <VCardText>
        <VTextField v-model="newCourse.courseid" label="Course ID" />
        <VTextField v-model="newCourse.name" label="Course Name" />
      </VCardText>

      <VCardActions>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="submitClassroom">Add</v-btn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // ไฟล์ firebase.js ของคุณ

export default {
  data() {
    return {
      courses: [], // Array สำหรับเก็บข้อมูลคอร์สจาก Firestore
      dialog: false, // สำหรับเปิด-ปิด modal
      newCourse: { courseid: '', name: '' }, // สำหรับเก็บข้อมูลคอร์สใหม่
    };
  },
  async created() {
    await this.fetchCourses(); // ดึงข้อมูลเมื่อ component ถูกสร้าง
  },
  methods: {
    async fetchCourses() {
      // ดึงข้อมูลจาก Firestore
      const querySnapshot = await getDocs(collection(db, 'Classrooms'));
      const coursesArray = [];
      querySnapshot.forEach((doc) => {
        coursesArray.push({ id: doc.id, ...doc.data() });
      });
      this.courses = coursesArray; // เก็บข้อมูลลงใน courses array
    },
    addClassroom() {
      // เปิด modal เพื่อกรอกข้อมูลคอร์สใหม่
      this.dialog = true;
    },
    async submitClassroom() {
      // ตรวจสอบว่า fields ไม่ว่างเปล่า
      if (this.newCourse.courseid && this.newCourse.name) {
        try {
          // เพิ่มคอร์สใหม่ลงใน Firestore
          await addDoc(collection(db, 'Classrooms'), {
            courseid: this.newCourse.courseid,
            name: this.newCourse.name,
          });

          // หลังจากเพิ่มคอร์สใหม่ ดึงข้อมูลใหม่อีกครั้ง
          await this.fetchCourses();

          // ปิด modal และเคลียร์ข้อมูล
          this.dialog = false;
          this.newCourse = { courseid: '', name: '' };
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        alert('Please fill in both fields!');
      }
    },
  },
};
</script>

<style scoped>
/* Custom CSS */
</style>
