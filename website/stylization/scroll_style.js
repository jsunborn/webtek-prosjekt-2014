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
				var stickyTop = $('aside.empty');
				var stickyList = $('.sidemenu ul li');
				var stickyWidth = $('body').width()*0.2335;
				
		        $(window).scroll(function() {
		            if(isScrolledTo(stickyTop)) {
		                sticky.css('position','fixed');
		                sticky.css('top','0px');
						stickyList.css('max-width',stickyWidth);
		            }
				var stopHeight = catcher.offset().top + catcher.height();
					if ( stopHeight > sticky.offset().top) {
		                sticky.css('position','absolute');
		                sticky.css('top',stopHeight);
		            }
		        });
		    });