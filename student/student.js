
const btnLogout = document.getElementById('btnLogout');
const searchValue = document.getElementById('sok');
const preObject = document.getElementById('searchEnigne');
const dbRefCourses = firebase.database().ref().child('Courses');
const dbRefUsers = firebase.database().ref().child('Users');
const searchResults = document.getElementById('searchResults');
const userId = document.getElementById('userID');

//Listen for change in search value
searchValue.addEventListener('input', e => {
    if(searchValue.value == "") {
        clearList();
    } else {
        clearList();
        fireSearch(searchValue.value.toUpperCase(), 6);
    }

});


//Searches the database and returns matching courses, maximum of 6 elements
function fireSearch(startValue, limit) {
    dbRefCourses.orderByKey().startAt(startValue)
    .endAt(startValue + "\uf8ff").limitToFirst(limit).on("child_added", snap => {
        createList(snap);
        getID();
    });

};

//Creates a list with matching elements from fireSearch
function createList(snap) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const aButton = document.createElement('button');
    const span = document.createElement('span');

    //li.innerText = snap.key + " " + snap.val().name;
    li.id = snap.key;
    //check length of name, and cut string if needed
    if (snap.val().name.length > 48) {
        a.innerText = snap.key + " " + snap.val().name.substring(0,48) + "...";
    } else {
        a.innerText = snap.key + " " + snap.val().name;
    }
    li.className = "courseItems";   
    span.className = "glyphicon glyphicon-plus";
    a.style.color = "black";
    a.style.textDecoration = "none";
    aButton.style.color = "black";
    aButton.style.textDecoration = "none";
    div.style.height = "50px";
    div.style.paddingTop = "12px";
    div.style.borderBottom = "1px solid #C9C9C9";
    div.className = "col-md-12";
    aButton.className = "plusButton btn btn-default";
    li.style.float = "left";
    aButton.style.float = "right";
    a.href = "/test-template/test.html"+ "?id=" + snap.key;

    searchResults.appendChild(div);
    div.appendChild(li);
    li.appendChild(a);
    div.appendChild(aButton);
    aButton.appendChild(span);

}



/*
var courseClicked;
function getID() {
    var buttons = document.getElementsByClassName('plusButton');
    var array = new Array();
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            courseClicked = this.id;
            return this.id;
        });
    }

};*/



//Clears the list when search value is empty
function clearList() {
    if (searchResults) {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }
}



//Logs out the user
btnLogout.addEventListener('click', e => {

  firebase.auth().signOut();
  document.location.href = '../index.html?<?php echo time(); ?';

});

//Creates user in database if user is not already registrered.
function createUser(user, emailUser) {
    firebase.database().ref("Users/" + user).set({
            email: emailUser
    });
}


function checkIfUser(userid, email) {
    dbRefUsers.once('value', snap => {
        if (snap.hasChild(userid)) {

        } else {
            createUser(userid, email);
        }
    });
}
function checkIfCourse(userid, course) {

    dbRefUsers.child(userid).child('courses').once('value', snap => {
        for(var key in snap.val()) {
            if (snap.val()[key].course == course) {
                console.log(course);
                console.log("true");
                return true;
            } else {
                console.log("false");
                console.log(course);
                return false;
            }

        }
    });
}

//Writes the course clicked to databse
function setCoursesDatabase(user, courseId) {
    firebase.database().ref("Users/" + user + "/courses").push({
            course: courseId
    });
};

//Gets id of button clicked and sends this to a function that writes the value to the database.
function getID() {
    $(".plusButton").unbind().click(function(event) {
        var check =  await checkIfCourse(user, event.currentTarget.attributes[0].nodeValue);
        console.log("HEI");
        if (check == true) {
            console.log("true");

        } else {
            console.log("false");
            //setCoursesDatabase(user, event.currentTarget.attributes[0].nodeValue);
        }
        console.log("HADE");

    });
}


var user;

//Prints the user email of logged in user. Checks if user is registrered in the database.
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      checkIfUser(firebaseUser.uid, firebaseUser.email);
      user = firebaseUser.uid;
      userId.innerText = firebaseUser.email;
  }

});
