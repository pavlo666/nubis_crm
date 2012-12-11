define(['jquery', 'lodash', 'backbone', 
		'text!templates/contacts/contact-item.htm', "text!templates/contacts/contact-view.htm"],
		
	function($, _, Backbone, contactTpl, contactsTpl) {
	
		var ContactView = Backbone.View.extend({

			tagName:  "tr",

			template: _.template(contactTpl),

			events: {
				"click a.destroy" : "clear" 
			},

			initialize: function() {
				this.model.bind('change', this.render, this);
				this.model.bind('destroy', this.remove, this);
			},

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));      
				return this;
			},

			clear: function() {
				this.model.clear();
			}

		});
		
		var ContactsView = Backbone.View.extend({

			el: $("#contacts"),

			template: _.template(contactsTpl),

			events: {
				"click #new-contact":  "createQuick",
				"click #delete-contact": "clearCompleted"
			},

			initialize: function() {
				$(this.el).html(this.template());

				this.model.bind('add', this.addOne, this);
				this.model.bind('reset', this.addAll, this);

				this.inputName = this.$("#inputName");
				this.inputEmail = this.$("#inputEmail");
				this.inputPhone = this.$("#inputPhone");
					  
				//this.model.fetch();
			},

			addOne: function(contact) {
				var view = new ContactView({model: contact});
				this.$("#crm-contacts-container").append(view.render().el);
			},

			addAll: function(){
				this.model.each(this.addOne); // TODO looks quite bad - refresh DOM on each item.
			},

			createQuick: function(e) {
				if (!this.inputName.val()) return;

				this.model.create({name: this.inputName.val(), email: this.inputEmail.val(), phone: this.inputPhone.val()});
				this.inputName.val('');
				this.inputEmail.val('');
				this.inputPhone.val('');
			},

			clearCompleted: function() {
				_.each(this.model.models, function(model){ model.clear(); });
				return false;
			}

		});
		
		return ContactsView;
	}
);



