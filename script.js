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


apiKey:"YOUR_API_KEY",

authDomain:"YOUR_AUTH_DOMAIN",

projectId:"YOUR_PROJECT_ID",

storageBucket:"YOUR_STORAGE_BUCKET",

messagingSenderId:"YOUR_SENDER_ID",

appId:"YOUR_APP_ID"


};





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
