var assert = require("assert");
var expect = require("chai").expect;
 
describe('Tests', function(){
  
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
    
//  describe('#indexOf()', function(){
//    it('should be a string', function(){
//      var foo = 'test';
//      expect(foo).to.be.a('string');
//    });
//  });
    
});

