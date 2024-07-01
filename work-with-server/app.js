const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
	const value = event.target.value.toLowerCase()
	const filteredUsers = USERS.filter((user) => user.name.toLowerCase().includes(value))
	render(filteredUsers)
})

async function start() {
	list.textContent = 'Users are loading...'
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/users')
		const data = await response.json()
		setTimeout(() => {
			USERS = data
			render(data)
		}, 2000)
	}
	catch(err) {
		list.style.color = 'red'
		list.textContent = err.message
	}
}

function render(usersArray = []) {
	if (usersArray.length === 0) {
		list.textContent = 'No matched users'
	}
	else {
		const html = usersArray.map(toHTML).join('') 
		list.innerHTML = html
	}
}

function toHTML(user) {
	return `
		<li class="list-group-item">${user.name}</li>
	`
}

start()