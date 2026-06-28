import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getStorage,
ref,
uploadBytes,
getDownloadURL

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


import {

getFirestore,
collection,
addDoc,
getDocs,
orderBy,
query

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const firebaseConfig = {


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaPxY7rnI_Gxw3p8BBnJFK7eX4r8jWjqY",
  authDomain: "gallery-6da0e.firebaseapp.com",
  projectId: "gallery-6da0e",
  storageBucket: "gallery-6da0e.firebasestorage.app",
  messagingSenderId: "785119785688",
  appId: "1:785119785688:web:6ac019610d19f741269dad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);





const app = initializeApp(firebaseConfig);


const storage = getStorage(app);


const db = getFirestore(app);




const upload =
document.getElementById("upload");


const gallery =
document.getElementById("gallery");


const status =
document.getElementById("status");





upload.addEventListener("change",async()=>{


const file = upload.files[0];


if(!file)return;



status.innerHTML="Uploading...";



const imageRef =
ref(storage,"images/"+Date.now()+file.name);



await uploadBytes(imageRef,file);



const url =
await getDownloadURL(imageRef);



const now =
new Date();



await addDoc(collection(db,"gallery"),{


image:url,


date:now.toLocaleDateString(),


time:now.toLocaleTimeString()


});



status.innerHTML="✅ Uploaded";


loadImages();


});







async function loadImages(){


gallery.innerHTML="";



const q =
query(

collection(db,"gallery"),

orderBy("date","desc")

);



const result =
await getDocs(q);



result.forEach(item=>{


const data=item.data();



gallery.innerHTML +=`


<div class="card">


<img src="${data.image}">


<div class="info">


Uploaded:

<br>

${data.date}

<br>

${data.time}


</div>


</div>


`;


});


}



loadImages();
