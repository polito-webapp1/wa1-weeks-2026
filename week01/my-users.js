"use strict";

/*
# Exercise Basic-2: My Users' List
_Goal: basic handling of JavaScript strings_
*/

//
// split the string into the individual names
//
const names = "Luigi De Russis, Francesca Russo, Fulvio Corno, Luca Scibetta, Alberto Monge Roffarello";
const list_names = names.split(',');

//
// remove extra spaces from beginning/end of each name
//
const list_2 = [];
for (const name of list_names) {
  list_2.push(name.trim());
}

//
// create a list with acronyms
//
const acronyms = [];

for (const name of list_2) {
  let components = name.split(' '); // split name into parts

  let first_letters = "";

  for (const each of components) {
    first_letters += each[0];
  }

  first_letters = first_letters.toUpperCase();
  acronyms.push(first_letters);
}

//
// combine names + acronyms (برای مرتب‌سازی درست)
//
const result = [];

for (let i = 0; i < list_2.length; i++) {
  result.push({
    name: list_2[i],
    acronym: acronyms[i]
  });
}

//
// sort by acronym
//
result.sort((a, b) => {
  return a.acronym.localeCompare(b.acronym);
});

//
// print final result
//
for (const user of result) {
  console.log(user.acronym + " - " + user.name);
}
