(function() {


  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");
  var newUser = false;
  //Add login event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById("errorLogin").innerHTML = e.message);

  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });


  //Add signup event
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById("errorLogin").innerHTML = e.message);
  });
  //Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    var name
    if(firebaseUser) {
      btnLogout.classList.remove('hide');
      if(firebaseUser.uid == "qSU0UXnTSQhzHBDcXhaKDCV6Eaq1") {
        window.location.href = "/professor/professor.html?<?php echo time(); ?";
      } else if (firebaseUser.uid == "HY642spfnmUaevElYM1sPAtHlbw2"){
        window.location.href = "/professor/professor.html?<?php echo time(); ?";
      } else {
        window.location.href = "/student/student.html?<?php echo time(); ?";
      }

    } else {
      btnLogout.classList.add('hide');

    }
  });

}());
