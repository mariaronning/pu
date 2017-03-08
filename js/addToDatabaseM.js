//Script for loading json objects from Memorizer into our database.
var database = firebase.database();

function getData(file, name) {
    var filePath = "../questions/" + file;
    var request = new XMLHttpRequest();
    request.open("get", filePath, true);
    request.onload = function() {
        var courseData = JSON.parse(this.responseText);
        //addToDatabase("TDT4242", courseData.name, courseData.code, courseData.questions, courseData.correct);

        for(var key in courseData.questions) {
            var sum = 0;
            if(courseData.questions.hasOwnProperty(key)) {
                addToDatabase(name, courseData.questions[key].question, courseData.questions[key].answers, courseData.questions[key].correct);

            }
        }
    }
    request.send();
};


function addToDatabase(course, course_questions, course_answer, correctAnswer) {
    firebase.database().ref('Courses/' + course + "/questions").push({
            question: course_questions,
            answers: course_answer,
            correct: correctAnswer

    });
};



getData("ttm4100_v07.json", "TTM4100");
