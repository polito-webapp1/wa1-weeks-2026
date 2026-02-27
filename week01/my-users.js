
"use strict" ;

/*
# Exercise Basic-2: My Users' List
_Goal: basic handling of JavaScript strings_

Develop a small JS program to manage the list of users in a website.

- Define the names of users as a comma-separated list.
  - For instance: `"Luigi De Russis, Francesca Russo, Fulvio Corno, Luca Scibetta, Alberto Monge Roffarello"`.
- Parse the string and create an array containing one name per array position.
  - Beware: no extra spaces should be present.
- Create a second array by computing the acronyms of the people as the initial letters of the name. Acronyms should be in all-capital letters.
  - For example, `Luigi De Russis` -> `LDR`.
- Print the resulting list of acronyms and the full names.
  - Extra: in alphabetical order of acronym.
*/

const names = "Luigi De Russis, Francesca Russo, Fulvio Corno, Luca Scibetta, Alberto Monge Roffarello" ;
console.log(`Names: ${names}`)

const list_names = names.split(",")

for (let i=0; i < list_names.length; i++) {
  list_names[i] = list_names[i].trim()
}
console.log("List of names:",list_names)

/* alternatively
const list_2 = []
for (const name of list_names) {
  list_2.push(name.trim())
}
*/

const list_acr = []
for (const name of list_names) {
  const name_parts = name.split(" ")
  const name_letters = []
  for (const part of name_parts) {
    const first = part.substring(0,1)
    name_letters.push(first)
  }
  const letters = name_letters.join("")
  list_acr.push(letters)
}

console.log("List of acronyms:",list_acr)

// extra
const list_acr_ord = list_acr.sort()
console.log(`Ordered list of acronyms (with different type of print): ${list_acr_ord}`)

