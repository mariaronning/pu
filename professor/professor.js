

const searchValue = document.getElementById('sok');
const preObject = document.getElementById('searchEnigne');
const dbRefCourses = firebase.database().ref().child('Courses');
const uList = document.getElementById('searchResults');

searchValue.addEventListener('input', e => {
    if(searchValue.value == "") {
        clearList();
    } else {
        fireSearch(searchValue.value.toUpperCase());
    }

});



function fireSearch(startValue) {
    clearList();
    dbRefCourses.orderByKey().startAt(startValue)
    .endAt(startValue + "\uf8ff").limitToFirst(10).on("child_added", snap => {
        createList(snap);
    });
};

function createList(snap) {
    const li = document.createElement('li');
    li.innerText = snap.key + " " + snap.val().name;
    li.id = snap.key;
    li.class = "searchElements";
    uList.appendChild(li);
}

function clearList() {
    if (searchResults) {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }
}

/*dbRefCourses.on('value', snap => {

    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key();
    uList.appendChild(li);

});*/


/*dbRefList.on('child_added', snap => {

  const li = document.createElement('li');
  li.innerText = snap.val();
  li.id = snap.key;
  uList.appendChild(li);

});

dbRefList.on('child_changed', snap => {

  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();

});

dbRefList.on('child_removed', snap => {

  const liToRemove = document.getElementById(snap.key);
  liToRemove.remove();

});*/

btnLogout.addEventListener('click', e => {

  firebase.auth().signOut();
  document.location.href = '../index.html';

});

firebase.auth().onAuthStateChanged(user => {

  if (user) {
      //console.log(user.uid);
  } else {
      //console.log('Firebase is a jackass');
  }

});
