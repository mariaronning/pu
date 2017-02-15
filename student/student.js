(function() {


  const btnLogout = document.getElementById("btnLogout");


  btnLogout.addEventListener("click", e => {
      firebase.auth().signOut();
      document.location.href = "../index.html";
  });

  firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user.uid);
  } else {
    console.log("Firebase is a jackass");
  }
});

  }());
