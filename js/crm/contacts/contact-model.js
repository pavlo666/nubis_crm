define ( ['lodash', 'backbone'],
	
	function(_, Backbone) {
		var Contact = Backbone.Model.extend({
			
			clear: function() {
				this.destroy();
			}
		});
		
		return Contact;
	}
);


