'use strict'

var chai = require("chai");
var expect = chai.expect;
//var professor = require('../professor/professor.js');
//var professor_html = require('../professor/professor.html');
chai.should();


function checkFiresearch(subject) {
    return fireSearch(subject, 1);
}

describe('testing if fireSearch returns usable values', function(){
    it('should return true if answers are equal', function(){
        checkFiresearch('TDT4145').should.equal('TDT4145');
    });
});
