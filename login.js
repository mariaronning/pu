(function() {

  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");
  const foreleser = document.getElementById("btn-foreleser");
  const student = document.getElementById("btn-student");

  //Add login event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });
  foreleser.addEventListener('click', e => {
    document.location.href = "/professor/professor.html";
  });
  student.addEventListener('click', e => {
    document.location.href = "/student/student.html";
  });

  //Add signup event
  btnSignUp.addEventListener('click', e => {

    //Check if it´s a real email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });
  //Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      document.location.href = "/student/student.html";

    } else {
      console.log("User not logged in")
      btnLogout.classList.add('hide');

    }
  });


}());
