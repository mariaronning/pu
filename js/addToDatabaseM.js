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



/*
setTimeout(getData("hls0001_h12.json", "HLS0001"), 0);
setTimeout(getData("hls0001_h13.json", "HLS0001"), 2000);
setTimeout(getData("hls0001_v09.json", "HLS0001"), 4000);
setTimeout(getData("hls0001.json", "HLS0001"), 6000);
setTimeout(getData("mfel1010_h08.json", "MFEL1010"), 8000);
setTimeout(getData("mfel1010_h09.json", "MFEL1010"), 10000);
setTimeout(getData("mfel1010_h10.json", "MFEL1010"), 12000);
setTimeout(getData("mfel1010_h11.json", "MFEL1010"), 14000);
setTimeout(getData("mfel1010_h12.json", "MFEL1010"), 16000);
setTimeout(getData("mfel1010_v08.json", "MFEL1010"), 18000);
setTimeout(getData("mfel1010_v09.json", "MFEL1010"), 20000);
setTimeout(getData("mfel1010_v10.json", "MFEL1010"), 22000);
setTimeout(getData("mfel1010_v11.json", "MFEL1010"), 24000);
setTimeout(getData("mfel1010_v13.json", "MFEL1010"), 26000);*/
setTimeout(getData("mfel1050_h09.json", "MFEL1050"), 0);
setTimeout(getData("mfel1050_h10.json", "MFEL1050"), 2000);
setTimeout(getData("mfel1050_h11.json", "MFEL1050"), 4000);
setTimeout(getData("mfel1050_v12.json", "MFEL1050"), 6000);
setTimeout(getData("mfel1050_v13.json", "MFEL1050"), 8000);
setTimeout(getData("tdt4140_h14.json", "TDT4140"), 10000);
setTimeout(getData("tdt4258_k15.json", "TDT4258"), 12000);
setTimeout(getData("tdt4258_v11.json", "TDT4258"), 14000);
setTimeout(getData("tdt4258_v13.json", "TDT4258"), 16000);
setTimeout(getData("tdt4258_v14.json", "TDT4258"), 18000);
setTimeout(getData("tdt4258_v15.json", "TDT4258"), 20000);
setTimeout(getData("tiø4258_h09.json", "TIØ4258"), 22000);
setTimeout(getData("tiø4258_h10.json", "TIØ4258"), 24000);
setTimeout(getData("tiø4258_h11.json", "TIØ4258"), 26000);
setTimeout(getData("tiø4258_h12.json", "TIØ4258"), 28000);
setTimeout(getData("tiø4258_v10.json", "TIØ4258"), 30000);
setTimeout(getData("tiø4258_v11.json", "TIØ4258"), 32000);
setTimeout(getData("tiø4258_v12.json", "TIØ4258"), 34000);
setTimeout(getData("tiø4258_v13.json", "TIØ4258"), 36000);
setTimeout(getData("tmm4230_v08.json", "TMM4230"), 38000);
setTimeout(getData("tmm4230_v10.json", "TMM4230"), 40000);
setTimeout(getData("tmm4230_v11.json", "TMM4230"), 42000);
setTimeout(getData("tmm4230_v12.json", "TMM4230"), 44000);
setTimeout(getData("tmm4230_v13.json", "TMM4230"), 46000);
//setTimeout(getData("ttm4100_v07.json", "TTM4100"), 0);
