//Script for loading json objects from Overflow into our database.
var database = firebase.database();

function getData(name) {
    var filePath = "../questions/" + name + ".json";
    var request = new XMLHttpRequest();
    request.open("get", filePath, true);
    request.onload = function() {
        var courseData = JSON.parse(this.responseText);
        //addToDatabase("TDT4242", courseData.name, courseData.code, courseData.questions, courseData.correct);

        for(var key in courseData.questions) {
            var sum = 0;
            if(courseData.questions.hasOwnProperty(key)) {
                var sum;
                var list = new Array();
                for(var secondKey in courseData.questions[key].answers) {
                    if(courseData.questions[key].answers[secondKey].correct == true) {
                        list.push(secondKey);

                    }
                    sum ++;
                }
                if(list.length == 1) {
                    if(sum == 4){
                        addToDatabase4(name, courseData.questions[key], list[0]);
                    }
                    else if(sum == 3) {
                        addToDatabase3(name, courseData.questions[key], list[0]);
                    }
                    else if(sum == 2) {
                        addToDatabase2(name, courseData.questions[key], list[0]);
                    }
                } else {
                    if(sum == 4){
                        addToDatabase4(name, courseData.questions[key], list);
                    }
                    else if(sum == 3) {
                        addToDatabase3(name, courseData.questions[key], list);
                    }
                    else if(sum == 2) {
                        addToDatabase2(name, courseData.questions[key], list);
                    }
                }

            }
        }
    }
    request.send();
}

/*
function addToDatabase(course, course_questions, correctAnswer) {
    firebase.database().ref('Courses/' + course + "/questions").push({

            question: course_questions.description,
            answers: [course_questions.answers[0].description, course_questions.answers[1].description, course_questions.answers[2].description, course_questions.answers[3].description],
            correct: correctAnswer

    });
};*/
function addToDatabase4(course, course_questions, correctAnswer) {
    firebase.database().ref('Courses/' + course + "/questions").push({

            question: course_questions.description,
            answers: [course_questions.answers[0].description, course_questions.answers[1].description, course_questions.answers[2].description, course_questions.answers[3].description],
            correct: correctAnswer

    });
};
function addToDatabase3(course, course_questions, correctAnswer) {
    firebase.database().ref('Courses/' + course + "/questions").push({

            question: course_questions.description,
            answers: [course_questions.answers[0].description, course_questions.answers[1].description, course_questions.answers[2].description],
            correct: correctAnswer

    });
};
function addToDatabase2(course, course_questions, correctAnswer) {
    firebase.database().ref('Courses/' + course + "/questions").push({

            question: course_questions.description,
            answers: [course_questions.answers[0].description, course_questions.answers[1].description],
            correct: correctAnswer

    });
};

//getData("HLS0001"); Remember _overflow
//getData("TDT4242");
//getData("IT2805");
//getData("MFEL1010");
//getData("MFEL1050");
//getData("TDT4110");
//getData("TDT4136");
//getData("TDT4140");
//getData("TDT4145");
//getData("TDT4160");
//getData("TDT4175");
//getData("TDT4180");
//getData("TDT4186");
//getData("TDT4242");
//getData("TDT4252");
//getData("TIØ4258");
//getData("TTM4100");
