

var $ = require('../bower_components/jquery/dist/jquery.min.js');
var assert = require('assert');
var student = require('../student/student.js');
var studentDOM = require('../student/student.html');
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




describe('Array', function() {
    it('should return -1 when the value is not present', function() {
        console.log(stundet.checkAnswerCheckbox().length);

    });
});
