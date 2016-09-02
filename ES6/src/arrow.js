/**
An arrow function expression has a shorter syntax compared to function expressions and 
lexically binds the this value (does not bind its own this, arguments, super, or new.target). Arrow functions are always anonymous. 
These function expressions are best suited for non-method functions and they can not be used as constructors.
**/


var elm = document.getElementById('messageContainer'); 
var write = (f) => {elm.innerHTML += f + '<br>'};

const arr = [1,2,3,4,5,6,7,8,9,10]; 
const evens = arr.filter(v => v % 2 === 0);
const odds = arr.filter(v => v % 2 !== 0);


write(odds);

var toPower = power => power => {let n = 0; let num=1; while(n < power){ num *= power; n++} return num;}; 

var square = toPower(3); 
console.log(square(2));

// returns: undefined
// explanation: an empty block with an implicit return
((name) => {})(); 

// returns: 'Hi Jess'
// explanation: no block means implicit return
((name) => 'Hi ' + name)('Jess');

// returns: undefined
// explanation: explicit return required inside block, but is missing.
((name) => {'Hi ' + name})('Jess');

// returns: 'Hi Jess'
// explanation: explicit return in block exists
((name) => {return 'Hi ' + name})('Jess'); 

// returns: undefined
// explanation: a block containing a single label. No explicit return.
// more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
((name) => {id: name})('Jess'); 

// returns: {id: 'Jess'}
// explanation: implicit return inside expression ( ) returns object
((name) => ({id: name}))('Jess');

// returns: {id: 'Jess'}
// explanation: explicit return inside block returns object
((name) => {return {id: name}})('Jess'); 



function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();

