define(['lodash', 'backbone',
		'crm/general/quick-add-view',
		'text!templates/deals/deal-item.htm', 'text!templates/deals/deal-view.htm'],

	function(_, Backbone, QuickAddView, dealTpl, dealsTpl) {

		var DealView = Backbone.View.extend({

			tagName: "tr",

			template: _.template(dealTpl),

			events: {
				"click a.destroy": "clear",
				"click .checkbox-list": "selectSimpleCheckbox",
				"click #edit": "editDialog"
			},

			initialize: function() {
				var model = this.model;
				model.bind('change', this.render, this);
				model.bind('destroy', this.remove, this);
				model.bind('selectSimpleCheckbox', this);
				model.bind('editDialog', this);
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
				$("#editTitle").val(attr.title);
				$("#editClient").val(attr.client);
				$("#editContacts").val(attr.contact);
				$("#editStatus").val(attr.status);
				$("#editType").val(attr.type);
				$("#editDescription").val(attr.description);
			}
		});

		var DealsView = Backbone.View.extend({

				el: $("#deals"),

				template: _.template(dealsTpl),

				events: {
					"click #new-contact": "createQuick",
					"click #delete-item": "clearCompleted",
					"click #save-new-deal": "saveNewDeal",
					"click #save-edit-deal": "saveEditDeal",
					"click #all_checkbox": "selectAllCheckboxes"
				},

				initialize: function() {
					$(this.el).html( this.template() );
					new QuickAddView({el: $("#deal-sidebar"), items: ["Title", "Contact", "Company", "#advancedDeal"]});

					this.model.bind('add', this.addOne, this);
					this.model.bind('reset', this.addAll, this);
					this.model.bind('clearCompleted', this);
					this.model.bind('selectAllCheckboxes', this);

					this.inputTitle = this.$("#inputTitle");
					this.inputContact = this.$("#inputContact");
					this.inputCompany = this.$("#inputCompany");

					//advanced dialog
					this.dealTitle = this.$("#dealTitle");
					this.dealClient = this.$("#dealClient");
					this.dealContacts = this.$("#dealContacts");
					this.dealStatus = this.$("#dealStatus");
					this.dealType = this.$("#dealType");
					this.dealDescription = this.$("#dealDescription");

					//edit dialog
					this.editTitle = this.$("#editTitle");
					this.editClient = this.$("#editClient");
					this.editContacts = this.$("#editContacts");
					this.editStatus = this.$("#editStatus");
					this.editType = this.$("#editType");
					this.editDescription = this.$("#editDescription");

					this.addAll();
				},

				addOne: function(deal) {
					var view = new DealView({model: deal});
					this.$("#crm-deals-container").append(view.render().el);
				},

				addAll: function(){
					this.model.each(this.addOne); // TODO looks quite bad - refresh DOM on each item.
				},

				selectAllCheckboxes: function() {
					var checkbox_status = $("#all_checkbox").is(":checked");

					_.each(this.model.models, function( model ) {
						$(".checkbox-list").attr("checked", checkbox_status);
						model.attributes.checked = checkbox_status;
					});
				},

				createQuick: function(e) {
					if (!this.inputTitle.val()) return;
					this.model.create({
						checked: false,
						title: this.inputTitle.val(),
						contact: this.inputContact.val(),
						client: this.inputCompany.val()
					});

					this.inputTitle.val('');
					this.inputContact.val('');
					this.inputCompany.val('');
				},

				clearCompleted: function() {
					$("#all_checkbox").attr("checked", false);

					var model_array = [];
					_.each(this.model.models, function( model ){
						if(model.attributes.checked == true) {
							model_array.push(model);
						}
					});

					_.each(model_array, function( model ) {
						model.clear();
					});

					return false;
				},

				saveNewDeal: function() {
					if($("#dealTitle").val() == '') {
						$(".text-error").removeClass("hidden");
						return;
					}
					$(".text-error").addClass("hidden");
					$("#advancedDeal").modal('hide');
					this.model.create({
						checked: false,
						title: this.dealTitle.val(),
						contact: this.dealContacts.val(),
						client: this.dealClient.val(),
						status: this.dealStatus.val(),
						type: this.dealType.val(),
						description: this.dealDescription.val()
					});

					this.dealTitle.val('');
					this.dealContact.val('');
					this.dealCompany.val('');
					this.dealStatus.val('');
					this.dealType.val('');
					this.dealDescription.val('');
				},

				saveEditDeal: function( model ) {
					if($("#editTitle").val() != '') {
						$(".text-error").removeClass("hidden");
						return;
					}

					$(".text-error").addClass("hidden");

					var deal = this.model.get($("#editId").val());

						deal.save({
							checked: false,
							title: $("#editTitle").val(),
							contact: $("#editContacts").val(),
							client: $("#editClient").val(),
							status: $("#editStatus").val(),
							type: $("#editType").val(),
							description: $("#editDescription").val()
						});
					$("#editDeal").modal('hide');
				}
			});

		return DealsView;
	}
);