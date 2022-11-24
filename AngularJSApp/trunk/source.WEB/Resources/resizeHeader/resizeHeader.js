

/*
function init() {
	
		window.addEventListener('scroll', function(e){
			
			var is_mobile = false;

			if( $('#isMobileDiv').css('display')=='none') {
				is_mobile = true;       
			}
			if(!is_mobile)
			{
				var distanceY = window.pageYOffset || document.documentElement.scrollTop,
					shrinkOn = 100,
					header = document.querySelector("header");
				if (distanceY > shrinkOn) {
					$("#header").addClass("smaller");
					$("#TopMenusRepeater").addClass("smaller");
				} else {
					if ($("#header").hasClass("smaller")) {
						$("#header").removeClass("smaller");
						$("#TopMenusRepeater").removeClass("smaller");
					}
				}
			}
			else
			{
				if ($("#header").hasClass("smaller")) {
						$("#header").removeClass("smaller");
						$("#TopMenusRepeater").removeClass("smaller");
					}
			}
			setHeaderHeight();
			
	$('.jqx-notification-container').css('bottom','auto');		
	$('.jqx-notification-container').css('right','10px');
	$('.jqx-notification-container').css('top','10px');
	$('.jqx-notification-container').css('left','auto');
			
		});
	
	window.addEventListener('resize', function(e){
							setHeaderHeight();
							},true);
}
window.onload = init();

function setHeaderHeight()
{
	var is_mobile = false;
	
	 if( $('#isMobileDiv').css('display')=='none') {
        is_mobile = true;       
    }
	
	if(!is_mobile)
	{
		//qui le dimensioni sono fisse per via dell'animazione
		if ($("#header").hasClass("smaller")) {
			if($("#TopMenusRepeater").height()>35)
				$("#ControlsContainer").css("margin-top","81px");
			else
				$("#ControlsContainer").css("margin-top","50px");
		} else {
			if($("#TopMenusRepeater").height()>35)
				$("#ControlsContainer").css("margin-top","124px");
			else
				$("#ControlsContainer").css("margin-top","100px");
		}
	}
	else
	{
		if($("#TopMenusRepeater").height()>35)
				$("#ControlsContainer").css("margin-top","124px");
			else
				$("#ControlsContainer").css("margin-top","100px");
	}
	
	$('.jqx-notification-container').css('bottom','auto');		
	$('.jqx-notification-container').css('right','10px');
	$('.jqx-notification-container').css('top','10px');
	$('.jqx-notification-container').css('left','auto');
}

$(document).click(function() {
	$('.jqx-notification-container').css('bottom','auto');		
	$('.jqx-notification-container').css('right','10px');
	$('.jqx-notification-container').css('top','10px');
	$('.jqx-notification-container').css('left','auto');
});
*/