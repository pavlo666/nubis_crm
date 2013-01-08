define(['lodash', 'backbone', 
		'text!templates/docs/docs-view.htm'],
		
	function(_, Backbone, tpl) {

		var view = Backbone.View.extend({

			el: $("#docs"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
			}
		});
		
		return view;
	}
);