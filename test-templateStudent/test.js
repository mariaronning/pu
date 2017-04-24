const dbRefCourses = firebase.database().ref().child('Courses/');
const dbRefUsers = firebase.database().ref().child('Users/');
const btnLogout = document.getElementById('btnLogout');
const header = document.getElementById('subject');
const myResults = document.getElementById('Myresults');
const courseResults = document.getElementById('Courseresults');
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

function getAllResults() {
    var points = 0;
    var amount = 0;
    dbRefCourses.child(value + "/questions/").once('value', snap => {
        for(var key in snap.val()) {
            if (snap.child(key).hasChild("levelData")) {
                points += snap.val()[key].levelData.points;
                amount += snap.val()[key].levelData.amount;
            }
        }
        createGraphs(courseResults, points, amount - points, 'allResults');
    });
}

function getMyResults() {
    dbRefUsers.child(user).once('value', snap => {
        var points = 0;
        var amount = 0;
        if(snap.hasChild('results')) {
            if(snap.child('results').hasChild(value)) {
                points += snap.child('results').child(value).val().points;
                amount += snap.child('results').child(value).val().amount;
            }

        }
        createGraphs(myResults, points, (amount - points), 'results');
    });
}

function createGraphs(div, right, wrong, id) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.title = right + '/' + (right + wrong);
    canvas.style.maxWidth = '250px';
    canvas.style.maxHeight = '250px';
    canvas.style.marginLeft = '7%';
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
    document.location.href = '../index.html';

});


var user;

//Writes email adress to nav-bar
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      user = firebaseUser.uid;
      getAllResults();
      getMyResults();
      userId.innerText = firebaseUser.email;
  }

});
