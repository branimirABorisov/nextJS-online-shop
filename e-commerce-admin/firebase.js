import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAWudtkCDuV6_UvolqePOzRzquXpebcY1o",
    authDomain: "nextjs-e-commerce-storage.firebaseapp.com",
    projectId: "nextjs-e-commerce-storage",
    storageBucket: "nextjs-e-commerce-storage.appspot.com",
    messagingSenderId: "889432939544",
    appId: "1:889432939544:web:cfaec0c8258a54771e776d",
    measurementId: "G-G5GNLR32WC"
  
  };
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadImages(file) {
    console.log(storage, file);
    const storageRef = ref(storage, 'next/' + file.name);
    await uploadBytes(storageRef, file);
}



