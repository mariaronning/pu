const dbRefCourses = firebase.database().ref().child('Courses/');
const btnLogout = document.getElementById('btnLogout');
const header = document.getElementById('subject');
const testLinks = document.getElementsByClassName('testLink');
const dbRefPoints = firebase.database().ref().child('Courses/');
const userId = document.getElementById('userID');

//Gets course ID from the url.
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
var value = getUrlVars()['id'];

//Sets header to course name
dbRefCourses.orderByKey().equalTo(value).on("child_added", snap => {
	header.innerText = snap.val().name;
});



function createLinks() {
	for(var i = 0; i < testLinks.length; i++) {
        var levelid = $(testLinks[i]).attr('id');
		testLinks.item(i).href = "../questionary/questions.html" + "?id=" + value + "&&level=" + levelid;
	}
}
createLinks();

//Log out the user
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.location.href = '../index.html?<?php echo time(); ?';

});

//Writes email adress to nav-bar
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      userId.innerText = firebaseUser.email;
  }

});
