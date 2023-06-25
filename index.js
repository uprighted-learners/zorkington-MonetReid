//Terminal readline ability

const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

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

// What will be included in each room object (name, description, inventory)
class rooms {
  constructor(name, description, inventory) {
    this.name = name;
    this.description = description;
    this.inventory = [inventory];
  }
}
// Create Object for rooms class
// There will be four rooms total this list is in order of appearance and location. The design is like a driveway to the house scenario.
let roomOne = new rooms(
  "frontDoor",
  "You are standing at the front door of the Reid family home. On the door is small piece of paper taped to the front door. It is folded over and clicking against the door from the relentless wind.",
  "letter"
);
let roomTwo = new rooms(
  "foyer",
  "You have stepped into the Reid's home and can see the downstairs foyer. It is a tidy space with a staircase to your right. When you look around you can see loaf of bread on the first step.",
  "bread"
);
let roomThree = new rooms(
  "living room",
  "You have traveled up the stairs and are standing in the living room. You can see several pictures on the wall of the Reid children playing. In the middle of the room, however, something catches your eye. It is a single stool with a giant jar of peanut butter.",
  "jar of peanut butter"
);
let roomFour = new rooms(
  "kitchen",
  "You have successfully journeyed to the best part of the house- the kitchen! Here you see your normal modern appliances and a few mason jars on the counter. There is a knife taunting you from the top of the stove.",
  "knife"
);

// key value pairs
let locationTable = {
  roomOne: roomOne,
  roomTwo: roomTwo,
  roomThree: roomThree,
  roomFour: roomFour,
};
// Create State Machine
// the flow and existence of each location. This is a process of moving from one place to the next without being in all places at once.
let stateLocation = {
  roomOne: ["roomTwo"],
  roomTwo: ["roomThree"],
  roomThree: ["roomFour"],
  roomFour: [`${process.exit}`],
};

// These are items the player may pick up in every room or carry with him from one room to the next.
class inventory {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}
// nothing for inventory
let noInventory = new inventory(
  "nothing",
  "there is nothing in your inventory"
);
//letter
let letter = new inventory(
  "letter",
  "Welcome, Just knock three time and come in!"
);
//bread
let bread = new inventory(
  "bread",
  "Please pick up the bread and bring it upstairs"
);
//peanut butter jar
let peanutButterJar = new inventory(
  "jar of peanut butter",
  "If you don't mind, bring the jar of peanut butter to the kitchen with the bread"
);
// knife
let knife = new inventory(
  "knife",
  "pick up the knife so you can make me a sandwich. I'm starving!"
);
// trades in ingredients for sandwich (makes a sandwich )
let sandwich = new inventory(
  "sandwich",
  "use all your ingredients and make a sandwich"
); // when picking up item have the rest of items be .pop

// empty because player starts with nothing until picks it up
currentInventory = "";

// Create Table Lookup
// how to shuffle through inventory
let inventoryTable = {
  "": noInventory,
  letter: letter,
  bread: bread,
  "jar of peanut butter": peanutButterJar,
  knife: knife,
  sandwich: sandwich,
};
// Create State Machine
let stateInventory = {
  noInventory: ["letter"],
  letter: ["letter, bread"],
  roomTwo: ["letter", "bread", "jar of peanut butter"],
  roomThree: ["letter", "bread", "jar of peanut butter", "knife"],
  roomFour: ["letter", "bread", "jar of peanut butter", "knife", "sandwich"],
};
// begin game.
// async because awaiting engagement from player
async function start() {
  const welcomeMessage = `431 Old County Road N.
You are standing at the front door of the Reid family home. On the door is small piece of paper taped to the front door. It is folded over and clicking against the door from the relentless wind. \n ------------------------- \n
 `;

  // Create if statement to move toward door
  //let answer = await ask(welcomeMessage);
  let answer = await ask(welcomeMessage);
  // as long as player is not asking to exit go ahead and listen for options to begin game and in this case read letter.
  // do not set for "===" because we are looking for non case sensitive answers.
  while (answer !== "exit") {
    if (
      (answer == "read letter",
      "open letter",
      "letter",
      "read note",
      "open note",
      "note")
    ) {
      // add letter to inventory
      playerInventory.push("letter");
      currentInventory = "letter";
      readLetter();
      let letterResponse = await ask(`${readLetter}`);
      // letter prompts a response to knock on door and move from one place to next
      if (letterResponse == "knock knock knock") {
        currentLocation = "roomOne";
        moveRooms("roomTwo"); // get player to move first and then add inventory functions
        secondRoom();
      } else {
        ("The door is still locked...");
        returnLetter();
      }
    } else if ((answer == "open door", "door handle", "open", "door")) {
      console.log("The door is locked");
      return ask();
      // catch in case answer is off the wall
    } else {
      console.log(`I don't know that ${answer}`);
      return ask();
    }
  }
  // function for next room
  // read description
  async function secondRoom() {
    currentLocation = "roomTwo";
    let answerTwo = await ask(
      console.log(locationTable[currentLocation].description)
    );
    // while player is not asking to exit game move on to next stage of game.
    while (answerTwo !== "exit") {
      if ((answerTwo == "bread", "pick up bread", "grab bread", "take bread")) {
        // player adds bread to inventory
        playerInventory.push("bread");
        currentInventory = "bread";
        currentLocation = "roomOne";
        // function to move rooms
        moveRooms("roomTwo"); // get player to move first and then add inventory functions
      } else if ((answer == "walk upstairs", "upstairs", "stairs")) {
        console.log("You cannot go up without helping with groceries");
        return ask();
        // catch for random answers
      } else {
        console.log(`I don't know that ${answer}`);
        return ask();
      }
    }
  }

  // Create function to move from room to room - IT WORKS
  // major function for moving
  function moveRooms(newLocation) {
    let locationTransition = stateLocation[currentLocation];
    console.log(locationTransition);
    if (locationTransition.includes(newLocation)) {
      currentLocation = newLocation;
      console.log(
        `You made it through, you are now in the ${locationTable[currentLocation].name}`
      );
      process.exit();
    } else {
      console.log(
        `You cannot go from the ${currentLocation} to the ${newLocation}`
      );
      // exit one room
      process.exit();
    }
  }

  // function to read letter
  async function readLetter() {
    console.log(inventoryTable[currentInventory].description);
    if (answer == "knock knock knock") {
    }
  }

  // exit game
  process.exit();
}
