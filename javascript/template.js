var $j = jQuery.noConflict(true);
(function($) {
$(document).ready(function() {
/*------------------------- Active PIE on #wrapper ----------------------------*/
	if ($.browser.msie) {
		PIE.attach( $('wrapper')[0] );
	}
/*------------------------- Focus login form ----------------------------*/
	$('#LOGIN #Userid').focus();
/*------------------------- Cufon Replace h3 and menu text ----------------------------*/
// Cufon does not yet support rtl text, so we have to switch it around first
	var $toCufon = $('#header > ul > li ul li a:not(:contains("in"))').add('#content h3');
	$toCufon.each(function() {
		$(this).text( $(this).text().split("").reverse().join("") );
	});
	$toCufon = $toCufon.add('#header > ul > li ul li a:contains("in")');
	Cufon.replace($toCufon, {
		hover: true,
		deparate: 'none'
	});
/*------------------------- Animate Menu ----------------------------*/
	var $headerLists = $('#header>ul>li');
	$headerLists.find('ul').css({height: 0, opacity: 0, display: 'none'});
	$headerLists.live('mouseenter', function(){
		$(this).find('ul').stop().css('display', 'block').animate({height: 235, opacity: 1}, 300);
	});
	$headerLists.live('mouseleave', function(){
		$(this).find('ul').stop().animate({height: 0, opacity: 0}, 200, 'linear', function(){ $(this).css('display', 'none'); });
	});
/*------------------------------------ jPlayer -----------------------------------*/
	var $jpPlayTime = $("#jplayer_play_time"),
		$jpTotalTime = $("#jplayer_total_time"),
		$jpWrapper = $('#jPlayer-wrapper');

	$("#jquery_jplayer").jPlayer({
		ready: function () {
			this.element.jPlayer("setFile", "audio/eretz_yisroel.mp3", "audio/eretz_yisroel.ogg").jPlayer("play");
		},
		volume: 80,
		//oggSupport: true,
		preload: 'none',
		//swfPath: "jPlayer/js",
		errorAlerts:true,
		nativeSuport:false
	})
	.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
		$jpPlayTime.text($.jPlayer.convertTime(playedTime));
		$jpTotalTime.text($.jPlayer.convertTime(totalTime));
	})
	.jPlayer("onSoundComplete", function() {
		this.element.jPlayer("play");
	});
// position
	$(window).resize(positionPlayer);
	function positionPlayer(){
		$jpWrapper.css('left', ($(window).width() / 2) - ($jpWrapper.outerWidth() / 2) + 'px' );
	}
	positionPlayer();
/*------------------------- on-screen keyboard ----------------------------*/
// Set up variables
	var $keyboardSwitch = $('a#keyboard-switch'),
	offText = $keyboardSwitch.text(),
	onText = offText.replace('Show', 'Hide'),
	$keyboardContainer = $('#keyboard-container').css('opacity', 0),
	isKeyboardLoaded = 0,
	isKeyboardHidden = 1,
	$keyboard,
	keyboardHeight,
	$focused = $('input:first'),
	$allTextFields = $(':input').not(':button');
// keep track of focused element
	$allTextFields.focus(function(){
		$focused = $(this);
	});
// load keyboard and bind keyboard toggle
	$keyboardContainer.load('keyboard.html #keyboard','',function() {
		isKeyboardLoaded = 1;
		$keyboard = $keyboardContainer.find('>div');
		keyboardHeight = $keyboard.outerHeight();
		$keyboardSwitch.css('display', 'inline').click(toggleKeyboard);
		$allTextFields.click(function() {
			toggleKeyboard(1);
		});
		$allTextFields.blur(function() {
			toggleKeyboard(0);
		});
	});
// Activate keyboard
	$keyboardContainer.delegate('#keyboard div', 'click', function(){
		var text = $(this).text();
		if(text == 'space') { text = ' '; };
		if($focused.getSelection().length) { // some text is selected
			$focused.replaceSelection(text);
		} else { // nothing is selected
			$focused.insertAtCaretPos(text);
		}
	});

	function toggleKeyboard(state) {
	// Change flag before animation starts
		isKeyboardHidden = isKeyboardHidden ? 0 : 1;
		if(!state == undefined){
			if(state) {
				isKeyboardHidden = 0;
			} else {
				isKeyboardHidden = 1;
			}
		}
		if(!isKeyboardHidden) { // keyboard is hidden (flag has just changed)
			$keyboardSwitch.text(onText);
			$keyboardContainer.stop().animate({height: keyboardHeight, opacity: 1});
		} else {
			$keyboardSwitch.text(offText);
			$keyboardContainer.stop().animate({height: 0, opacity: 0});
		}
	}

});
})($j);