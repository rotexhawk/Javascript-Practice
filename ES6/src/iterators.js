var array = [1,2,3,4,5,6,7,8,9,10]; 

console.log('array iterator', array[Symbol.iterator]);

function isIterable(obj){
	if (obj == null){
		return false; 
	}
	return typeof obj[Symbol.iterator] === 'function';
}

console.log('Array is iterable', isIterable(array)); // true

// why not add isIterable by default. ES6 you suck sometimes. 

// This is iterable 
function People(...person){

	return{
		[Symbol.iterator]: function* (){

			while(person.length > 0){
				
				yield person.pop(); 
			}

		}
	}
}

var people = People('john','doe','alex','gustafson','johnes','bones'); 

console.log('people is iterable', isIterable(people));


// for (let value of people) {
//     console.log(value);
// }



// We get the iterator from the people. 
let iterator = people[Symbol.iterator](); 

console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());
console.log('Iterator over people', iterator.next());

// function Neanderthal(name,age){
// 	this.name = name; 
// 	this.age = age; 
// }

// Neanderthal.prototype = People; 

// var neanderthal = Neanderthal('goerge',2);

// console.log('neanderthals',neanderthal);