define ( ['jquery', 'lodash', 'backbone'],
	
	function($, _, Backbone) {
		var Contact = Backbone.Model.extend({
			clear: function() {
				this.destroy();
			}
		});
		
		return Contact;
	}
);


