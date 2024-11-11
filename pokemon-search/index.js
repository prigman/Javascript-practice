const input = document.getElementById("input");
const body = document.querySelector("body");

let errorMessage;

async function searchPokemon()
{
	let inputValue = input.value;
	removeOldElements();
	if(!inputValue && typeof inputValue)
	{
		createErrorMessage("Type a pokemon name!");
		throw new Error(`Type a pokemon!`);
	}
	try {
		let url = `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`;
		const response = await fetch(url);
		if (!response.ok)
		{
			createErrorMessage("Can't find the pokemon :(");
			throw new Error(`Incorrect response. Status: ${response.status}`);
		}
		const json = await response.json();
		getFetchData(json);
	}
	catch(error)
	{
		console.error(error.message);
	}
}

function getFetchData(data)
{
	const {
		sprites: {front_default}
	} = data;
	
	const image = document.createElement("img");
	image.setAttribute("src", front_default);
	image.classList.add("pokemonImage");
	body.appendChild(image);
}

function createErrorMessage(text)
{
	errorMessage = document.createElement("p");
	errorMessage.textContent = text;
	errorMessage.style.fontWeight = "bold";
	errorMessage.classList.add("errorMessage");
	body.appendChild(errorMessage);
}

function removeOldElements()
{
	document.querySelectorAll('.pokemonImage').forEach(element => element.remove());
	if(errorMessage) errorMessage.remove();
}