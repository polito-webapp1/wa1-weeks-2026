"use strict" ;

/*
# Exercise Basic-1: Better Scores
_Goal: basic handling of JavaScript arrays_

Develop a small JavaScript program to manage the scores given to your user on website . Scores are integer numbers, and they may be negative. You should:
 
- Define an array with all the scores you received in chronological order. For simplicity:
  - Embed the scores directly in the source code.
- Duplicate the array, but:
  - Eliminate all negative scores (call \`NN\` the number of negative scores that are deleted).
  - Eliminate the two lowest-ranking scores.
  - Add `NN+2` new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
- Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.
*/


const scores = [3, -2, 10, 0, -5, 7, 4, -1, 9, 6] ;
console.log("Starting vector:", scores)

/* remove negative number (difficult to manage)

const newScores = [...scores] // make a copy for keep scores safe

for ( let i=0; i<newScores.length; i++ ) {
  const value = newScores[i]
  if (value<0) {
    newScores.splice(i, 1)
  }
}
*/

// add positive numbers to a new array
const newScores = []

for (const value of scores) {
  if (value >= 0) {
    newScores.push(value)
  }
}
console.log("Vector without negatives:", newScores)

// remove lowest two
let smallest = Math.min(...newScores)
let pos_smallest = newScores.indexOf(smallest)
console.log("First smallest:", smallest, ", at position:", pos_smallest)
newScores.splice(pos_smallest, 1)

smallest = Math.min(...newScores)
pos_smallest = newScores.indexOf(smallest)
console.log("Second smallest:", smallest, ", at position:", pos_smallest)
newScores.splice(pos_smallest, 1)

// alternatevely with
// for (const c of [1,2]) ...

// calculating avg
let avg = 0.0
for (const value of newScores) {
  avg += value
}
avg /= newScores.length
avg = Math.round(avg)
console.log("AVG:",avg)

while (newScores.length < scores.length) {
  newScores.push(avg)
}

console.log("Final vector:", newScores)
