// List of train lines to guess
let trains = [
    { name: "chuolocal", image: "url('assets/images/Chuo_Local.jpg')"},
    { name: "chuorapid", image: "url('assets/images/Chuo_Rapid.jif')"},
    { name: "ginza", image: "url('assets/images/Ginza.jpg')"},
    { name: "hibiya", image: "url('assets/images/Hibiya.jpg')"},
    { name: "keiyo", image: "url('assets/images/Keiyo.jpg')"},
    { name: "marunouchi", image: "url('assets/images/Marunouchi.jif')"},
    { name: "namboku", image: "url('assets/images/Namboku.jif')"},
    { name: "naritaexpress", image: "url('assets/images/Narita_Express.jpg')"},
    { name: "oedo", image: "url('assets/images/Oedo.jpg')"},
    { name: "saikyou", image: "url('assets/images/Saikyou.jpg')"},
    { name: "skyliner", image: "url('assets/images/Skyliner.jpg')"},
    { name: "toyoko", image: "url('assets/images/Toyoko.jif')"},
    { name: "yamanote", image: "url('assets/images/Yamanote.jpg')"}
];


// Letters available
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


// Variable declarations
let lettersGuessed = [];
let lettersLeft = 0;
let found = 0;
let wins = 0;
let losses = 0;
let end = 0;
let guessesLeft = 0;
let guessesOutput = [];


// Floating number to check RNG
let rando = Math.floor(Math.random()*trains.length);


// Sets the train line to guess
let trainToGuess = trains[rando];
console.log(trainToGuess.name);


// Set page up with initial line data
document.getElementById("backImage").style.background = trainToGuess.image;
lettersLeft = trainToGuess.name.length;
guessesLeft = trainToGuess.name.length + 3;


// Sets up spaces to guess the line
function hangman() {
    for (let i = 0; i < trainToGuess.name.length; i++) {
        guessesOutput.push("_");
    };
    // guessesOutput.push(" line");
};


// Prints out information on key event
function printout() {
    document.getElementById("lineToGuess").innerHTML = guessesOutput;
    document.getElementById("lettersGuessed").innerHTML = "Letters Guessed: " + lettersGuessed;
    document.getElementById("results").innerHTML = "Remaining Guesses: " + guessesLeft;
    document.getElementById("wins").innerHTML = "Total Wins: " + wins;
    document.getElementById("losses").innerHTML = "Total Losses: " + losses;
};

// Clear the page and all variables
function reset() {
    lettersGuessed = [];
    guessesOutput = [];
    end = 0;
    rando = Math.floor(Math.random()*trains.length);
    trainToGuess = trains[rando];

    document.getElementById("backImage").style.background = trainToGuess.image;
    lettersLeft = trainToGuess.name.length;
    guessesLeft = trainToGuess.name.length + 3;

    hangman();
};

hangman();
printout();
console.log(end);

// Key events
document.onkeyup = function (x) {
    let keyPressed = x.key;
    keyPressed = keyPressed.toLocaleLowerCase();

    found = 0;

    // Alert if letter has already been selected
    for (let i = 0; i < Letters.length; i++) {

        if (keyPressed === Letters[i]) {
            for (let j = 0; j < lettersGuessed.length; j++) {
                if (keyPressed === lettersGuessed[j]) {
                    alert (keyPressed + " has already been selected.  Select another letter.");
                    found = 1;
                };
            };
  
    // When new letter is guessed
    if (found === 0) {
        guessesLeft--;
        lettersGuessed.push(keyPressed);

        // Sets the correct position for letter when correctly guessed
        for (let j = 0; j < trainToGuess.name.length; j++) {
            if (trainToGuess.name.charAt(j) === keyPressed) {
                guessesOutput[j] = keyPressed;
                lettersLeft--;
            };

            // Output for losing outcome
            if (guessesLeft === 0) {
                losses = losses + 1;
                alert("Incorrect.  The correct answers is "  + trainToGuess.name.charAt(0).toUpperCase() + trainToGuess.name.substr(1).toLowerCase());
                reset();
            };

            // Output for winning outcome
            if (lettersLeft === 0) {
                guessesOutput[j] = keyPressed;
                wins = wins + 1;
                alert("You Win! " + trainToGuess.name.charAt(0).toUpperCase() + trainToGuess.name.substr(1).toLowerCase() + " is correct!");
                reset();
            };
        };
    };

printout();
};
};
};

