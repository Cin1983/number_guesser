/*GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose to play again*/
//Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements

const UIgame = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UImin and max

minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

//Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min}  and ${max}`, 'red');
    }
    //Check if won
    if (guess === winningNum) {
        //Game over -won
        gameOver(true, `${winningNum} is correct! Yes you have WON 1000E !!!`);

    } else {
        //Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game over-lost
            gameOver(false, `
            Game over, you lost.The correct number was ${winningNum }`);

        } else {
            //Game continues wrong

            //Change border color
            guessInput.style.borderColor = 'purple';
            //Clear field
            guessInput.value = '';

            //Tell user it's the wrong number
            setMessage(`
                        ${guess}
                        is not correct, ${guessesLeft} guesses left `, 'purple');
        }
    }
});

//Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'hotpink' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    message.style.color = color;

    setMessage(msg);
    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}