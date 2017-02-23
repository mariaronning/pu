

const searchValue = document.getElementById('sok');
const preObject = document.getElementById('searchEnigne');
const dbRefCourses = firebase.database().ref().child('Courses');
const searchResults = document.getElementById('searchResults');
const userId = document.getElementById("userID");

searchValue.addEventListener('input', e => {
    if(searchValue.value == "") {
        clearList();
    } else {
        clearList();
        fireSearch(searchValue.value.toUpperCase(), 10);
    }

});

function fireSearch(startValue, limit) {
    dbRefCourses.orderByKey().startAt(startValue)
    .endAt(startValue + "\uf8ff").limitToFirst(limit).on("child_added", snap => {
        createList(snap);
    });
};

function createList(snap) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    li.innerText = snap.key + " " + snap.val().name;
    li.id = snap.key;
    li.className = "list-group-item";
    div.className = "searchElements"
    searchResults.appendChild(div);
    div.appendChild(li);
}

function clearList() {
    if (searchResults) {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }
}

btnLogout.addEventListener('click', e => {

  firebase.auth().signOut();
  document.location.href = '../index.html';

});

firebase.auth().onAuthStateChanged(user => {

  if (user) {
      userId.innerText = user.email;
  }

});
