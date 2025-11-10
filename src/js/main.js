
	document.addEventListener('DOMContentLoaded', function() {
		window.addEventListener('scroll', function() {
			var mainPromo = document.querySelector('.main_promo');
			var H = mainPromo ? mainPromo.offsetHeight : 0;
			if (window.scrollY > H) {
				document.querySelectorAll('.topbar').forEach(function(el) {
					el.classList.add('visible');
				});
			} else {
				document.querySelectorAll('.topbar').forEach(function(el) {
					el.classList.remove('visible');
				});
			}
		});


	// Initialize basicLightbox for gallery links
	document.querySelectorAll('a.lightbox').forEach(function(link) {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const imgSrc = link.getAttribute('href');
			basicLightbox.create('<img src="' + imgSrc + '" style="max-width:90vw;max-height:90vh;">').show();
		});
	});

	// Swiper slider for testimonials
	var swiper = new Swiper('.swiper', {
		speed: 800,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		effect: 'slide',
		on: {
			slideChange: function() {
				var slides = this.slides;
				var activeSlide = slides[this.activeIndex];
				if (activeSlide) {
					var author = activeSlide.getAttribute('data-author');
					var team = activeSlide.getAttribute('data-team');
					var authorSpan = document.querySelector('.slider_box .testimonial_author');
					var teamSpan = document.querySelector('.slider_box .testimonial_author_team');
					if (authorSpan && teamSpan) {
						authorSpan.textContent = author;
						teamSpan.textContent = team;
					}
				}
			},
			init: function() {
				var slides = this.slides;
				var activeSlide = slides[this.activeIndex];
				if (activeSlide) {
					var author = activeSlide.getAttribute('data-author');
					var team = activeSlide.getAttribute('data-team');
					var authorSpan = document.querySelector('.slider_box .testimonial_author');
					var teamSpan = document.querySelector('.slider_box .testimonial_author_team');
					if (authorSpan && teamSpan) {
						authorSpan.textContent = author;
						teamSpan.textContent = team;
					}
				}
			}
		}
	});

	 document.querySelectorAll('.partners img').forEach(function(img) {
		 var path = img.dataset.color;
		 var src = img.getAttribute('src');
		 img.addEventListener('mouseenter', function() {
			 img.setAttribute('src', path);
		 });
		 img.addEventListener('mouseleave', function() {
			 img.setAttribute('src', src);
		 });
	 });

	// --- GSAP + ScrollTrigger based replacement for WOW.js ---
	// Uses elements with class 'wow' and optional attributes:
	//   data-wow-delay="0.2s" and data-wow-duration="1s"
	// and the animate.css-style animation names present as additional classes
	 if (window.gsap && window.ScrollTrigger) {
		 gsap.registerPlugin(ScrollTrigger);

		 function parseTime(val, fallback) {
			 if (!val) return fallback || 0;
			 val = String(val).trim();
			 if (val.slice(-1) === 's') return parseFloat(val.slice(0, -1)) || fallback || 0;
			 if (val.slice(-2) === 'ms') return (parseFloat(val.slice(0, -2)) || 0) / 1000;
			 return parseFloat(val) || fallback || 0;
		 }

		 var animMap = {
			 'fadeInLeft': { x: -20, opacity: 0 },
			 'fadeInRight': { x: 20, opacity: 0 },
			 'fadeInUp': { y: 20, opacity: 0 },
			 'fadeInDown': { y: -20, opacity: 0 },
			 'zoomIn': { scale: 0.9, opacity: 0 },
			 'flipInX': { rotationX: -80, transformOrigin: '50% 50%', opacity: 0 },
			 'slideInLeft': { x: -20, opacity: 0 },
			 'slideInRight': { x: 20, opacity: 0 },
		 };

		 document.querySelectorAll('.wow').forEach(function(el) {
			 // Determine animation type from classes (first matching key)
			 var animClass = null;
			 Object.keys(animMap).forEach(function(key) {
				 if (el.classList.contains(key) && !animClass) animClass = key;
			 });

			 var fromVars = animClass ? Object.assign({}, animMap[animClass]) : { opacity: 0, y: 20 };

			 // Support animate.css durations/delays via data-wow-duration and data-wow-delay
			 var dur = parseTime(el.getAttribute('data-wow-duration'), 1);
			 var delay = parseTime(el.getAttribute('data-wow-delay'), 0);

			 // Some animations (flip) may need transformPerspective to look better
			 if (animClass === 'flipInX') {
				 el.style.transformStyle = 'preserve-3d';
				 el.style.backfaceVisibility = 'hidden';
			 }

			 gsap.from(el, {
				 ...fromVars,
				 duration: dur,
				 delay: delay,
				 ease: 'power1.inOut',
				 scrollTrigger: {
					 trigger: el,
					 start: 'top 85%',
					 toggleActions: 'play none none none',
				 }
			 });
		 });
	 } else {
		 // If GSAP wasn't loaded for some reason, fallback to simply showing elements
		 document.querySelectorAll('.wow').forEach(function(el) {
			 el.style.visibility = 'visible';
			 el.style.opacity = 1;
		 });
	 }


});
