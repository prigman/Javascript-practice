const inputElement = document.getElementById('title')
const listElement = document.getElementById('list')
const btnCreate = document.getElementById('create')

// console.log(inputElement.value) // вывод значения инпута

// Object
// const person = {
// 	firstName: 'Name',
// 	lastName: 'lastName',
// 	country: 'Country',
// 	languages: ['ru', 'ua', 'eng', 'de'],
// 	getFirstName: function() {
// 		console.log(person.firstName)
// 	}
// }

const listsObjectArray = [
	{
		title: 'Block First',
		completed: false
	},
	{
		title: 'Block Second',
		completed: true
	}
]

function render() {
	listElement.innerHTML = '' // очистка перед созданием
	if(listsObjectArray.length === 0)
		listElement.innerHTML = '<p>Нет заметок</p>'
	for(let i = 0; i < listsObjectArray.length; i++)
	{
		listElement.insertAdjacentHTML('beforeend', getListTemplate(listsObjectArray[i], i)) 
	}
}

btnCreate.onclick = function() {
	if(inputElement.value.length === 0)
		return
	const newListObject = {
		title: inputElement.value,
		completed: false
	}
	listsObjectArray.push(newListObject)
	inputElement.value = ''
	render()
}

function getListTemplate(object, index) {
	return `
	<li class="list-group-item d-flex justify-content-between align-items-center">
		<span class="${ object.completed ? 'text-decoration-line-through' : ''}">${object.title}
		</span>
		<span>
			<span class="btn btn-small btn-${object.completed ? 'warning' : 'success'}" data-type="toggle" data-index="${index}">&check;</span>
			<span class="btn btn-small btn-danger" data-type="remove" data-index="${index}">&times;</span>
		</span>
	</li>
	`
}

listElement.onclick = function(event) {
	if(event.target.dataset.index){
		const index = parseInt(event.target.dataset.index)
		const type = event.target.dataset.type
		if (type === 'toggle')
			listsObjectArray[index].completed = !listsObjectArray[index].completed
		else if (type === 'remove')
			listsObjectArray.splice(index, 1)
		render()
	}
}

render()

// listElement.innerHTML = `
	// <li class="list-group-item d-flex justify-content-between align-items-center">
	// 	<span>${inputElement.value}</span>
	// 	<span>
	// 	<span class="btn btn-small btn-success">&check;</span>
	// 	<span class="btn btn-small btn-danger">&times;</span>
	// 	</span>
	// </li>
	// ` создать и перезаписать html элемент
