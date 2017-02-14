
function httpget()
var url = "http://www.ime.ntnu.no/api/course/en/" + "tdt4145";
var course = new XMLHttpRequest();
course.open("GET",url, false)
course.send(null); 
return course.responseText; 
