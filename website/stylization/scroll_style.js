$(document).ready(function() {
		        function isScrolledTo(elem) {
		            var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
		            var docViewBottom = docViewTop + $(window).height();
		            var elemTop = $(elem).offset().top; //num of pixels above the elem
		            var elemBottom = elemTop + $(elem).height();
		            return ((elemTop <= docViewTop));
		        }

		        var catcher = $('header');
		        var sticky = $('.sidebar');
		        $(window).scroll(function() {
		            if(isScrolledTo(sticky)) {
		                sticky.css('position','fixed');
		                sticky.css('top','0px');
		            }
				var stopHeight = catcher.offset().top + catcher.height();
					if ( stopHeight > sticky.offset().top) {
		                sticky.css('position','absolute');
		                sticky.css('top',stopHeight);
		            }
		        });
		    });