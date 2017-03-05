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
