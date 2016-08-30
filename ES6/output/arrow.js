"use strict";

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var evens = arr.filter(function (v) {
  return v % 2 === 0;
});
var odds = arr.filter(function (v) {
  return v % 2 !== 0;
});

console.log(evens);
console.log(odds);