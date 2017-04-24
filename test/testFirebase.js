var expect = require('chai').expect;
var jsdom = require('jsdom');
var fs = require('fs');
var spy = require('sinon').spy;
var firebase = require('firebase');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAOktHQG97dD-ZYrjiD6huBaHLo0zN64M",
    authDomain: "feedbot-7494b.firebaseapp.com",
    databaseURL: "https://feedbot-7494b.firebaseio.com",
    storageBucket: "feedbot-7494b.appspot.com",
    messagingSenderId: "116761792974"
};
firebase.initializeApp(config);


describe('index.html', ()=>{
  it('should have h1 that says Users', (done)=>{
    //const index = fs.readFileSync('student/student.html', "utf-8");
    jsdom.env('https://feedbot-7494b.firebaseapp.com', function(err, window){
      if(err){
        console.log(err);
      }
      else{
        const h1 = window.document.getElementById('btnLogin');
        expect(h1.innerHTML).to.equal(" Log in ");
        done();
        window.close();
      }
    })
  })
})
