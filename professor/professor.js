


const preObject = document.getElementById('searchEnigne');
const dbRefCourses = firebase.database().ref().child('Courses');
const uList = document.getElementById('search');


dbRefCourses.on('value', snap => {

    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key();
    uList.appendChild(li);

});


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
