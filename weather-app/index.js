const card = document.querySelector(".card");
const cityInput = document.querySelector(".city-input");
const form = document.querySelector(".weather-form");
const key = "810efee4b3db250d5a7b84144ae9e3c3";

form.addEventListener("submit", async event => {
	event.preventDefault();
	const city = cityInput.value;

	if(city)
	{
		try
		{
			const weatherData = await getWeatherData(city);
			displayWeatherInfo(weatherData);
		}
		catch(error)
		{
			console.log(error);
			displayError(error);
		}
	}
	else
	{
		displayError("Please enter a city");
	}
});

async function getWeatherData(city)
{
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
	const response = await fetch(apiUrl);
	if (!response.ok)
	{
		throw new Error("Could not fetch weather data");
	}

	return await response.json();
}

function displayWeatherInfo(data)
{
	const {
		name: city, 
		main: {temp, humidity}, 
		weather: [{description, id}]
	} = data;

	card.textContent = "";
	card.style.display = "flex";

	const cityTitle = document.createElement("h1");
	const tempTitle = document.createElement("p");
	const humidityTitle = document.createElement("p");
	const descTitle = document.createElement("p");
	const emojiTitle = document.createElement("p");

	cityTitle.textContent = city;
	cityTitle.classList.add("city");
	card.appendChild(cityTitle);

	tempTitle.textContent = `${(temp - 273.15).toFixed(1)}°C`;
	tempTitle.classList.add("temp");
	card.appendChild(tempTitle);

	humidityTitle.textContent = `Humidity: ${humidity}%`;
	humidityTitle.classList.add('humidity');
	card.appendChild(humidityTitle);

	descTitle.textContent = description;
	descTitle.classList.add("weather");
	card.appendChild(descTitle);

	emojiTitle.textContent = getWeatherEmoji(id);
	emojiTitle.classList.add("emoji");
	card.appendChild(emojiTitle);
}

function getWeatherEmoji(weatherId)
{
	switch(true)
	{
		case(weatherId >= 200 && weatherId < 300): return "🌩️";
		case(weatherId >= 300 && weatherId < 400): return "🌧️";
		case(weatherId >= 500 && weatherId < 600): return "🌧️";
		case(weatherId >= 600 && weatherId < 700): return "🌨️";
		case(weatherId >= 700 && weatherId < 800): return "🌫️";
		case(weatherId === 800): return "☀️";
		case(weatherId >= 801 && weatherId < 810): return "☁️";
		default: return "✨";
	}
}

function displayError(message)
{
	const errorDisplay = document.createElement('p');
	errorDisplay.textContent = message;
	errorDisplay.classList.add("errorDisplay")

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}