// vanilla js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
	loadFonts();
	correctVh();
	lazyLoad();
	mobileMenu();
});

window.addEventListener('resize', () => {
	correctVh();
});

// load fonts
function loadFonts() {
	WebFont.load({
		google: {
			families: ['Poppins:400,500,600']
		}
	});
}

// lazyLoad Images
function lazyLoad() {
	const images = document.querySelectorAll('img.lazyload');

	if (images.length) {
		images.forEach(function (img) {
			img.onload = function () {
				img.classList.add('lazyloaded');

				if (img.classList.contains('svg-html')) {
					replaseInlineSvg(img);
				}
			};
		});

		window.addEventListener('load', (e) => {
			images.forEach(img => {
				if (img.complete && img.naturalHeight !== 0) {
					img.classList.add('lazyloaded');

					if (img.classList.contains('svg-html')) {
						replaseInlineSvg(img);
					}
				}
			});
		});
	}
}

// replaseInlineSvg
function replaseInlineSvg(el) {
	const imgID = el.getAttribute('id');
	const imgClass = el.getAttribute('class');
	const imgURL = el.getAttribute('src');

	fetch(imgURL)
		.then(data => data.text())
		.then(response => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(response, 'text/html');
			let svg = xmlDoc.querySelector('svg');

			if (typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
			}

			if (typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass + ' replaced-svg');
			}

			svg.removeAttribute('xmlns:a');

			if (el.parentNode) {
				el.parentNode.replaceChild(svg, el);
			}
		});
}

// correctVh
function correctVh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
}

// mobile menu
function mobileMenu() {
	const openBtn = document.querySelector('.open-menu');

	if (openBtn) {
		openBtn.addEventListener('click', function (event) {
			event.preventDefault();
			if (document.body.classList.contains('menu-opened')) {
				document.body.classList.remove('menu-opened');
			} else {
				document.body.classList.add('menu-opened');
			}
		});
	}
};