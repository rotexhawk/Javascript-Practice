const arr = [1,2,3,4,5,6,7,8,9,10]; 

const evens = arr.filter(v => v % 2 === 0);
const odds = arr.filter(v => v % 2 !== 0);

console.log(evens);
console.log(odds);