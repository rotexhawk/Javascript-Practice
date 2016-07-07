/**
*  Javascript Calculator
*  Author: Yasin Yaqoobi
*  Project Goal: Utilize Event propogation and Object Creation. Shhh Eval is your friend this time!
*  Be careful! There is no security check for eval. 
**/


document.ready = function(){

var calculator = document.getElementById('calculator');
var screen = document.getElementById('screen'); 

calculator.addEventListener('click', function(event){
	if (event.target.nodeName == 'LI'){  // list item was clicked
		process(event);
	}
	
}); 

function process(event){
	var str = event.target.textContent //  Get the text from the li element clicked.

	calc.addToOperationsArray(str); // Add it to operations array that will be computed when equal is hit. 
	
	if (str == '='){ // equals operation found so process Everthing
		calc.array.pop() // pop the last array element because it is the equal sign. Throws error with eval.
		var results = calc.calculate(); // calculate everything and give me the results.
		screen.innerHTML = results;
		return;
	}

	if (str == 'AC'){
		calc.clearEverything(); // AC button is clicked so removed everything from the calculator
		screen.innerHTML = '';
		return;
	}

	screen.innerHTML += str; 

}

function Calculator(){
	this.array = [];
	this.results = 0;
}
Calculator.prototype = {

	calculate: function(){	
		try{
		results = eval(this.array.join(''));
		this.array = [results];
		return results; 
		}
		catch(error){
			alert('Wrong arguments provided');
			return this.array.join('');
		}
	},

	isNumber: function(str){
		return !isNaN(parseFloat(str)) && isFinite(str);
	},

	addToOperationsArray: function(str){
		if (this.array.length <= 0 && !this.isNumber(str)){ // Don't add operand before any number.
			return; 
		}
		
		this.array.push(str);
		
	},
	clearEverything: function(){
		this.array = [];
	}
};

var calc = new Calculator(); 

document.addEventListener('keydown',function(event){
	
	if (event.keyCode === 8 && event.target.id != 'screen'){ // backspace is pressed so remove one from calc; 
		event.preventDefault(); 
		calc.array.pop();
		screen.innerHTML = calc.array.join('');
	}
});

screen.addEventListener('keyup',function(event){
	calc.array = this.innerHTML.split(''); 
});


}();





