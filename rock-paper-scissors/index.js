const playButton = document.getElementsByClassName("game-element")
const choicePlayer = document.getElementById("choice-player")
const choiceComputer = document.getElementById("choice-computer")
const result = document.getElementById("result")
const gameElements = ['ROCK', 'PAPER', 'SCISSORS']

const winResult = {
	text: "IT'S A WIN",
	color: "green"
}

const looseResult = {
	text: "IT'S A LOOSE",
	color: "red"
}

const tieResult = {
	text: "IT'S A TIE",
	color: "yellow"
}

function playGame(input) {
	let randomChoice = gameElements[Math.floor(Math.random() * 3)]
	
	choicePlayer.innerHTML = `Player: ${input}`
	choiceComputer.innerHTML = `Computer: ${randomChoice}`

	if(input == randomChoice)
	{
		result.innerHTML = `${tieResult.text}`
		result.style.color = tieResult.color
	}
	else {
		switch(input)
		{
			case 'ROCK':
			{
				result.innerHTML = (randomChoice === 'SCISSORS') ? `${winResult.text}` : `${looseResult.text}`
				break
			}
			case 'PAPER':
			{
				result.innerHTML = (randomChoice === 'ROCK') ? `${winResult.text}` : `${looseResult.text}`
				break
			}
			case 'SCISSORS':
			{
				result.innerHTML = (randomChoice === 'PAPER') ? `${winResult.text}` : `${looseResult.text}`
				break
			}
		}
		result.style.color = (result.innerHTML === `${winResult.text}`) ? result.style.color = winResult.color : result.style.color = looseResult.color
	}
}