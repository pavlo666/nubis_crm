define ( ['lodash', 'backbone'],
	
	function(_, Backbone) {
		var Deal = Backbone.Model.extend({
			
			validate: function(attrs) {
				if ( ! attrs.title || ! attrs.contact) {
					return 'Every deal must have a title and contacts';
				}
			},
			
			clear: function() {
				this.destroy();
			}
		});
		
		return Deal;
	}
);
