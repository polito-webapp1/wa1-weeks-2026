"use strict";

const person_1 = {
    first_name : 'Fulvio',
    last_name : 'Corno',
    city : 'Turin',
    'work city' : 'Turin',
    address: {
        city: 'Turin',
        street: 'Corso Duca degli Abruzzi',
        number: 24,
        post_code: 10129
    }
}

const person_2 = {
    first_name : 'Francesca',
    last_name : 'Russo',
    city: ''
}

person_2.age = 'unknown'

console.log(person_1)
console.log(person_2)



const names = person_1.first_name + " " + person_2.first_name
const city1 = person_1.city ?? "Rome"
const city2 = person_2.city ?? "Rome"
// nullish coalescing operator (checks if the 1st argument is null
// or undefined -- not for 0 or '')
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing


const wc = person_1['work city']

const my_city_1 = person_1.address.city
const my_city_2 = person_2?.address?.city
// Optional Chaining operator - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

const person_1_copy = { ...person_1 }  // copy of an object
const person_1_copy_a = { ...person_1, city:'Paris' } // overrive a property value with an updated value (or create if it's missing)
const person_1_copy_b = { city:'Paris', ...person_1 } // default value, if the property is NOT defined in object


// person_1_copy = {}
// person_1_copy.first_name = person_1.first_name
// person_1_copy.address = person_1.address


person_1_copy.city = 'Rome'
person_1_copy.address.city ='New York'

const phonebook = {}  // object as an associaive array

// Note: for more serious associative data structures, use Map objects:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

phonebook['Fulvio'] = 1234
phonebook['Francesca'] = 9999


console.log(Object.keys(phonebook))


console.log()