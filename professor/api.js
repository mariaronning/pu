var btn = document.getElementById("btn");

btn.addEventListener("click", e =>{
	
var request = new XMLHttpRequest();
request.open("GET","http://www.ime.ntnu.no/api/course/-");
request.onload = function(){
	var courses = JSON.parse(request.responseText); 
	console.log(courses);
};

request.send(); 
});


function myFunction() {
    var x = document.getElementById("sok");
    console.log("You are searching for: " + x.value);
}
