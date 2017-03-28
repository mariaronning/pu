const dbRefCourses = firebase.database().ref().child('Courses/');
const btnLogout = document.getElementById('btnLogout');
const courseHeader = document.getElementById('courseId');
const answerList = document.getElementById('answerList');
const questionP = document.getElementById('question');
const questionary = document.getElementById('questionary');
const info = document.getElementById('info');
const dbRefPoints = firebase.database().ref().child('Courses/');

//Log out the user
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.location.href = '../index.html?<?php echo time(); ?';

});


//Gets id from url, id is the course clicked
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
                function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


var value = getUrlVars()['id'];
var levelid = getUrlVars()['level'];
courseHeader.innerText = value;

//Create list of keys, in order to randomize questions
var list = new Array();


dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
    for(var key in snap.val().questions){
        if(levelid != "random") {
            dbRefPoints.child(value + "/questions/" + key).once('value', snap => {
                if (snap.hasChild("levelData")) {
                    if(snap.val().level == parseInt(levelid)) {
                        list.push(key);
                    }
                }
            });
        } else {
            list.push(key);
        }
    }
    console.log(list.length)
});
console.log(list.length);

//Clears Answers list of li elements/answers
function clearList() {
    if (answerList) {
        while (answerList.firstChild) {
            answerList.removeChild(answerList.firstChild);
        }
        info.removeChild(info.firstChild);
    }
}
var correct;
var currentKey;


//When next is clicked and document loads, it prints out questions and answers
function questions() {
    dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
        clearList();
        var max = list.length;
        var random = Math.floor(Math.random()* max);
        var question = snap.val().questions[list[random]].question;
        var answers = snap.val().questions[list[random]].answers;
        correct = snap.val().questions[list[random]].correct;
        currentKey = randomizedList[random];
        var start ="";
        if(correct.constructor === Array) {
             start = "<input type='checkbox' name='checkAnswer' ";
        }
        else {
            start= "<input type='radio' name='groupAnswer' ";
        }
        $('#question').text(question);
        for (var key in answers) {
            $('#answerList').append("<li id='" + key + "'>" + start + "value=" + key + "> " +
                                                answers[key] + "</li>");
        }
        $('#info').append('<p> Number of answered questions: ' + answeredQuestions + '/' + total + ' </p>');
    });
}
//Checks whether a radio button is checked and returns the value;
function checkAnswerRadio() {
    return $('input[name=groupAnswer]:checked', '#answerList').val();
}

//Returns a list of the values of the checked checkboxes
function checkAnswerCheckbox() {
    var answeredValues = new Array();
    var checkboxes = document.getElementsByName("checkAnswer");
    for(var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            answeredValues.push(checkboxes[i].value);
        }
    }
    return answeredValues;
}

//Checks whether anyy of the checkboxes are checked
function booleanChecked() {
    var checked = false;
    $('input[name="checkAnswer"]').each(function() {
        if ($(this).is(":checked")) {
            checked = true;
        }
    });
    return checked;
}
//Clears the div element after the test is finished.
function clearDiv() {
    if (questionary) {
        while (questionary.firstChild) {
            questionary.removeChild(questionary.firstChild);
        }
    }
}

//Writes to the questionray div the results from the test.
function returnResults() {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const pPoints = document.createElement('p');
    const pAnswered = document.createElement('p');
    const pPercentage = document.createElement('p');
    div.className = 'col-md-12';
    h1.innerText = 'Results';
    div.style.paddingTop = '3%';
    pPoints.innerText = 'Number of points: ' + points;
    pAnswered.innerText = 'Number of questions answered: ' + answeredQuestions;
    pPercentage.innerText = 'Percentage of right questions ' + round((points/answeredQuestions)*100, 0) + '%';

    questionary.appendChild(div);
    div.appendChild(h1);
    div.appendChild(pPoints);
    div.appendChild(pAnswered);
    div.appendChild(pPercentage);
}

var counter = 0;
var points = 0;
var answeredQuestions = 0;
var total = 6;

//Writes levelData to the database if not already there.
function writeToDatabase(point, setAmount) {
    console.log(currentKey);
    firebase.database().ref("Courses/" + value + "/questions/" + currentKey + "/levelData").set({
            points: point,
            amount: setAmount,
            level: 1
    });
}


//Updates points, number of times answered and level if already in database, else writes the objects to the database
function checkIfPoints(setPoint) {
    dbRefPoints.child(value + "/questions/" + currentKey).once('value', snap => {
        if (snap.hasChild('levelData')) {
            var totalAmount = snap.val().levelData.amount;
            var pointQuestion = snap.val().levelData.points;
            totalAmount ++;
            pointQuestion += setPoint;
            var percentage = round((pointQuestion/totalAmount)*100, 0);

            var lvl;
            if (percentage <= 40) {
                lvl = 1;
            } else if (percentage <= 76 && percentage > 40) {
                lvl = 2;
            } else {
                lvl = 3;
            }
            snap.child('levelData').ref.update({
                amount: totalAmount,
                points: pointQuestion,
                level: lvl
            })

        } else {
            writeToDatabase(setPoint, 1);
        }
    });
}

//jQuery code that runs questions() on loading of website and on button click.
$(function(){
    $( document ).ready(function() {
        questions();
    });
    $('#buttonNext').click(function(){
        answeredQuestions ++;
        if(counter < total) {
            questions();
            counter ++;
        }
        if(counter == total) {
            clearDiv();
            returnResults();
        }

        $('#buttonNext').prop('disabled', true);
    });
    $('#answerList').change(function () {
        if(correct.constructor === Array) {
            $('#buttonAnswer').prop('disabled', true);
            var checked = booleanChecked();
            if(checked) {
                $('#buttonAnswer').removeAttr('disabled');
            }
        }
        else {
            $('#buttonAnswer').removeAttr('disabled');

        }
    });
    //Gives user feedback if wrong/right when radiobutton
    $('#buttonAnswer').click(function(){
        var answered = checkAnswerRadio();
        point = 0;
        if(correct == answered) {
            $('#' + answered).css('color', 'green');
            points += 1;
            point = 1;
        }
        else {
            $('#' + answered).css('color', 'red');
            $('#' + correct).css('color', 'green');

        }
        checkIfPoints(point);
        $('#buttonAnswer').prop('disabled', true);
        $('#buttonNext').removeAttr('disabled');
    });

    //Gives user feedback to wrong/right answer when checkboxes
    $('#buttonAnswer').click(function() {
        if(correct.constructor === Array) {
            var total = correct.length;
            var tempPoints = 0;
            var answered = checkAnswerCheckbox();
            var checkboxes = document.getElementsByName("checkAnswer");
            for(var i = 0; i < checkboxes.length; i++) {
                var li = document.getElementById(i);
                if(correct.indexOf(checkboxes[i].value) > -1 && answered.indexOf(checkboxes[i].value) > -1) {
                    li.style.color = "green";
                    tempPoints += 1;
                } else if(correct.indexOf(checkboxes[i].value) > -1 && answered.indexOf(checkboxes[i].value) == -1) {
                    li.style.color = "green";
                    tempPoints -= 0.5;
                }
                else if(correct.indexOf(checkboxes[i].value) == -1 && answered.indexOf(checkboxes[i].value) > -1) {
                    li.style.color = "red";
                    tempPoints -= 0.5;
                }
            }
            if (tempPoints > 0) {
                points += round(tempPoints/total, 1);
                //console.log(round(tempPoints/total, 1))
                checkIfPoints(round(tempPoints/total, 1));
            }
            $('#buttonAnswer').prop('disabled', true);
            $('#buttonNext').removeAttr('disabled');
        }

    });
});
//fucntion for rounding a float to x decimals.
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
