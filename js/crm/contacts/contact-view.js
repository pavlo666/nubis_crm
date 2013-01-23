define(['lodash', 'backbone', 
		'crm/general/quick-add-view',
		'text!templates/contacts/contact-item.htm', "text!templates/contacts/contact-view.htm"],
		
	function(_, Backbone, QuickAddView, contactTpl, contactsTpl) {
	
		var ContactView = Backbone.View.extend({

			tagName:  "tr",

			template: _.template(contactTpl),

			events: {
				"click a.destroy" : "clear",
				"click .checkbox-list": "selectSimpleCheckbox"
			},

			initialize: function() {
				this.model.bind('change', this.render, this);
				this.model.bind('destroy', this.remove, this);
			},

			render: function() {
				this.$el.html( this.template(this.model.toJSON()) );
				return this;
			},

			clear: function() {
				this.model.clear();
			},
			
			selectSimpleCheckbox: function() {
				(this.model.attributes.checked == false) ?  this.model.attributes.checked = true : this.model.attributes.checked = false;
				
			}

		});
		
		var ContactsView = Backbone.View.extend({

			el: $("#contacts"),

			template: _.template(contactsTpl),

			events: {
				"click #new-contact":  "createQuick",
				"click #delete-contact": "clearCompleted",
				"click #all_checkbox": "selectAllCheckboxes"
			},

			initialize: function() {
				$(this.el).html( this.template() );
				new QuickAddView({el: $("#contact-sidebar"), items: ["Name", "Email", "Phone"]});

				this.model.bind('add', this.addOne, this);
				this.model.bind('reset', this.addAll, this);
				this.model.bind('selectAllCheckboxes', this);

				this.inputName = this.$("#inputName");
				this.inputEmail = this.$("#inputEmail");
				this.inputPhone = this.$("#inputPhone");
					  
				this.addAll();
			},

			addOne: function(contact) {
				var view = new ContactView({model: contact});
				this.$("#crm-contacts-container").append(view.render().el);
			},

			addAll: function(){
				this.model.each(this.addOne); // TODO looks quite bad - refresh DOM on each item.
			},
			
			selectAllCheckboxes: function() {
				if($("#all_checkbox").hasClass("unchecked")){
					_.each(this.model.models, function( model ) {
						$(".checkbox-list").attr("checked","checked");
						model.attributes.checked = true;
					});
					$("#all_checkbox").removeClass("unchecked").addClass("checked");
				} else {
					_.each(this.model.models, function ( model ) {
						$(".checkbox-list").removeAttr("checked");
						model.attributes.checked = false;
					});
					$("#all_checkbox").removeClass("checked").addClass("unchecked");
				}
			},

			createQuick: function(e) {
				if (!this.inputName.val()) return;

				this.model.create({checked: false, name: this.inputName.val(), email: this.inputEmail.val(), phone: this.inputPhone.val()});
				this.inputName.val('');
				this.inputEmail.val('');
				this.inputPhone.val('');
			},

			clearCompleted: function() {
				var model_array = []
				_.each(this.model.models, function( model ){
					if(model.attributes.checked == true) {
						model_array.push( model );
					}
				});
				
				_.each(model_array, function( model ) {
					model.clear();
				});
				
				return false;
			}

		});
		
		return ContactsView;
	}
);



