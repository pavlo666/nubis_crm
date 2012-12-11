define(['lodash', 'backbone', 
		'text!templates/billing/billing-view.htm'],
		
	function(_, Backbone, tpl) {

		var view = Backbone.View.extend({

			el: $("#billing"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
			}
		});
		
		return view;
	}
);