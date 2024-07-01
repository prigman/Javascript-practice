const outputElement = document.getElementById('output')
const btnDateFull = document.getElementById('full')
const btnDate = document.getElementById('date')
const btnTime = document.getElementById('time')
let mode = 'time'

function bindMode(name) {
	return function(){
		mode = name
		update()
	}
}

btnDateFull.onclick = bindMode('full')

btnDate.onclick = bindMode('date')

btnTime.onclick = bindMode('time')

setInterval(update, 1000)
update()

function format(formatMode) {
	const now = new Date()
	switch(formatMode) {
		case 'time':
			return now.toLocaleTimeString()
		case 'date':
			return now.toLocaleDateString()
		case 'full':
			return now.toLocaleDateString() + ' ' + now.toLocaleTimeString()
		default:
			return now.toLocaleTimeString()
	}
}

function update() {
	outputElement.textContent = format(mode)
}