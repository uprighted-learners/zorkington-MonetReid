
//Terminal readline ability

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// Run the program in terminal: node index.js
//! DO NOT TOUCH CODE ABOVE 
start();
let currentLocation = "roomOne"; // show players current location
let currentInventory = ""; // player has no starting inventory
let playerInventory = [];


class rooms {
  constructor(name, description, inventory) {
      this.name = name;
      this.description = description;
      this.inventory = [inventory];
  }
  
}
// Create Object for rooms class
let roomOne = new rooms("frontDoor","You are standing at the front door of the Reid family home. On the door is small piece of paper taped to the front door. It is folded over and clicking against the door from the relentless wind.", "letter");
let roomTwo = new rooms("foyer", "blah blah blah", "bread");
let roomThree = new rooms("living room", "blah blah blah", "jar of peanut butter");
let roomFour = new rooms("kitchen", "blah blah blah", "knife");


let locationTable = {
  "roomOne" : roomOne,
  "roomTwo" : roomTwo,
  "roomThree" : roomThree,
  "roomFour": roomFour,
}
// Create State Machine
let stateLocation = {
roomOne: ["roomTwo"],
roomTwo: ["roomThree"],
roomThree: ["roomFour"],
roomFour: [`${process.exit}`],
}


class inventory{
  constructor(name, description) {
      this.name = name
      this.description = description
  }
  
}
let noInventory = new inventory("nothing", "there is nothing in your inventory")
let letter = new inventory("letter", "Welcome, Just knock three time and come in!")

let bread = new inventory("bread", "Please pick up the bread and bring it upstairs");

let peanutButterJar = new inventory("jar of peanut butter", "If you don't mind, bring the jar of peanut butter to the kitchen with the bread");

let knife = new inventory("knife", "pick up the knife so you can make me a sandwich. I'm starving!");

let sandwich = new inventory("sandwich", "use all your ingredients and make a sandwich") // when picking up item have the rest of items be .pop

currentInventory = "";

// Create Table Lookup
let inventoryTable = {
      "" : noInventory,
      "letter" : letter,
      "bread" : bread,
      "jar of peanut butter": peanutButterJar,
      "knife": knife,
      "sandwich": sandwich
}
// Create State Machine
let stateInventory = {

    noInventory: ["letter"],
    letter: ["letter, bread"],
    roomTwo: ["letter", "bread", "jar of peanut butter"],
    roomThree: ["letter", "bread", "jar of peanut butter", "knife"],
    roomFour: ["letter", "bread", "jar of peanut butter", "knife", "sandwich"],
}

async function start() {
  const welcomeMessage = `431 Old County Road N.
You are standing at the front door of the Reid family home. On the door is small piece of paper taped to the front door. It is folded over and clicking against the door from the relentless wind. \n ------------------------- \n
 `;


// Create if statement to move toward door  
//let answer = await ask(welcomeMessage);
let answer = await ask(welcomeMessage);

while (answer !== 'exit') {
  if (answer == "read letter", "open letter", "letter", "read note", "open note", "note") {
    currentLocation = roomOne
    moveRooms("roomOne"); // get player to move first and then add inventory functions
    //readLetter();
  } else if (answer == "open door", "door handle", "open", "door") {
    console.log('The door is locked')
   return ask();
  } else {console.log(`I don't know that ${answer}`) 
  return ask();} 



}



 // async function letsBegin() {
  //   let firstMove = await ask(`\n type walk`)
  //     if (firstMove == "walk forward") {
  //     currentLocation = "driveWay"
  //     moveRooms("roomOne");

  //     } else { console.log(`I don't know how to ${firstMove} `)}

  //     
  // }
  

// Create function to move from room to room - IT WORKS
function moveRooms(newLocation) {
    let locationTransition = stateLocation[currentLocation];

    if(locationTransition.includes(newLocation)) {
      currentLocation = newLocation;
      console.log(`You made it through, you are now in the ${locationTable[currentLocation].name}`);
    } else { console.log(`You cannot go from the ${currentLocation} to the ${newLocation}`)}


}



// Testing function - IT WORKS
//moveRooms("driveWay");
//moveRooms("roomOne");
//moveRooms("roomTwo");
//moveRooms("roomThree");


// Create Class for items


function pickUpInventory(newInventory) {
  let inventoryTransition = stateInventory[currentInventory];

  if(inventoryTransition.includes(newInventory)) {
    currentInventory = newInventory;
    console.log(`You picked up ${inventoryTable[currentInventory].name}`);
  } else { console.log(`You cannot pick up ${currentInventory} from ${newInventory}`)}


}
pickUpInventory();

function readLetter() {
  console.log(inventory[letter].description);
}
// Create array for player
// create function of picking up dropping inventory (while? conditional?)


// when player calls "pick up []" create code that .push item into array... if they say "drop item" create code to .pop item.


process.exit();

}