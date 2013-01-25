define ( ['lodash', 'backbone'],

	function(_, Backbone) {
		var Deal = Backbone.Model.extend({

			validate: function(attrs) {
				if ( ! attrs.title) {
					return 'Title field cannot be empty';
				}
			},

			clear: function() {
				this.destroy();
			}
		});

		return Deal;
	}
);
