
let frontPageTimeline = anime.timeline({
	autoplay: false,
	easing: 'easeOutSine'
}).add({
	targets: '#front-page',
	background: [
		{
			value: '#000',
			duration: 1000,
			easing: 'easeOutSine'
		},
		{
			value: '#1d1d1d',
			duration: 500,
			delay: 500,
			easing: 'easeOutSine'
		}
	]
}).add({
	targets: '#front-page > div',
	duration: 3000,
	opacity: 1,
	delay: 0
});

frontPageTimeline.play();

setTimeout(() => {
	particlesJS.load('particles', '../assets/particles.json');
}, 2000);

window.onscroll = e => {
	if (window.scrollY > 0) {

		if (navbar.style.opacity !== '1') {
			navbar.style.opacity = '1';
		}

	} else {
		navbar.style.opacity = '0';
	}
}

function whatPage() {
	return Math.floor(window.scrollY / window.innerHeight);
}