// Get the modal
const modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
function imgClick(event){
	modal.style.display = "block";
	modalImg.src = event.target.src;
	captionText.innerHTML = event.target.alt;
}

// When the user clicks on <span> (x), close the modal
function closeImg(event) { 
	console.log("clicked");
	modal.style.display = "none";
}
function stopPropagation(event) {
	event.stopPropagation();
}