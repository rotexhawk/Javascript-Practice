var assert = require('assert');
var calc = require('../index.js');


describe('Calculator', function(){
  describe('Module calc', function(){
    it('should have a calculate Method', function(){
      assert.equal(typeof calc, 'object');
      assert.equal(typeof calc.calculate, 'function');
    });

    it('isNumber("2") should equal true', function(){
    	assert.equal(calc.isNumber('2'), true);
    });

    it ('isNumber("a") should equal false', function(){
    	assert.equal(calc.isNumber('a'), false);
    });

    it('addToOperationsArray(1) should return 1', function(){
    	calc.addToOperationsArray(1); 
    	assert.equal(calc.array.length, 1);
    });

    it('addToOperationsArray("+") should return 2', function(){
    	calc.addToOperationsArray("+"); 
    	assert.equal(calc.array.length,2);
    	calc.clearEverything();
    });

    it('addToOperationsArray("+") before any number should return 0', function(){
    	calc.addToOperationsArray("+"); 
    	assert.equal(calc.array.length, 0);
    	calc.clearEverything();
    });

    it('addToOperationsArray("1+") before should return 0 because 1+ is Nan', function(){
    	calc.addToOperationsArray('1+');
    	assert.equal(calc.array.length,0);
    	calc.clearEverything();
    });




  });
});  