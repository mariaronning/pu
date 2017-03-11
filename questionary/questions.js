const dbRefCourses = firebase.database().ref().child('Courses/');
const btnLogout = document.getElementById('btnLogout');
const courseHeader = document.getElementById('courseId');
const answerList = document.getElementById('answerList');


btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.location.href = '../index.html?<?php echo time(); ?';

});



function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var value = getUrlVars()['id'];
courseHeader.innerText = value;
var list = new Array();

dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
    for(var key in snap.val().questions){
        list.push(key);
    }
});

function clearList() {
    if (answerList) {
        while (answerList.firstChild) {
            answerList.removeChild(answerList.firstChild);
        }
    }
}

$(function(){
    $('#button').click(function(){
        dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
            clearList();
            var max = list.length;
            var random = Math.floor(Math.random()* max);
            var question = snap.val().questions[list[random]].question;
            var answers = snap.val().questions[list[random]].answers;
            var correct = snap.val().questions[list[random]].correct;
            var start ="";
            if(correct.constructor === Array) {
                 start = "<input type='checkbox'> ";
            }
            else {
                start= "<input type='radio'> ";
            }

            $('#question').text(question);
            for (var key in answers) {

                $('#answerList').append("<li>" + start + answers[key] + "</li>");
            }


        });
    });
});
