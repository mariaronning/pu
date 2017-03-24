
const btnLogout = document.getElementById('btnLogout');
const searchValue = document.getElementById('sok');
const preObject = document.getElementById('searchEnigne');
const dbRefCourses = firebase.database().ref().child('Courses');
const dbRefUsers = firebase.database().ref().child('Users');
const searchResults = document.getElementById('searchResults');
const userId = document.getElementById('userID');
const myCoursesOutput = document.getElementById('myCourseOutput');

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

    li.id = snap.key;
    aButton.id = snap.key;
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

//Clears the list when search value is empty
function clearList() {
    if (searchResults) {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }
}

//Creates user in database if user is not already registrered.
function createUser(user, emailUser) {
    firebase.database().ref("Users/" + user).set({
            email: emailUser
    });
}


//Checks if user is already registrered in database
function checkIfUser(userid, email) {
    dbRefUsers.once('value', snap => {
        if (snap.hasChild(userid)) {
            getmyCoursesDatabase(userid);
        } else {
            createUser(userid, email);
        }
    });
}

//Function that writes to myCoursesOutput list in the html document
function createListMyCourses(courseId) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const span = document.createElement('span');

    span.className = "glyphicon glyphicon-ok";
    span.style.volor="green";
    li.id = courseId;
    a.innerText = " " + courseId;
    a.style.textDecoration = "none";
    a.style.color = "black";
    li.style.textDecoration = "none";
    div.className = "col-md-12";
    div.style.paddingLeft = "12%";
    a.href = "/test-template/test.html"+ "?id=" + courseId;
    li.style.float = "left";



    myCoursesOutput.appendChild(div);
    div.appendChild(li);
    li.appendChild(span);
    li.appendChild(a);
}

//Gets all courses added by the current user and fires a fucntion that writes the courses to html
function getmyCoursesDatabase(user) {
    firebase.database().ref("Users/" + user + "/courses").limitToFirst(10).on('child_added', snap => {
        createListMyCourses(snap.val().course);
    });
};


//Writes the course clicked to databse
function setCoursesDatabase(user, courseId) {
    firebase.database().ref("Users/" + user + "/courses").push({
            course: courseId
    });
};

//Gets id of button clicked and writes the value to the database if not already added.
function getID() {
    $(".plusButton").unbind().click(function(event) {
    	var check = false;
        course = event.currentTarget.attributes[0].nodeValue;
        console.log(course);
    	dbRefUsers.child(user).child('courses').once('value', snap => {
            for(var key in snap.val()) {
                console.log(snap.val()[key].course)
                if (snap.val()[key].course == course) {
                    check = true;
                    break;
                } else {
                    check = false;
                }

            }
            if (check == true) {
            } else {
                setCoursesDatabase(user, event.currentTarget.attributes[0].nodeValue);
            }
        });
    });
}

//Logs out the user
btnLogout.addEventListener('click', e => {

  firebase.auth().signOut();
  document.location.href = '../index.html?<?php echo time(); ?';

});

var user;

//Prints the user email of logged in user. Checks if user is registrered in the database.
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      checkIfUser(firebaseUser.uid, firebaseUser.email);
      user = firebaseUser.uid;
      userId.innerText = firebaseUser.email;
  }

});
