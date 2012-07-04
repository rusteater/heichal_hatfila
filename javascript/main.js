jQuery(document).ready(function(){
  $('html').removeClass('no-js').addClass('js');
  $.fx.interval = 20; /* Slow down animations (default 13). Big performance boost. */
/*------------------------- Cufon Replace menu text ----------------------------*/
  $('#header > ul > li ul').wrap('<bdo dir=ltr></bdo>');
  $('#header > ul > li ul li a:not(:contains("in"))').each(function(){
	$(this).text( $(this).text().split("").reverse().join("") );
  });
  Cufon.replace('#header > ul > li ul', {hover: true});
/*------------------------- Animate H2's upon UL hover ----------------------------*/
  $('h2 img').each(function(){ 
	  var $this = $(this);
	  $this.data({
		  o_width: parseInt($this.css('width')),
		  o_height: parseInt($this.css('height')),
		  o_top: parseInt($this.css('marginTop'))
	  });
	  
	  var o_width = $this.data().o_width,
	  o_height = $this.data().o_height,
	  o_top = $this.data().o_top;
	  
	  $this.parent().next().hover(function(){
		  $this.stop().animate({
			  width: o_width * 1.25,
			  height: o_height * 1.25,
			  marginTop: o_top - ((o_height * 1.25) - o_height)
		  }, 250);
	  }, function(){
		  $this.stop().animate({
			  width: o_width,
			  height: o_height,
			  marginTop: o_top
		  }, 150);
	  });
  });
/*------------------------- Animate #wrapper a img's upon hover ----------------------------*/
  $('#wrapper a img').each(function(){
	  var $this = $(this);
	  $this.data({
		  o_height: parseInt($this.css('height')),
		  o_margin_top: parseInt($this.css('marginTop'))
	  });
	  
	  var o_height = $this.data().o_height,
	  o_margin_top = $this.data().o_margin_top;
  
	  $this.parent().bind('mouseenter', function(){
		  $this.stop().animate({
			  height: 2,
			  marginTop: o_margin_top + (o_height / 2)
		  }, 110, 'linear', function(){
			  $this.animate({
				  height: o_height,
				  marginTop: o_margin_top
			  }, 110, 'linear');
		  });
	  });
  });
/*--------------------------------- Animate Menu ------------------------------------*/
  var $headerLists = $('#header>ul>li');
  $headerLists.find('ul').css({height: 0, opacity: 0, display: 'none'});
  
  $headerLists.live('mouseenter', function(){
	  $(this).find('ul').stop().css('display', 'block').animate({height: 160, opacity: 1}, 350);
  });
  $headerLists.live('mouseleave', function(){
	  $(this).find('ul').stop().animate({height: 0, opacity: 0}, 700, 'linear', function(){ $(this).css('display', 'none'); });
  });
/*---------------------------- Create Live Clouds ------------------------------------*/
  // set variables
  var $parent = $('#clouds'),
	  parentWidth = $parent.width(),
	  parentHeight = $parent.height();
  $(window).resize(function(){ parentWidth = $parent.width(); });
  // Create x ammounts of clouds, and pass to randomize
  for(i=0; i<(parentWidth/240); i++) {
	  $cloud = $('<img src="images/cloud' + Math.randomInt(1,3) + '.png" />').appendTo($parent);
	  randomize($cloud, Math.randomInt(-50, parentWidth - 50));
  }
  // function randomize
  function randomize($cloud, right){
	  var height = Math.randomInt(150,250),
	  width = Math.randomInt( 250, Math.min(750, height *  2) ),
	  right = right ? right : -width,
	  top = Math.randomInt(-(height / 2.6), (parentHeight - height + 20) ),
	  speed = randomSpeed(right);
	  $cloud.css({width: width, height: height, right: right, top: top})
		  .animate({ right: parentWidth }, speed, 'linear', function(){
			  randomize($cloud);
		  });
  }
  // function to get random speed
  function randomSpeed(right){
	  var distance = parentWidth - right;
	  return Math.randomInt(distance * 22, distance * 40);
  }
/*---------------------------- Login ------------------------------------*/
  var down = false;
  function togglePanel(){
	if(down == 0){
	  down = 1;
	  $('#login-back #Userid').focus();
	  $('#login-back').stop().animate({marginTop: 0});
	} else {
	  down = 0;
	  $('#login-back').stop().animate({marginTop: -200});
	}
  }
  $('#login-button').click(function(){
	  togglePanel();
	  return false;
  });
  $('#login-back a.close').click(function(){
	  togglePanel();
	  return false;
  });
});
// Returns a float between min (inclusive) and max (exclusive)
Math.randomFloat = function(min, max) {
return Math.random() * (max-min) + min;
}
// Returns a whole number between min (inclusive) and max (inclusive)
Math.randomInt = function(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}