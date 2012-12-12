define(['lodash', 'backbone', 
		'crm/general/quick-add-view',
		'text!templates/journal/journal-view.htm'],
		
	function(_, Backbone, QuickAddView, tpl) {

		var view = Backbone.View.extend({

			el: $("#journal"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
				new QuickAddView({el: $("#journal-sidebar"), items: ["To", "From", "Content"]});
			}
		});
		
		return view;
	}
);