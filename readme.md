## EDIT CONFIG.JSON to the new API values
// add endpoint without ending slash
// add the xApiKey param
## comment out unneeded steps from the scenario
## Edit the register user method
// change endpoint to user
// check what object we need to send
## Update the json schema object
## Update the generate request body method
## update the config file with name/surname/password
## update the request method to contain the x-api-key header
## update the expected status code for the request

## Mocha -test librabry
## Mochawsome - reporting
## Supertest - for executing HTTP Requests
## Chai - assertions
## Get-nested-values - to extract values from nested json objects


## JS Examples
// Variables / types
let myName = "mairis"
console.log(myName)
myName = "new name"
console.log(myName)
console.log("current value is: " + myName)
console.log(`current value is: ${myName}`)
myName = true
console.log(myName)
console.log(typeof myName)

//arrays/objects
let myArr = [1, 2, 3, 4]
console.log(myArr)
console.log(myArr[3])
let myObj = {name: "Mairis", age: 27, location: "Riga"}
console.log(myObj)
console.log(myObj.name)
console.log(myObj['location'])

// Comparison
let comparisonResult;
if(4+7 > 10){ // mby add logical comparisols also, like || and &&
  comparisonResult = true
} else {
  comparisonResult = false
}
console.log(comparisonResult)

let comparisonResult2 = 4+7>10 ? true : false;
console.log(comparisonResult2)

console.log(2 == '2')
console.log(2 === '2')


// Loops
for (let i=0; i<2; i++){
  console.log("still for-looping")
}

let j=0;
while (j < 2) {
  console.log("still while-looping");
  j++;
}


// Functions
function myFunction(){
  return "This is my regular function"
}
console.log(myFunction())

let arrowFunction = () => {
  return "This is my arrow function"
}
console.log(arrowFunction())

// Error handling
try {
   nonExistentFunction();
} catch (error){
  console.log("Error handled here")
  console.log(error.message)
}

