const pointScoreLabel = document.getElementById('pointsLabel');
const highScoreLabel = document.getElementById('highScoreLabel');
const randomNumberLabel = document.getElementById('randomNumberInputBox')
const inputBoxes = Array.from(document.querySelectorAll('#topInputBox, #bottomInputBox, #rightInputBox, #leftInputBox'));

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function populateGrid() {
    const grid = document.getElementById('grid');
    for (let i = 1; i <= 100; i++) {
        const div = document.createElement('div');
        div.classList.add('gridItem');
        div.textContent = i;
        grid.appendChild(div);
    }
}

function gridColors(resetColors = false) {
    let gridItems = Array.from(document.getElementsByClassName('gridItem'));

    if (resetColors) {
        gridItems.forEach(gridItem => {
            gridItem.style.backgroundColor = "white";
        });
        return;
    }

    gridItems.forEach(gridItem => {
        if (gridItem.textContent === randomNumber.toString()) {
            gridItem.style.backgroundColor = "green";
        }
    });
}

function populateRandomNumbers() {
    randomNumber = getRandomNumber(11, 100);
    randomNumberVariables = [getRandomNumber(1, 5), getRandomNumber(6, 10)]

    randomNumberLabel.value = randomNumber;

    inputBoxes.forEach((inputBox, index) => {
        let i = (index % 3 === 0) ? 1 : 0;
        const symbol = index % 2 === 0 ? '+' : '-';
        inputBox.value = '';

        inputBox.placeholder = `${symbol}${randomNumberVariables[i]}`;
    });

    gridColors();
}

document.getElementById('checkButton').addEventListener('click', function() {
    for (let index = 0; index < inputBoxes.length; index++) {
        let inputBox = inputBoxes[index];
        let i = (index % 3 === 0) ? 1 : 0;
        const symbol = index % 2 === 0 ? '+' : '-';
        pointScore = pointScoreLabel.textContent.match(/\d+/g).join();
        highScore = highScoreLabel.textContent.match(/\d+/g).join();

        if (inputBox.value === '') {
            alert('Please fill out all numbers');
            return;
        }

        if (inputBox.value !== eval(`${randomNumber} ${symbol} ${randomNumberVariables[i]}`).toString()) {
            if (pointScore > highScore) {
                highScoreLabel.textContent = `High Score: ${pointScore}`;
            }

            pointScore = 0;
            pointScoreLabel.textContent = `Points = ${pointScore}`

            gridColors(true);
            populateRandomNumbers();
            return;
        }
    }

    pointScore++;
    pointScoreLabel.textContent = `Points = ${pointScore}`;
    populateRandomNumbers();
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

populateGrid();
populateRandomNumbers();
