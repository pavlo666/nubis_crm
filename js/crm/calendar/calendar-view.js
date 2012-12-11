define(['lodash', 'backbone', 
		'text!templates/calendar/calendar-view.htm'],
		
	function(_, Backbone, tpl) {

		var view = Backbone.View.extend({

			el: $("#calendar"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
			}
		});
		
		return view;
	}
);