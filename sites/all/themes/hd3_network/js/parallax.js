(function ($) {
	var header_height = 120;
  $(document).ready(function() {

  	var menu_height = $("#main-menu").height();
  	header_height = menu_height + 45;
  	$("#main-menu").after("<div id='mobile_menu_handler'></div>");

  	$("#mobile_menu_handler").click(function(){
  		if(!$("#main-menu").hasClass("collapsed")){
  			$("#main-menu").addClass("collapsed");
	  		$("#main-menu").animate({ height: 0 });
  		}else{
  			$("#main-menu").removeClass("collapsed")
	  		$("#main-menu").animate({ height: menu_height });
  		}
  		if(!$("#main-menu").hasClass("clicked")){
	  		$("#main-menu").addClass("clicked");	  			
  		}
  	});

  	bindWindowScroll();

  	if($("body.front").length){
  	//only do it on front page.	
	    duplicateIdTweak("services");
			/* Next/prev and primary nav btn click handlers */
	    $('.logo-img a').click(function(e){
	    	e.preventDefault();
		   	unbindWindowScroll();
	    	$('html, body').animate({ scrollTop: 0}, 1000, function() {
	    		bindWindowScroll();
	    	});
	    });
			$('a[href*=#about]').click(function(e){
	    	e.preventDefault();
	    	if($('#about').length > 0){
		   		unbindWindowScroll();
		    	$('html, body').animate({ scrollTop: ($('#about').offset().top - header_height) }, 1000, function() {
		    		bindWindowScroll();
		    	});		   		
		   	}
	    });
			$('a[href*=#services]').click(function(e){
				e.preventDefault();
		   	if($('#services').length > 0){
		   		unbindWindowScroll();
		    	$('html, body').animate({ scrollTop: ($('#services').offset().top - header_height) }, 1000, function() {
		    		bindWindowScroll();
		    	});		   		
		   	}

	    });
			$('a[href*=#clients]').click(function(e){
				e.preventDefault();
		   	if($('#clients').length > 0){
		   		unbindWindowScroll();
		    	$('html, body').animate({ scrollTop: ($('#clients').offset().top - header_height) }, 1000, function() {
		    		bindWindowScroll();
		    	});		   		
		   	}
	    });
	    //detect the current url.
	  	var anchor = window.location.hash;
	  	if(anchor.length > 0){
	  		$('a[href*='+anchor+']').first().click();	
	  	}
		}

  });

  function bindWindowScroll(){
  	navTrack();
  	$(window).bind('scroll',function(e){
			duplicateIdTweak("services");
			navTrack();
			parallaxScroll();
	  });
  }

  function unbindWindowScroll(){
  	navTrack();
  	$(window).unbind('scroll');
  }
  /* Set navigation to an active state as the user scrolls */
	function navTrack(){
		var section1Top =  0;
		// The top of each section is offset by half the distance to the previous section.
		if($("#services").length > 0){
			var section2Top =  $('#about').offset().top - (($('#services').offset().top - $('#about').offset().top)/2);			
			var section3Top =  $('#services').offset().top - (($('#clients').offset().top - $('#services').offset().top)/2);
			var section4Top =  $('#clients').offset().top -  (($(document).height() - $('#clients').offset().top) / 2);

			$('a[href*=#]').removeClass('parallax-active');
			if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
				//on page top
			} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
				$('a[href*=#about]').addClass('parallax-active');
			} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
				$('a[href*=#services]').addClass('parallax-active');
			} else if ($(document).scrollTop() >= section4Top){
				$('a[href*=#clients]').addClass('parallax-active');
			}
		}		
	}
	function parallaxScroll(){
		var scrolled = $(window).scrollTop();
		if(!$("#main-menu").hasClass("clicked")){
			if(scrolled < 450){
				if(scrolled < 0){
					scrolled = 0;
				}
				$("#main-menu").height(90 - scrolled/5);	
			}else{
				$("#main-menu").height(0);
				if(!$("#main-menu").hasClass("collapsed")){
					$("#main-menu").addClass("collapsed");					
				}
			}
		}else{
			if(scrolled <= 0){
				$("#main-menu").removeClass("clicked");
			}
		}		
	}

	function duplicateIdTweak(element_id){
		if(!$("#"+element_id).parents("section.block").is(":visible")){
   		$("#"+element_id).attr("id", element_id+"_invisible");
   	}
   	if($("#"+element_id+"_invisible").parents("section.block").is(":visible")){
   		$("#"+element_id+"_invisible").attr("id", element_id);	
   	}
	}

})(jQuery);
