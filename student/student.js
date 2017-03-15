
const btnLogout = document.getElementById('btnLogout');
const searchValue = document.getElementById('sok');
const preObject = document.getElementById('searchEnigne');
const dbRefCourses = firebase.database().ref().child('Courses');
const searchResults = document.getElementById('searchResults');
const userId = document.getElementById("userID");

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
    });
};

//Creates a list with matching elements from fireSearch
function createList(snap) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const aButton = document.createElement('a');
    const span = document.createElement('span');

    li.id = snap.key;
    aButton.id = snap.key;
    a.innerText = snap.key + " " + snap.val().name;
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


//Logs out the user
btnLogout.addEventListener('click', e => {

  firebase.auth().signOut();
  document.location.href = '../index.html?<?php echo time(); ?';

});

//Prints the user email of logged in user.
firebase.auth().onAuthStateChanged(user => {

  if (user) {
      userId.innerText = user.email;
  }

});
