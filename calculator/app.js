const resultElement = document.getElementById('result')
const input_1 = document.getElementById('input1')
const input_2 = document.getElementById('input2')
const btnSubmit = document.getElementById('submit')
const btnPlus = document.getElementById('plus')
const btnMinus = document.getElementById('minus')

let sum = "Выберите сложение или вычитание"

//console.log(resultElement)

// const sum = input_1.value + input_2.value
// resultElement.textContent = sum // соединяет две строки

// const sum = Number(input_1.value) + Number(input_2.value)
// resultElement.textContent = sum // складывает два числа

// console.log(typeof sum) вывод типа переменной


btnSubmit.onclick = function() {
	if(sum < 0)
		resultElement.style.color = 'red'
	else if (sum > 0)
		resultElement.style.color = 'green'
	else
		resultElement.style.color = 'dark'
	resultElement.textContent = sum
}

// первый вариант калькулятора

// btnPlus.onclick = function() {
// 	sum = Number(input_1.value) + Number(input_2.value)
// }
// btnMinus.onclick = function() {
// 	sum = Number(input_1.value) - Number(input_2.value)
// }

// второй вариант через вызов функции

btnPlus.onclick = function() {
	sum = calculate('+')
}
btnMinus.onclick = function() {
	sum = calculate('-')
}

function calculate(action) {
	const number_1_value = Number(input_1.value)
	const number_2_value = Number(input_2.value)
	if(action == '+')
		return number_1_value + number_2_value
	else if(action == '-')
		return number_1_value - number_2_value
}