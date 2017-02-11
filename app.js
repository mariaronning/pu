(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAOktHQG97dD-ZYrjiD6huBaHLo0zN64M",
    authDomain: "feedbot-7494b.firebaseapp.com",
    databaseURL: "https://feedbot-7494b.firebaseio.com",
    storageBucket: "feedbot-7494b.appspot.com",
    messagingSenderId: "116761792974"
  };
  firebase.initializeApp(config);

  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");

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
      document.location.href = "/studentFrontpage/frontpage.html";

    } else {
      console.log("User not logged in")
      btnLogout.classList.add('hide');

    }
  });


}());
