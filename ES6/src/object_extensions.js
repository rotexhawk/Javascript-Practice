/**

Notes: 

Consice method creates anonymous function i.e printName = function(){} , Can't call itself, can use this.printName to call itself 
but can be a problem with event handler binding etc. so only use if you are sure there won't be any self call and event binding, 
otherwise stick to the good old printName: function printName(){}

super is only allowed in concise methods, not regularfunction expression properties. 
It also is only allowed in super.XXXform (for property/method access), not in super() form.

**/

/**

1. Consise Method 
2. Named Property 
3. __.proto__ 
4. super()
**/

var name = "John"; 
var age = 12; 
var count = 5; 
var postfix = 'Age';

var obj = {
	danger:true, 
	printName(){
		console.log('Hello I am an abject')
	}
};


var person = {
	name, 
	age, 
	count,
	postfix,
	__proto__: obj, // is there just for compatibilty reasons. Don't use. Doesn't set the actual prototype. 
	printName(){
		super.printName(); 
		console.log(this.name); 
		this.count--; 
		while(this.count){
			this.printName(); // can't do printName, since it will be compiled to anon func. gotta say this.printName but will create issue with binding handlers
		}
	},

	[ 'print' + postfix ]: function(){
		console.log(this.age);
	}
};

Object.setPrototypeOf(person, obj);

person.printName(); 
     person.printAge();
console.log(person.isPrototypeOf(obj)); // false  __proto__ is getter/setter 


