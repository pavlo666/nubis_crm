define(['lodash', 'backbone',
		'crm/general/quick-add-view',
		'text!templates/contacts/contact-item.htm', "text!templates/contacts/contact-view.htm"],

	function(_, Backbone, QuickAddView, contactTpl, contactsTpl) {

		var ContactView = Backbone.View.extend({

			tagName:  "tr",

			template: _.template(contactTpl),

			events: {
				"click a.destroy" : "clear",
				"click .checkbox-list": "selectSimpleCheckbox",
				"click #edit": "editDialog"
			},

			initialize: function() {
				this.model.bind('change', this.render, this);
				this.model.bind('destroy', this.remove, this);
				this.model.bind('editDialog', this);
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

			},

			editDialog: function() {
				var attr = this.model.attributes;
				$("#editId").val(attr.id);
				$("#editName").val(attr.name);
				$("#editClient").val(attr.client);
				$("#editEmail").val(attr.email);
				$("#editPhone").val(attr.phone);
			}

		});

		var ContactsView = Backbone.View.extend({

			el: $("#contacts"),

			template: _.template(contactsTpl),

			events: {
				"click #new-contact":  "createQuick",
				"click #delete-contact": "clearCompleted",
				"click #save-new-contact": "saveNewContact",
				"click #all_checkbox": "selectAllCheckboxes",
				"click #save-edit-contact": "saveEditContact"
			},

			initialize: function() {
				$(this.el).html( this.template() );
				new QuickAddView({el: $("#contact-sidebar"), items: ["Name", "Email", "Phone", "#advancedContact"]});

				this.model.bind('add', this.addOne, this);
				this.model.bind('reset', this.addAll, this);
				this.model.bind('selectAllCheckboxes', this);

				this.inputName = this.$("#inputName");
				this.inputEmail = this.$("#inputEmail");
				this.inputPhone = this.$("#inputPhone");

				//advanced dialog
				this.contactName = this.$("#contactName");
				this.contactEmail = this.$("#contactEmail");
				this.contactClient = this.$("#contactClient");
				this.contactPhone = this.$("#contactPhone");

				//edit dialog
				this.editName = this.$("#editName");
				this.editClient = this.$("#editClient");
				this.editEmail = this.$("#editEmail");
				this.editPhone = this.$("#editPhone");

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
				var checkbox_status;
				if($("#all_checkbox").is(":checked")){
					checkbox_status = true;
				} else {
					checkbox_status = false;
				}

				_.each(this.model.models, function( model ) {
					$(".checkbox-list").attr("checked", checkbox_status);
					model.attributes.checked = checkbox_status;
				});
				$("#all_checkbox").attr("checked", checkbox_status);
			},

			createQuick: function(e) {
				if (!this.inputName.val()) return;

				this.model.create({
					checked: false,
					name: this.inputName.val(),
					email: this.inputEmail.val(),
					phone: this.inputPhone.val()
				});
				this.inputName.val('');
				this.inputEmail.val('');
				this.inputPhone.val('');
			},

			clearCompleted: function() {
				if($("#all_checkbox").is(":checked")) {
					$("#all_checkbox").attr("checked", false);
				}
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
			},

			saveNewContact: function() {
				if($("#contactName").val() == '') {
					$(".text-error").removeClass("hidden");
					return;
				}
				$(".text-error").addClass("hidden");
				$("#advancedContact").modal('hide');
				this.model.create({
					checked: false,
					name: this.contactName.val(),
					client: this.contactClient.val(),
					email: this.contactEmail.val(),
					phone: this.contactPhone.val()
				});

				this.contactName.val('');
				this.contactEmail.val('');
				this.contactClient.val('');
				this.contactPhone.val('');
			},

			saveEditContact: function() {
				if($("#editName").val() == '') {
					$(".text-error").removeClass("hidden");
					return false;
				} else {
					$(".text-error").addClass("hidden");
				}

				var contact = this.model.get($("#editId").val());
					contact.save({
						checked: false,
						name: $("#editName").val(),
						email: $("#editEmail").val(),
						phone: $("#editPhone").val()
					});
				$("#editContact").modal('hide');
			}
		});

		return ContactsView;
	}
);



