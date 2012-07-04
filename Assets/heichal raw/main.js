jQuery(document).ready(function($) {
	$('button').each(function() {
		var $this = $(this), id = $this.attr('id');
		(id.indexOf('BUTTON_2') != -1 && $this.addClass('play')) || (id.indexOf('BUTTON_1') != -1 && $this.addClass('download'));
	});
});