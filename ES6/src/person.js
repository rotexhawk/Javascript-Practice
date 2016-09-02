class Shape{
	constructor(x,y){
		this.x = x;
		this.y = y; 
	}

	moveTo(x,y){
		this.x += x; 
		this.y += y; 
	}
}

class Circle extends Shape{
	constructor(x,y,r){
		super(x,y); 
		this.r = r; 
	}

	radius(){
		return Math.PI * 2 * this.r;
	}
}

const circ = new Circle(2,2,2); 
circ.moveTo(3, 4); 
console.log(circ.radius());