const upload =
document.getElementById("upload");


const gallery =
document.getElementById("gallery");



upload.addEventListener("change",function(){


const files=this.files;



for(let file of files){


const reader=new FileReader();



reader.onload=function(e){



let card=document.createElement("div");

card.className="card";



card.innerHTML=`

<img src="${e.target.result}">


<div class="info">

Uploaded:

<br>

${new Date().toLocaleString()}

</div>

`;



gallery.prepend(card);



}



reader.readAsDataURL(file);


}



});
