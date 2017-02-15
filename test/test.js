
'use strict'

var chai = require("chai");
var expect = chai.expect;

chai.should();

function returnsName(name) {
  return name;
}

describe("Employee", e => {

});
describe("Salary", function(params) {
  it('returns name passed to the function', function(){
    returnsName("May".should.equal("May"));
  });
});
