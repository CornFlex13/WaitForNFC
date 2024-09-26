<template>
  <div class="user-profile">
    <div class="profile-info">
      <img :src="teacherPhoto" alt="Teacher Photo" class="profile-photo"/>
      <div class="details">
        <h2>{{ teacher.name }}</h2>
        <p><strong>ตำแหน่ง:</strong> {{ teacher.position }}</p>
        <p><strong>แผนก:</strong> {{ teacher.department }}</p>
        <p><strong>อีเมล:</strong> {{ teacher.email }}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> {{ teacher.phone }}</p>
        <p><strong>เกี่ยวกับ:</strong> {{ teacher.about }}</p>
      </div>
    </div>
  <div class="courses">
      <h3>วิชาที่สอน</h3>
      <ul>
        <li v-for="course in teacher.courses" :key="course.id">{{ course.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// ข้อมูลจำลองของอาจารย์
const teacher = ref({
  name: 'นาย ธราดล สุขสำราญ',
  position: 'อาจารย์ประจำ',
  department: 'วิทยาการคอมพิวเตอร์',
  email: 'somchai@example.com',
  phone: '012-345-6789',
  about: 'มีความสนใจในด้าน AI และ Machine Learning',
  photo: 'https://example.com/teacher-photo.jpg',
  courses: [
    { id: 1, name: 'การเขียนโปรแกรมพื้นฐาน' },
    { id: 2, name: 'การพัฒนาเว็บ' },
    { id: 3, name: 'ปัญญาประดิษฐ์' },
  ],
});

// สำหรับการใช้ภาพใน public
const teacherPhoto = '/images/avatars/avatar-1.png'; // หรือใช้ require() ถ้าอยู่ใน src
</script>

<style scoped>
/* สไตล์ */
</style>


<style scoped>
.user-profile {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-info {
  display: flex;
  margin-bottom: 20px;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
}

.details {
  flex-grow: 1;
}

.courses {
  margin-top: 20px;
}

.courses ul {
  list-style-type: none;
  padding: 0;
}

.courses li {
  background: #e9ecef;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
