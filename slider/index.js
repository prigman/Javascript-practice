const cars = document.querySelectorAll('.slider-img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let sliderInterval;
let currentIndex = 0;
let lastIndex = 0;

document.addEventListener("DOMContentLoaded", startSlider);

function startSlider()
{
	if(cars.length > 0)
		sliderInterval = setInterval(() => {
			setSlide(1);
		}, 1500);
}

function clickButton(value)
{
	clearInterval(sliderInterval);
	setSlide(value);
	startSlider();
}

function setSlide(value)
{
	lastIndex = currentIndex;
	cars[lastIndex].classList.remove('active');
	currentIndex += value;
	if(currentIndex < 0)
		currentIndex = cars.length - 1;
	if(currentIndex >= cars.length)
		currentIndex = 0;
	cars[currentIndex].classList.add('active');
}