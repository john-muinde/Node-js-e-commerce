// // const fs = require('fs');
// // fs.writeFileSync('hello.txt','Hello from Node js');

// // const addRandom = () => 1+2;

// const person = {
//     name: 'Max',
//     age: 20,
//     greet() {
//         console.log('Hey I am '+ this.name)
//     }
// };

// const printName = ({ name }) => console.log(name);
// printName(person);

// const { name, age} = person;
// console.log(name , age);

// // person.greet()
// const hobbies = ['Swimming','Dancing']

// const [hobby1 , hobby2] = hobbies
// console.log(hobby1, hobby2);





// // hobbies.forEach(hobby => {
// //     console.log(hobby);
// // });
// // console.log(hobbies.map(
// //     hobby => 'Hobby: ' + hobbies.indexOf(hobby)
// // ));

// // const copiedArr = hobbies.slice();
// // const copiedArr = [...hobbies]; spread operator
// // const copiedArr = hobbies;
// // const copiedArr = `${hobbies}`;

// // const toArray = (...args) =>{
// //     return args;
// // }
// // console.log(toArray(1,2,3,5,3,5,56,34));



setTimeout(()=>{
    console.log("Timer is done");
    fetchData()
       .then(text => {
        console.log(text);
          return fetchData();
       })
       .then(text2 =>{
        console.log(text2);
       })
},1500)


const fetchData = () =>{
    const promise = new Promise((resolve , reject) => {
        setTimeout(()=>{
            resolve("Done");
        },1500)
    });
    return promise;
};
console.log("Hello");
console.log("Hi");
