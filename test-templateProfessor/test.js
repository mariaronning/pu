const dbRefCourses = firebase.database().ref().child('Courses/');
const btnLogout = document.getElementById('btnLogout');
const header = document.getElementById('subject');
const level1 = document.getElementById('Availabletest');
const level2 = document.getElementById('Myresults');
const level3 = document.getElementById('Courseresults');
const testLinks = document.getElementsByClassName('testLink');
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

var pointsLevel1 = 0;
var pointsLevel2 = 0;
var pointsLevel3 = 0;

var answersLevel1 = 0;
var answersLevel2 = 0;
var answersLevel3 = 0;


function getResults() {
    dbRefCourses.child(value + "/questions/").once('value', snap => {
        for(var key in snap.val()) {
            if (snap.child(key).hasChild("levelData")) {
                if(snap.val()[key].levelData.level == 1) {
                    pointsLevel1 += snap.val()[key].levelData.points;
                    answersLevel1 += snap.val()[key].levelData.amount;
                } else if(snap.val()[key].levelData.level == 2) {
                    pointsLevel2 += snap.val()[key].levelData.points;
                    answersLevel2 += snap.val()[key].levelData.amount;
                } else if(snap.val()[key].levelData.level == 3) {
                    pointsLevel3 += snap.val()[key].levelData.points;
                    answersLevel3 += snap.val()[key].levelData.amount;
                }
            }
        }
        createGraphs(level1, pointsLevel1, answersLevel1 - pointsLevel1, 'level1');
        createGraphs(level2, pointsLevel2, answersLevel2 - pointsLevel2, 'level2');
        createGraphs(level3, pointsLevel3, answersLevel3 - pointsLevel3, 'level3');
    });
}
getResults();

function createGraphs(div, right, wrong, id) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.title = right + '/' + (right + wrong);
    canvas.style.maxWidth = '250px';
    canvas.style.maxHeight = '250px';
    canvas.style.marginLeft = '10%';
    div.appendChild(canvas);
    var id = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: [
                "Right",
                "Wrong",
            ],
            datasets: [{
                data: [right, wrong],
                backgroundColor: [
                    "#577a4f",
                    "#964c4c"
                ],
                hoverBackgroundColor: [
                    "#4d7744",
                    "#933e3e"
                ]
            }]
        },
        options: {
            animation:{
                animateScale:true
            }
        }
    });

}



//Log out the user
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.location.href = '../index.html';

});

//Writes email adress to nav-bar
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      userId.innerText = firebaseUser.email;
  }

});
