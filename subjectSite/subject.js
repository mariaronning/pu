
const btnLogout = document.getElementById('btnLogout');
//Logs out the user
btnLogout.addEventListener('click', e => {

  firebase.auth().signOut();
  document.location.href = '../index.html';

});

//Prints the user email of logged in user.
firebase.auth().onAuthStateChanged(user => {

  if (user) {
      userId.innerText = user.email;
  }

});
