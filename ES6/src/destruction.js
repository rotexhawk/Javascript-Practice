/**
Destructuring: Everything is flipped so 
var {x:bam} = function(){return {x:1};} this creates a variable bam and assigns the value of x to it. 
so skips the x: part of the assignmnet. 
x: bam means the x property is the source value and bam is the target variable to assign to.
In the following scenario destructuring performs gather (rest) operation.
var arr = [1,2,3,4]; 
var [first,...rest] = arr; 
console.log(first,rest)/ (1,2,3,4);
**/

var person = {name:'John',age:24}; 

let {name,age} = person; 



console.log('Destrured', name); 
console.log('Destrured', age); 

function bar(){
	return [1,2,3];
}

let [x,y,z] = bar(); // array destructuring. 

console.log('Destrured', x); 
console.log('Destrured', y); 
console.log('Destrured', z); 

function baz(){
	return{
		x:'this is the x value',
		y:'this is the y value',
		z:'this is the z value'
	};
}

let {x:bam, y:bap, z:booz} = baz(); 
console.log(bam); 
console.log(bap);
console.log(booz); 

var arr = [1,2,3,4]; 
var [first,...rest] = arr; 
console.log(first, rest);