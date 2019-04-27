
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
			duration: 1000,
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
}, 2500);

window.onscroll = e => {
	let { scrollY } = window;
	
	if (scrollY > 0) {

		if (navbar.style.opacity !== '1') {
			navbar.style.opacity = '1';
		}

	} else {
		navbar.style.opacity = '0';
	}
}

function scrollToSection(id) {
	document.querySelector('#' + id).scrollIntoView({
		behavior: 'smooth'
	});
}

/* unregister service workers */
if (navigator.serviceWorker) {
	navigator.serviceWorker.getRegistrations(regs => {
		for (let reg of regs) {
			reg.unregister();
		}
	});
}

/* do all the sheet stuff */
let sheetId = '191YLtCW0myhV1qoNfudca9MaiqTTVDRPsm8YZWBTkRU';
let apiKey = 'AIzaSyDEBLKN17IKxy0IsigeP4XB6ivTh-dGRac';

fetch(
	`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Sponsors&ranges=Schedule&ranges=FAQ&key=${apiKey}`
).then(res => res.json()).then(res => {
	let ranges = res.valueRanges;

	for (let i = 0; i < ranges.length; i++) {
		if (ranges[i].range.includes('Sponsors')) {
			handleSponsorData(ranges[i].values);
		} else if (ranges[i].range.includes('Schedule')) {
			handleScheduleData(ranges[i].values);
		} else if (ranges[i].range.includes('FAQ')) {
			handleFAQData(ranges[i].values);
		}
	}
});

function handleSponsorData(data) {
	let sponsorHTML = '';
	let partnerHTML = '';

	for (let i = 1; i < data.length; i++) {
		let each = data[i];

		if (each[0] === 'Partner') {
			partnerHTML += `
				<a href="${each[3]}" target="_blank" class="sponsor-image partner-image">
					<div>
						<img alt="${each[1]}" src="${each[2]}" style="${each[4] || ''}">
					</div>
				</a>
			`;
		} else if (each[0] === 'Sponsor') {
			sponsorHTML += `
				<a href="${each[3]}" target="_blank" class="sponsor-image">
					<div>
						<img alt="${each[1]}" src="${each[2]}" style="${each[4] || ''}">
					</div>
				</a>
			`;
		}
	}

	document.querySelector('#partners > div > div').innerHTML = partnerHTML;
	document.querySelector('#sponsors > div > div').innerHTML = sponsorHTML;
}

function handleScheduleData(data) {
}

function handleFAQData(data) {
	let col1 = '';
	let col2 = '';

	for (let i = 1; i < data.length; i++) {
		let each = data[i];

		let html = `
			<div class="faq-item">
				<span>${each[0]}</span>
				<div>
					<div>${each[1]}</div>
				</div>
			</div>
		`;

		if (i % 2 === 0) {
			col2 += html;
		} else {
			col1 += html;
		}
	}

	let divs = document.querySelectorAll('#faq > div > div > div');
	divs[0].innerHTML = col1;
	divs[1].innerHTML = col2;

	setTimeout(() => {
		let faq = document.getElementsByClassName('faq-item');

		for (let ele of faq) {
			let span = ele.querySelector('span');
			span.onclick = () => {
				ele.classList.toggle('faq-item-active');
				let panel = ele.querySelector('div');

				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + 'px';
				}
			}
		}
	}, 100);
}
