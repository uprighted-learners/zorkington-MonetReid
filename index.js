
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
let currentInventory = []; // player has no starting inventory
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
let roomTwo = new rooms("foyer", "You have stepped into the Reid's home and can see the downstairs foyer. It is a tidy space with a staircase to your right. When you look around you can see loaf of bread on the first step.", "bread");
let roomThree = new rooms("living room", "You have traveled up the stairs and are standing in the living room. You can see several pictures on the wall of the Reid children playing. In the middle of the room, however, something catches your eye. It is a single stool with a giant jar of peanut butter.", "jar of peanut butter");
let roomFour = new rooms("kitchen", "You have successfully journeyed to the best part of the house- the kitchen! Here you see your normal modern appliances and a few mason jars on the counter. There is a knife taunting you from the top of the stove.", "knife");


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
    playerInventory.push("letter");
    currentInventory = "letter";
    readLetter();
    let letterResponse = await ask(`${readLetter}`)
    if (letterResponse == "knock knock knock") {
    currentLocation = "roomOne"
    moveRooms("roomTwo"); // get player to move first and then add inventory functions 
    secondRoom(); 
    } else { "The door is still locked..."
    returnLetter();}
  } else if (answer == "open door", "door handle", "open", "door") {
    console.log('The door is locked')
   return ask();
  } else {console.log(`I don't know that ${answer}`) 
  return ask();} 
}

async function secondRoom() {
currentLocation = "roomTwo"
let answerTwo = await ask(console.log(locationTable[currentLocation].description))

while (answerTwo !== 'exit') {
  if (answerTwo == "bread", "pick up bread", "grab bread", "take bread") {
    playerInventory.push("bread");
    currentInventory = "bread";
    let letterResponse = await ask(`You have picked up the bread and can go upstairs. Thanks for helping out.`)
    currentLocation = "roomOne"
    moveRooms("roomTwo"); // get player to move first and then add inventory functions 
    //thirdRoom(); 
  } else if (answer == "walk upstairs", "upstairs", "stairs") {
    console.log('You cannot go up without helping with groceries')
   return ask();
  } else {console.log(`I don't know that ${answer}`) 
  return ask();} 
}
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
    console.log(locationTransition);
    if(locationTransition.includes(newLocation)) {
      currentLocation = newLocation;
      console.log(`You made it through, you are now in the ${locationTable[currentLocation].name}`);
      process.exit();
    } else { console.log(`You cannot go from the ${currentLocation} to the ${newLocation}`)
    
    process.exit();
    secondRoom();
  }


}



// Create Class for items

// Create function to pick up inventory
function pickUpInventory(newInventory) {
  let inventoryTransition = stateInventory[currentInventory];

  if(inventoryTransition.includes(newInventory)) {
    currentInventory = newInventory;
    console.log(`You picked up ${inventoryTable[currentInventory].name}`);
  } else { console.log(`You cannot pick up ${currentInventory} from ${newInventory}`)}


}


async function readLetter() {
  console.log(inventoryTable[currentInventory].description);
  if (answer == "knock knock knock") {

  }
  
}
// Create array for player
// create function of picking up dropping inventory (while? conditional?)


// when player calls "pick up []" create code that .push item into array... if they say "drop item" create code to .pop item.


process.exit();

}