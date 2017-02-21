var btn = document.getElementById("btn");
var x = document.getElementById("sok");
var info = document.getElementById("courseInfo");
function myFunction() {
    console.log("You are searching for: " + x.value);
	
}

function renderHTML(data){
	var htmlstring ="";
	htmlstring+=data.course.name; 
	htmlstring+= data.course.code; 
	info.innerHTML = htmlstring;
	
}
	


btn.addEventListener("click", e =>{
	
var request = new XMLHttpRequest();
request.open("GET","http://www.ime.ntnu.no/api/course/"+ x.value);
request.onload = function(){
	var courses = JSON.parse(request.responseText); 
	console.log(courses);
	renderHTML(courses);
	x.value = "";
};

request.send(); 
});


