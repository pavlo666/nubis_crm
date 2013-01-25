define(['lodash', 'backbone',
		'text!templates/general/quick-add.htm'],

	function(_, Backbone, tpl) {

		var view = Backbone.View.extend({

			template: _.template(tpl),

			initialize: function() {
				$(this.el).html(this.template({input1: this.options.items[0], input2: this.options.items[1], input3: this.options.items[2], input4: this.options.items[3]}));
			}
		});

		return view;
	}
);