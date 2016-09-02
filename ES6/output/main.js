'use strict';

/**
An arrow function expression has a shorter syntax compared to function expressions and 
lexically binds the this value (does not bind its own this, arguments, super, or new.target). Arrow functions are always anonymous. 
These function expressions are best suited for non-method functions and they can not be used as constructors.
**/

var elm = document.getElementById('messageContainer');
var write = function write(f) {
  elm.innerHTML += f + '<br>';
};

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var evens = arr.filter(function (v) {
  return v % 2 === 0;
});
var odds = arr.filter(function (v) {
  return v % 2 !== 0;
});

write(odds);

var toPower = function toPower(power) {
  return function (power) {
    var n = 0;var num = 1;while (n < power) {
      num *= power;n++;
    }return num;
  };
};

var square = toPower(3);
console.log(square(2));

// returns: undefined
// explanation: an empty block with an implicit return
(function (name) {})();

// returns: 'Hi Jess'
// explanation: no block means implicit return
(function (name) {
  return 'Hi ' + name;
})('Jess');

// returns: undefined
// explanation: explicit return required inside block, but is missing.
(function (name) {
  'Hi ' + name;
})('Jess');

// returns: 'Hi Jess'
// explanation: explicit return in block exists
(function (name) {
  return 'Hi ' + name;
})('Jess');

// returns: undefined
// explanation: a block containing a single label. No explicit return.
// more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
(function (name) {
  id: name;
})('Jess');

// returns: {id: 'Jess'}
// explanation: implicit return inside expression ( ) returns object
(function (name) {
  return { id: name };
})('Jess');

// returns: {id: 'Jess'}
// explanation: explicit return inside block returns object
(function (name) {
  return { id: name };
})('Jess');

function Person() {
  var _this = this;

  this.age = 0;

  setInterval(function () {
    _this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var person = { name: 'John', age: 24 };

var name = person.name;
var age = person.age;


console.log('Destrured', name);
console.log('Destrured', age);

function bar() {
	return [1, 2, 3];
}

var _bar = bar();

var _bar2 = _slicedToArray(_bar, 3);

var x = _bar2[0];
var y = _bar2[1];
var z = _bar2[2]; // array destructuring. 

console.log('Destrured', x);
console.log('Destrured', y);
console.log('Destrured', z);

function baz() {
	return {
		x: 'this is the x value',
		y: 'this is the y value',
		z: 'this is the z value'
	};
}

var _baz = baz();

var bam = _baz.x;
var bap = _baz.y;
var booz = _baz.z;

console.log(bam);
console.log(bap);
console.log(booz);

var arr = [1, 2, 3, 4];
var first = arr[0];
var rest = arr.slice(1);

console.log(first, rest);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('array iterator', array[Symbol.iterator]);

function isIterable(obj) {
	if (obj == null) {
		return false;
	}
	return typeof obj[Symbol.iterator] === 'function';
}

console.log('Array is iterable', isIterable(array)); // true

// why not add isIterable by default. ES6 you suck sometimes. 

// This is iterable 
function People() {
	for (var _len = arguments.length, person = Array(_len), _key = 0; _key < _len; _key++) {
		person[_key] = arguments[_key];
	}

	return _defineProperty({}, Symbol.iterator, regeneratorRuntime.mark(function _callee() {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(person.length > 0)) {
							_context.next = 5;
							break;
						}

						_context.next = 3;
						return person.pop();

					case 3:
						_context.next = 0;
						break;

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));
}

var people = People('john', 'doe', 'alex', 'gustafson', 'johnes', 'bones');

console.log('people is iterable', isIterable(people));

// for (let value of people) {
//     console.log(value);
// }


// We get the iterator from the people. 
var iterator = people[Symbol.iterator]();

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
'use strict';

var _obj;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
	danger: true,
	printName: function printName() {
		console.log('Hello I am an abject');
	}
};

var person = _obj = _defineProperty({
	name: name,
	age: age,
	count: count,
	postfix: postfix,
	__proto__: obj, // is there just for compatibilty reasons. Don't use. Doesn't set the actual prototype. 
	printName: function printName() {
		_get(_obj.__proto__ || Object.getPrototypeOf(_obj), 'printName', this).call(this);
		console.log(this.name);
		this.count--;
		while (this.count) {
			this.printName(); // can't do printName, since it will be compiled to anon func. gotta say this.printName but will create issue with binding handlers
		}
	}
}, 'print' + postfix, function () {
	console.log(this.age);
});

Object.setPrototypeOf(person, obj);

person.printName();
person.printAge();
console.log(person.isPrototypeOf(obj)); // false  __proto__ is getter/setter
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function () {
	function Shape(x, y) {
		_classCallCheck(this, Shape);

		this.x = x;
		this.y = y;
	}

	_createClass(Shape, [{
		key: "moveTo",
		value: function moveTo(x, y) {
			this.x += x;
			this.y += y;
		}
	}]);

	return Shape;
}();

var Circle = function (_Shape) {
	_inherits(Circle, _Shape);

	function Circle(x, y, r) {
		_classCallCheck(this, Circle);

		var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, x, y));

		_this.r = r;
		return _this;
	}

	_createClass(Circle, [{
		key: "radius",
		value: function radius() {
			return Math.PI * 2 * this.r;
		}
	}]);

	return Circle;
}(Shape);

var circ = new Circle(2, 2, 2);
circ.moveTo(3, 4);
console.log(circ.radius());
'use strict';

var _marked = [range].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
...[1,2,3] in front of any iterables spreads it out into individual values  
function(...args) gives the rest of the arguments as an array. 
**/

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var b = ['a', 'b', 'c'].concat(a, ['d', 'e', 'f']); // concat

function print(a, b, c, d, e) {
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(d);
	console.log(e);
}

// print(...a); // print.apply(undefined, a);
// console.log(b);


function printAll() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	args.forEach(function (i) {
		console.log(i);
	});
}

printAll.apply(undefined, _toConsumableArray(b));

function printNameAge() {
	var name = arguments.length <= 0 || arguments[0] === undefined ? "Name" : arguments[0];
	var age = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

	console.log(name);
	console.log(age);
}

printNameAge('yasin', 25);
printNameAge('ali');
// printNameAge(,30); error
printNameAge('', 23); // prints '' 24
printNameAge(null, 24); // prints null 24. Default parameters only checks for undefined. 
printNameAge(undefined, 24); // Name 24 
printNameAge();

function range(start, end) {
	return regeneratorRuntime.wrap(function range$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					if (!(start < end)) {
						_context.next = 6;
						break;
					}

					_context.next = 3;
					return start;

				case 3:
					start++;
					_context.next = 0;
					break;

				case 6:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}

var iterator = range(1, 10);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = iterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var value = _step.value;

		console.log(value);
	}

	// let item; 
	// while (item = iterator.next(), !item.done) {
	//   console.log( item.value );
	// }
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}
'use strict';

var _templateObject = _taggedTemplateLiteral(['Everything is ', '!'], ['Everything is ', '!']),
    _templateObject2 = _taggedTemplateLiteral(['I bought a shirt for ', '. I paid the store ', ' and got ', ' back.'], ['I bought a shirt for ', '. I paid the store ', ' and got ', ' back.']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function upper(s) {
	return s.toUpperCase();
}

var name = 'john';

console.log('My name is ' + name); // My name is john
console.log('My name is ' + upper(name)); // My name is JOHN

console.log('This is ' + upper(name) + '\'s party!'); // This is JOHN's party!

console.log('This is ' + upper(name + '\'s') + ' party!'); // This is JOHN'S party


function foo(strings) {
	console.log(strings);

	for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		values[_key - 1] = arguments[_key];
	}

	console.log(values);
}

var desc = "awesome";

foo(_templateObject, desc);

foo('', 'Everything is ' + desc + '!');

function addDollarSign(strings) {
	console.log(strings);

	for (var _len2 = arguments.length, numbers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		numbers[_key2 - 1] = arguments[_key2];
	}

	console.log(numbers);

	var results = '';
	console.log(strings.length);
	console.log(numbers.length);
	for (var i = 0; i < strings.length; i++) {
		results += strings[i];
		if (numbers[i] !== undefined) {
			results += '$' + numbers[i];
		}
	}
	console.log(results);
}

var five = 5;
var ten = 10;

addDollarSign(_templateObject2, five, ten, five);
