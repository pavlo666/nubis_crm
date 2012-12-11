define(['lodash', 'backbone', 
		'text!templates/tasks/task-view.htm'],
		
	function(_, Backbone, tpl) {

		var view = Backbone.View.extend({

			el: $("#tasks"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
			}
		});
		
		return view;
	}
);