define(['lodash', 'backbone', 
		'crm/general/quick-add-view',
		'text!templates/deals/deal-view.htm'],
		
	function(_, Backbone, QuickAddView, tpl) {

		var view = Backbone.View.extend({

			el: $("#deals"),

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template());
				new QuickAddView({el: $("#deal-sidebar"), items: ["Title", "Contact", "Company"]});
			}
		});
		
		return view;
	}
);