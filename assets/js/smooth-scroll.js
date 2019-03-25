---
layout: compress-js
---

(function() {

	'use strict';

	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		var smoothScroll = function (anchor, duration, easing, url) {

			var easingPattern = function (type, time) {
				if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
				if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
				if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
				if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
				if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
				if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
				if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
				if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
				if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
				if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
				if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
				if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
				return time; 
			};

			var updateURL = function (url, anchor) {
				if ( url === 'true' && history.pushState ) {
					history.pushState(null, null, '#' + anchor.id);
				}
			};
			var scrollHeader = document.querySelector('.scroll-header');
			var headerHeight = scrollHeader === null ? 0 : scrollHeader.offsetHeight;

			var startLocation = window.pageYOffset;
			var getEndLocation = function (anchor) {
				var location = 0;
				if (anchor.offsetParent) {
					do {
						location += anchor.offsetTop;
						anchor = anchor.offsetParent;
					} while (anchor);
				}
				location = location - headerHeight;
				if ( location >= 0 ) {
					return location;
				} else {
					return 0;
				}
			};
			var endLocation = getEndLocation(anchor);
			var distance = endLocation - startLocation;

			var stopAnimation = function () {
				var currentLocation = window.pageYOffset;
				if ( currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
					clearInterval(runAnimation);
					updateURL(url, anchor);
				}
			};

			var timeLapsed = 0;
			var percentage, position;

			var animateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / duration );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * easingPattern(easing, percentage) );
				window.scrollTo( 0, position );
				stopAnimation();
			};

			var runAnimation = setInterval(animateScroll, 16);

		};

		var scrollToggle = document.querySelectorAll('.scroll');
		[].forEach.call(scrollToggle, function (toggle) {

			toggle.addEventListener('click', function(e) {

				
				e.preventDefault();

				var dataID = toggle.getAttribute('href');
				var dataTarget = document.querySelector(dataID);
				var dataSpeed = toggle.getAttribute('data-speed');
				var dataEasing = toggle.getAttribute('data-easing');
				var dataURL = toggle.getAttribute('data-url');

				if (dataTarget) {
					smoothScroll( dataTarget, dataSpeed || 500, dataEasing || 'easeInOutCubic', dataURL || 'false' );
				}

			}, false);

		});

	}

})();
