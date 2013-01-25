define ( ['lodash', 'backbone'],

	function(_, Backbone) {
		var Contact = Backbone.Model.extend({
			validate: function( attrs ) {
				if (! attrs.name) {
					return 'Name field cannot be empty';
				}
			},

			clear: function() {
				this.destroy();
			}
		});

		return Contact;
	}
);


