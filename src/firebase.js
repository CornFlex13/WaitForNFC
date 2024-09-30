import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { getFunctions, httpsCallable } from "firebase/functions"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAPHDCyXRvubMmC7pjSqTgZ0sDlxtm1gOU",
  authDomain: "cp422021-tharadol.firebaseapp.com",
  databaseURL: "https://cp422021-tharadol-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cp422021-tharadol",
  storageBucket: "cp422021-tharadol.appspot.com",
  messagingSenderId: "977224384146",
  appId: "1:977224384146:web:d353ed0420f6620474b04b",
  measurementId: "G-73H5BRZJV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const storage = getStorage(app)

// ถ้าต้องการใช้ Functions ในภูมิภาคอื่นที่ไม่ใช่ค่าเริ่มต้น (us-central1) ให้ระบุภูมิภาค
// const functions = getFunctions(app, "asia-southeast1")
const functions = getFunctions(app)

// ถ้าไม่ต้องการเชื่อมต่อกับ Emulator ไม่ต้องใช้บรรทัดเหล่านี้
// connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
// connectFirestoreEmulator(db, 'localhost', 8080)
// connectFunctionsEmulator(functions, "localhost", 5001)
// connectStorageEmulator(storage, "localhost", 9199)

const call = async(functionName, params) => {
  try {
    let callableFunctions = httpsCallable(functions, functionName)
    let res = await callableFunctions(params)
    if (res.data.success) {
      return res.data
    } else if(res.data.success === false) {
      console.log(res.data.reason)
    }
  } catch (err) {
    console.log(err)
  }
}

export { app, auth, call, db, functions, storage }
