/* 
Design your story
    - Room one
        -(maybe async function ask()Introductory Text: Launch Game
        - Define Where the client is and what he is between. Is there a portal or a door handle? Is there a secret knock to get out? 
        -(>_ is a prompt for user to type into it.)
        - answer if/else statements.
        - else: "I don't know how to _______"
        -place prompt inside a while loop: 
        while (answer !== 'exit') {
        answer = await ask('>_ ')
        - (If/Else)If player is in room one and tries to simply "open door" game should deny the user: "the door is locked. There is a keypad on the door handle". 
        - (If/Else) If the player is in room one and tries the password but fails: "Bzzzt! The door is still locked."
        - If player enters the right room they get to move to the next room. 
}
    - Room two
    - Room three
assign variables 
    - room

create several different states to distinguish between different rooms.
    - define room description
    - define what rooms connect to one another
    - define what is in the room
assign multiple player options- array
    - assign state of player 
Create a state Machine to represent room transitions

*/
let player = ["Monet", "Brock", "Eden", "Ezra"];
let location = roomOne; // Player launches game in room one
let playerMoveCount;
let stateOfPlayer = "Room One"; 
let numberOfAttempts = 0;


const locationMap = {
    roomOne = 
    roomTwo =
    roomThree = 
    roomFour =
    roomFive =

}