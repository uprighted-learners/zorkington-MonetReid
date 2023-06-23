class location {
    constructor(name, description) {
        this.name = name
        this.description = description
    }
    
}
//let location = home;
//let newLocation;

let home = new location("Home Sweet Home", "Left of sideWalk");
//console.log(home);
//let home = {
//    name : "Home Sweet Home",
//    description : "Left of sideWalk",   
//     }
let sideWalk = {
    name : "the sidewalk",
    description : "center",
}
let store = {
    name : "Shaws",
    description: "Right of sideWalk"

}

let locationCurrent = "home";
let locationLookUp =  {
        "home" : home,
        "sideWalk": sideWalk,
        "store": store,
    }

//return locationLookUp[locationCurrent];


let locationStates = {
    home: ["sideWalk"],
    sideWalk: ["home", "store"],
    store: ["sideWalk"]

}

console.log(`You're at ${locationCurrent}`)

// function movePlayer(location, )

function moveLocation(newLocation) {
    
    let locationTransition = locationStates[locationCurrent];
    //let newLocation;

    //if (locationTransition.includes(moveLocation[0])) - still undefined.
    if (locationTransition.includes(newLocation)) {
        locationCurrent = newLocation;
        console.log(`You're at ${locationLookUp[locationCurrent].name}`);
        //console.log(`You are ${locationCurrent}`)
    } else { console.log(`You cannot go from ${locationCurrent} to ${newLocation}`)}
  
  }

moveLocation("sideWalk");
// Prints 'You are on the sideWalk.'
moveLocation("store");
// Prints 'You are in the store.'
moveLocation("sideWalk");
// Prints 'You are on the sideWalk.'
moveLocation("home");
// Prints 'You are at your house.'

moveLocation("park");
// Prints 'You cannot go from sideWalk to park.'


//player should be assigned to an array of people
//two classes: rooms, items
//Zorkington- leave space in each room class for item space even if item isn't in it... you can carry object into each room. 

//Inventory need a property or something like that

//how to impliment class maker into state machine: state machine only references what room can go to another room.

//.push.pop out of inventory array?

//give it a firm property or it will come back undefined.

//inventory .splice? I am thinking .push is better
//arraydestructuring notes