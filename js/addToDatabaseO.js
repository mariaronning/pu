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
setTimeout(getData("TDT4242"), 0);
setTimeout(getData("IT2805"), 3000);
setTimeout(getData("MFEL1010"), 9000);
setTimeout(getData("MFEL1050"), 12000);
setTimeout(getData("TDT4110"), 15000);
setTimeout(getData("TDT4136"), 18000);
setTimeout(getData("TDT4140"), 21000);
setTimeout(getData("TDT4145"), 24000);
setTimeout(getData("TDT4160"), 27000);
setTimeout(getData("TDT4175"), 30000);
setTimeout(getData("TDT4180"), 33000);
setTimeout(getData("TDT4186"), 36000);
setTimeout(getData("TDT4242"), 39000);
setTimeout(getData("TDT4252"), 43000);
setTimeout(getData("TIØ4258"), 45000);
setTimeout(getData("TTM4100"), 48000);
