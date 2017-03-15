const dbRefCourses = firebase.database().ref().child('Courses/');
const btnLogout = document.getElementById('btnLogout');
const courseHeader = document.getElementById('courseId');
const answerList = document.getElementById('answerList');
const questionP = document.getElementById('question');


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
courseHeader.innerText = value;
var list = new Array();
//Create list of keys, in order to randomize questions
dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
    for(var key in snap.val().questions){
        list.push(key);
    }
});

//Clears Answers list of li elements/answers
function clearList() {
    if (answerList) {
        while (answerList.firstChild) {
            answerList.removeChild(answerList.firstChild);
        }
    }
}
var correct;

//When next is clicked and document loads, it prints out questions and answers
function questions() {
    dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
        clearList();
        var max = list.length;
        var random = Math.floor(Math.random()* max);
        var question = snap.val().questions[list[random]].question;
        var answers = snap.val().questions[list[random]].answers;
        correct = snap.val().questions[list[random]].correct;
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


//jQuery code that runs questions() on loading of website and on button click.
$(function(){
    $( document ).ready(function() {
        questions();
    });
    $('#buttonNext').click(function(){
        questions();
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
            $('#buttonAnswer').click(function(){
                var answered = checkAnswerRadio();
                if(correct == answered) {
                    $('#' + answered).css('color', 'green');
                }
                else {
                    $('#' + answered).css('color', 'red');
                    $('#' + correct).css('color', 'green');
                }
                $('#buttonAnswer').prop('disabled', true);
                $('#buttonNext').removeAttr('disabled');
            });
        }
    });

    //Gives user feedback to wrong/right answer
    $('#buttonAnswer').click(function() {
        if(correct.constructor === Array) {
            var answered = checkAnswerCheckbox();
            var checkboxes = document.getElementsByName("checkAnswer");
            for(var i = 0; i < checkboxes.length; i++) {
                var li = document.getElementById(i);
                if(correct.indexOf(checkboxes[i].value) > -1 && answered.indexOf(checkboxes[i].value) > -1) {
                    li.style.color = "green";
                } else if(correct.indexOf(checkboxes[i].value) > -1 && answered.indexOf(checkboxes[i].value) == -1) {
                    li.style.color = "green";
                }
                else if(correct.indexOf(checkboxes[i].value) == -1 && answered.indexOf(checkboxes[i].value) > -1) {
                    li.style.color = "red";
                }
            }
            $('#buttonAnswer').prop('disabled', true);
            $('#buttonNext').removeAttr('disabled');
        }

    });
});