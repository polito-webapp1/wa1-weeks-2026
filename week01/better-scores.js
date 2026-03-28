"use strict";

/*
# Exercise Basic-1: Better Scores
_Goal: basic handling of JavaScript arrays_

Develop a small JavaScript program to manage the scores given to your user on website. Scores are integer numbers, and they may be negative. You should:

- Define an array with all the scores you received in chronological order. For simplicity:
  - Embed the scores directly in the source code.
- Duplicate the array, but:
  - Eliminate all negative scores (call `NN` the number of negative scores that are deleted).
  - Eliminate the two lowest-ranking scores.
  - Add `NN+2` new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
- Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.
*/

const scores = [3, -2, 10, 0, -5, -8, 7, 4, -1, 9, 6];

const newscores = [];

// count negative scores
let NN = 0;
for (const value of scores) {
  if (value < 0) {
    NN++;
  }
}

// copy only non-negative scores
for (const value of scores) {
  if (value >= 0) {
    newscores.push(value);
  }
}

// remove the two smallest scores
for (const c of [1, 2]) {
  const smallest = Math.min(...newscores);
  const pos_smallest = newscores.indexOf(smallest);
  console.log("Smallest", smallest, "at position", pos_smallest);
  console.log(`The smallest value is ${smallest} and is at position ${pos_smallest}`);
  newscores.splice(pos_smallest, 1);
}

// compute average of improved scores before adding new values
let avg = 0.0;
for (const value of newscores) {
  avg += value;
}
avg /= newscores.length;
avg = Math.round(avg);

console.log("Rounded average before adding new scores:", avg);

// add NN + 2 new scores
for (let i = 0; i < NN + 2; i++) {
  newscores.push(avg);
}

// compute original average
let avgOriginal = 0.0;
for (const value of scores) {
  avgOriginal += value;
}
avgOriginal /= scores.length;
avgOriginal = Math.round(avgOriginal);

// compute final improved average
let avgImproved = 0.0;
for (const value of newscores) {
  avgImproved += value;
}
avgImproved /= newscores.length;
avgImproved = Math.round(avgImproved);

// print results
console.log("NN =", NN);
console.log("Original scores:", scores);
console.log("Original average:", avgOriginal);
console.log("Improved scores:", newscores);
console.log("Improved average:", avgImproved);
