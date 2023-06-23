/* 
    * Let's build a dice game!
    - User plays the dice game, roll dice up to 3 times, and I want to focus on scoring per dice roll and totalling the score at the end of the game. 

    To Do List:
    - Tell JS what things are with variables
        -score
        - diceRollValue
        - the state of the dice (rolled or not rolled)
        - numberOfRolls (eventually set a max of 3)
    - Use dictionary/object/lookup table to store our scoring values
    - Use state/a state machine to check which action options the player has: not rolled, roll, score (ending the game and printing final total)
    - Build function to update the player score
    - Build function to roll the die and update the roll count
    - Build function to monitor/check our turn/action state and advance play state (can we roll? are we done? is the game not started yet?) - IF ELSE
        1. Check if the action/ next action is valid (can we do this?)
        2. If the die is rolled: 
            - first check if not at max rolling count of 3 - CONDITIONAL
            - if we are still under 3 then we can roll the die
            - total and set score - REASSIGN SCORE
            - make a console message to see changes
        3. (CONDITIONAL) If die is to be scored: print a message with the players final score & reset our starting values/ reset the game (REASSIGN VARIABLES).
*/
//* Creating my variables 
let score = 0; // default starting score for the game
let dieRollValue; // the variable to hold our roll value
let stateOfDie = "not rolled"; // current state of our die
let numberOfRolls = 0; // starting count for our allowed roles(1-3)

//* Use a dictionary to store score values
// 1 = 100, 2 = 20, 3 =  30, etc. 
const scoring = {
    1: 100,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    6: 60,
}

//* State Machine of player's turn:
// 3 states: "roll", "not rolled", "score"
let dieState = {
    "not rolled": ["roll"],
    "roll": ["roll", "score"],
    score: ["not rolled"]
};

// Make a function to update our score as well as print a message (console log) to give us feedback. (Check out state notes)

function scoreDice(dict, dieSide) {
    // Create some math to add new roll score value to our base score variable 
    let points = dict[dieSide];
    score += points;
    // || score += dict[dieSide];
    // score = score + points
    // Console log a message of where score is

    console.log(`After rolling the die, your new score is: ${score}.`);

};

// Test if scoreDice works- IT WORKS
//scoreDice(scoring, 5);
//scoreDice(scoring, 1);

// Build a function that will generate a random number limited by 6 (using a d6)  and increase our roll count variable numberOfRolls (reassignment)
// Just picks which side we land on and add to roll count #

function rollDie() {
    // Generate a random # that is less than 6
    dieRollValue = Math.floor(Math.random() * 6 + 1);
    //console.log("Die face: ", dieRollValue); // testing
    numberOfRolls++; 
    //console.log(numberOfRolls); // testing

};

// Testing function - IT WORKS
//rollDie();
//rollDie();
//rollDie(); 

// Build a function to pull in our state/ action change, check it, and run the rest of our conditionals
// Look at State notes
function playState(newDieState) {
    // Reference/find my starting state
    // Game default start "not rolled", but need variable that will be updated as player "rolls", an want to check if action is available.
    let validDieState = dieState[stateOfDie];

    // Using a conditional, to check if die action of validDieState is valid/doable.

    if(validDieState.includes(newDieState)) {
        // set our newDieState to the variable stateOfDie (reassign) 
        stateOfDie = newDieState;

        // If the state of die is "roll" do the following:
        if (stateOfDie === "roll") {
            // First check to make sure we aren't at max # of rolls
            if(numberOfRolls === 3) {
                console.log(`Hey you've rolled ${numberOfRolls} times and need to score! This roll won't count.`)
            } else {
                // If we haven't hit max rolls, roll the dice and send a message to the player
                rollDie(); // will get a random value(side 1-6) and increase # of rolls

                // write message
                console.log(`You rolled a ${dieRollValue}! Would you like to roll again or finalize the score?`);
                // Score the rolled dice and print a message of rolls made?
                scoreDice(scoring, dieRollValue);// run function built above dieRollValue( 1-6)
                console.log(`You have rolled ${numberOfRolls} time(s). `)
            
            }
        }
        // if the state of die is "score" do the following:
        if (stateOfDie === "score"){

            // Reset all values, print final score message
            console.log(`Your final score is ${score}. Thanks for playing!`)
            dieRollValue = "not rolled";
            numberOfRolls = 0;
            score = 0;
        }

        //

    } else { console.error(`Invalid move: Cannot ${newDieState} after ${validDieState}!`)}



};

// Calling on the playState function and give die action as argument
// IT WORKS
// playState("roll");
// playState("roll");
// playState("roll");
// playState("roll");
// playState("score");


//* Entire second round in one code block!!
// function roundTwo() {
//   console.log("\n\n------ Welcome to Dice Game, Round Two! ------\n");
//   playState("roll");
//   playState("roll");
//   playState("roll");
//   playState("score");
//   console.log("\n------ End of Round two, thanks for playing! ------\n");
// }

// roundTwo();
