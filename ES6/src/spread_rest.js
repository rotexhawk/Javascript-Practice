/**
...[1,2,3] in front of any iterables spreads it out into individual values  
function(...args) gives the rest of the arguments as an array. 
**/

var a = [1,2,3,4,5,6,7,8,9]; 
var b = ['a','b','c',...a,'d','e','f']; // concat

function print(a,b,c,d,e){
	console.log(a); 
	console.log(b); 
	console.log(c); 
	console.log(d); 
	console.log(e); 
}

// print(...a); // print.apply(undefined, a);
// console.log(b);


function printAll(...args){
	args.forEach(i => {console.log(i)});
}

printAll(...b);

function printNameAge(name = "Name", age=2){
	console.log(name); 
	console.log(age); 
}

printNameAge('yasin',25); 
printNameAge('ali'); 
// printNameAge(,30); error
printNameAge('', 23); // prints '' 24
printNameAge(null,24); // prints null 24. Default parameters only checks for undefined. 
printNameAge(undefined,24); // Name 24 
printNameAge();


function *range(start,end){
	
	while(start < end){
		yield start; 
		start++
	}
}

var iterator = range(1,10); 

for (let value of iterator) {
    console.log(value);
}

// let item; 
// while (item = iterator.next(), !item.done) {
//   console.log( item.value );
// }

