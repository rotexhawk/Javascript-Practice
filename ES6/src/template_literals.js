

function upper(s) {
    return s.toUpperCase();
}


let name = 'john'; 

console.log(`My name is ${name}`);  // My name is john
console.log(`My name is ${upper(name)}`); // My name is JOHN

console.log(`This is ${upper(name)}'s party!`); // This is JOHN's party!

console.log(`This is ${ upper( `${name}'s`) } party!`); // This is JOHN'S party


function foo(strings, ...values) {
   console.log( strings );    
   console.log( values );
}

var desc = "awesome";

foo`Everything is ${desc}!`;

foo('',`Everything is ${desc}!`);

function addDollarSign(strings, ...numbers){
	console.log(strings); 
	console.log(numbers);

	var results = ''; 
	console.log(strings.length); 
	console.log(numbers.length);
	for (var i = 0; i < strings.length; i++){
		results += strings[i]
		if (numbers[i] !== undefined){
			results += '$' + numbers[i];
		}
		 
	}
	console.log(results);
}

var five = 5; 
var ten = 10; 

addDollarSign`I bought a shirt for ${five}. I paid the store ${ten} and got ${five} back.`; 

