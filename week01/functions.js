"use strict" ;

function square ( x ) {
    return x * x ;
}

const third = function third(a) {
    return a * square(a)
}

const fourth = (base)  => { return square(square(base)) }

const wwwww = square

const y = 7 
const y2 = square(y)
const y3 = third(y)
const y4 = fourth(y)
console.log(y, y2, y3, y4)

function table_of_powers( base, power_fn ) {
    for(let i=1; i<=10; i++) {
        const power = power_fn(base)
        console.log(i, power)
    }
}

table_of_powers(5, fourth)

table_of_powers(11, (x)=>{return Math.sqrt(x)})
table_of_powers(11, x => Math.sqrt(x))

const person_1 = {
    first_name : 'Fulvio',
    last_name : 'Corno',
    address: {
        city: 'Turin',
        street: 'Corso Duca degli Abruzzi',
        number: 24,
        post_code: 10129
    },
    print_address : function() { 
        // note: due to a "strange" behavior of the keyword 'this', it usage is applicable
        // only if the function property is defined with the 'function' keyword and not
        // as an arrow function (this was the bug we had in class) 
        // more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
        console.log(this.address.street + " " + this.address.city)
    }
}

console.log(person_1)
person_1.print_address()


// Let's do the same with a Constructor Function.
// Rules:
// 1. the name of the function must be capitalized
// 2. the function should initialize the fields of the object 'this' (automatically created as an empty object)
// 3. no return statement
// 4. the function must be called with the 'new' keyword (that actually creates 'this')

function Person(name, last, city, street, number, postcode) {
    this.first_name = name
    this.last_name = last
    this.address = {
        street: street,
        city : city,
        number : number,
        postcode, postcode
    }

    this.print_address = () => {
        const a = this.address
        console.log(`${a.street} ${a.number}, ${a.postcode} ${a.city}`)
    }

}

const person_1b = new Person("Fulvio", "Corno", "Turin", "Duca degli Abruzzi", 24, 10129)

console.log(person_1b)
person_1b.print_address()

console.log()