const inputBoxes = document.getElementsByClassName('inputBox');
const pointLabel = document.getElementById('pointsBox');
var upperAnswer, lowerAnswer, rightAnswer, leftAnswer, upperInput, lowerInput, leftInput, rightInput;
let points = "points = 0";
var result = 0;
let randomNumber;

document.getElementById('pointsBox').innerText = points;

function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumbers() {
    randomNumber = getRandomNumber(101, 11);
    let randomNumberVariables = [getRandomNumber(11, 6), getRandomNumber(6, 1)];

    document.getElementById('randomNumber').innerText = randomNumber;
    document.getElementById('upperRandomNumber').innerText = randomNumberVariables[0];
    document.getElementById('upperRandomNumberNegative').innerText = -randomNumberVariables[0];
    document.getElementById('middleRandomNumber').innerText = randomNumberVariables[1];
    document.getElementById('middleRandomNumberNegative').innerText = -randomNumberVariables[1];

    document.getElementById('upperInputBox').value = '';
    document.getElementById('lowerInputBox').value = '';
    document.getElementById('leftInputBox').value = '';
    document.getElementById('rightInputBox').value = '';

    upperAnswer = randomNumber + randomNumberVariables[0];
    lowerAnswer = randomNumber - randomNumberVariables[0];
    leftAnswer = randomNumber - randomNumberVariables[1];
    rightAnswer = randomNumber + randomNumberVariables[1];

    gridNumbers = document.getElementsByClassName('gridItem');
    Array.from(gridNumbers).forEach(function(gridNumber) {
        let currentNumber = gridNumber.textContent || gridNumber.innerText;
        if (parseInt(currentNumber) === randomNumber) {
            gridNumber.style.backgroundColor = "green";
        }
    });
}

document.getElementById('checkButton').addEventListener('click', function() {
    upperInput = parseInt(document.getElementById('upperInputBox').value);
    lowerInput = parseInt(document.getElementById('lowerInputBox').value);
    leftInput = parseInt(document.getElementById('leftInputBox').value);
    rightInput = parseInt(document.getElementById('rightInputBox').value);

    if (upperInput === upperAnswer && lowerInput === lowerAnswer && leftInput === leftAnswer && rightAnswer === rightInput) {
        result++;
        pointLabel.innerText = "points = " + result;

        generateRandomNumbers();
    } 
    else if (document.getElementById('upperInputBox').value === "" || document.getElementById('lowerInputBox').value === "" || document.getElementById('leftInputBox').value === "" || document.getElementById('rightInputBox').value === "") {
        alert('Udfyld alle tal')
    } 
    else {
        let currentHighScore = document.getElementById('highScoreLabel').innerText;
        currentHighScore = currentHighScore.charAt(currentHighScore.length - 1);

        if (result > currentHighScore) {
            document.getElementById('highScoreLabel').innerText = "High Score: " + result;
        }

        result = 0;
        pointLabel.innerText = "points = " + result;

        gridNumbers = document.getElementsByClassName('gridItem');
        Array.from(gridNumbers).forEach(function(gridNumber) {
            let currentNumber = gridNumber.textContent || gridNumber.innerText;
            gridNumber.style.backgroundColor = "#f0f0f0";
        });
        
        generateRandomNumbers();
    }
});

Array.from(inputBoxes).forEach(function(inputBox) {
    inputBox.addEventListener('input', function(event) {
        let input = event.target.value;
        input = input.replace(/[^0-9]/g, '');
        if (input.length > 3) {
            input = input.slice(0, 3);
        }
        event.target.value = input;
    });
});

const grid = document.getElementById("grid");
for (let i = 1; i <= 100; i++) {
    const div = document.createElement("div");
    div.classList.add("gridItem");
    div.textContent = i;
    grid.appendChild(div);
}

generateRandomNumbers();
