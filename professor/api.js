var btn = document.getElementById("submit");
var sok = document.getElementById("sok");
//var info = document.getElementById("courseInfo");

//function myFunction() {
    //console.log("You are searching for: " + sok.value);
//}

/*function renderHTML(data){
	var htmlstring = "";
	htmlstring += data.course.name;
	htmlstring += data.course.code;
	info.innerHTML = htmlstring;

}*/


var database = firebase.database();

getData()

function addToDatabase(course, course_name) {
    firebase.database().ref('Courses/' + course).set({
        name: course_name
     });

};

function getData() {
    var request = new XMLHttpRequest();
    request.open("GET","http://www.ime.ntnu.no/api/course/-");
    request.onload = function(){
	       var courses = JSON.parse(request.responseText);
           for(var key in courses.course) {
               if (courses.course.hasOwnProperty(key)){
                    addToDatabase(courses.course[key].code, courses.course[key].name);
                }
           }
       }
      request.send();
};
