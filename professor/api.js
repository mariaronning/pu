var btn = document.getElementById("btn");
var x = document.getElementById("sok");
var info = document.getElementById("info");
function myFunction() {
    console.log("You are searching for: " + x.value);
	
}

function renderHTML(data){
	var htmlstring ="";
	for(i=0; i< data.length; i++){
		htmlstring += "<p>" + data.course[i].name + data[i].course.code +"</p>";
		console.log(data);
	}
	info.innerHTML = htmlstring;
	
}
	


btn.addEventListener("click", e =>{
	
var request = new XMLHttpRequest();
request.open("GET","http://www.ime.ntnu.no/api/course/-");
request.onload = function(){
	var courses = JSON.parse(request.responseText); 
	console.log(courses);
	renderHTML(courses);
};

request.send(); 
});


