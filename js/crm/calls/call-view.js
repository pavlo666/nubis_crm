define(['lodash', 'backbone', 
		'text!templates/calls/call-view.htm'],
		
	function(_, Backbone, tpl) {

		var view = Backbone.View.extend({

			el: $("#calls"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
			}
		});
		
		return view;
	}
);