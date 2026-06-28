const photos=document.querySelectorAll(".gallery img");


photos.forEach(photo=>{


photo.onclick=()=>{


photo.requestFullscreen();


}


});
