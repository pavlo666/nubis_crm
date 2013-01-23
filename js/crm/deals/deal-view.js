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
			},
			
			initialize: function() {
				var model = this.model;
				model.bind('change', this.render, this);
				model.bind('destroy', this.remove, this);
				model.bind('selectSimpleCheckbox', this);
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
		
		var DealsView = Backbone.View.extend({
	
				el: $("#deals"),
	
				template: _.template(dealsTpl),
				
				events: {
					"click #new-contact": "createQuick",
					"click #delete-item": "clearCompleted",
					"click #save-new-deal": "saveNewDeal",
					"click #all_checkbox": "selectAllCheckboxes"
				},
				
				initialize: function() {
					$(this.el).html( this.template() );
					new QuickAddView({el: $("#deal-sidebar"), items: ["Title", "Contact", "Company"]});
					
					this.model.bind('add', this.addOne, this);
					this.model.bind('reset', this.addAll, this);
					this.model.bind('clearCompleted', this);
					this.model.bind('selectAllCheckboxes', this);
					
					this.inputTitle = this.$("#inputTitle");
					this.inputContact = this.$("#inputContact");
					this.inputCompany = this.$("#inputCompany");
					this.dealTitle = this.$("#dealTitle");
					this.dealClient = this.$("#dealClient");
					this.dealContacts = this.$("#dealContacts");
					this.dealStatus = this.$("#dealStatus");
					this.dealType = this.$("#dealType");
					this.dealDescription = this.$("#dealDescription");
					
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
					if($("#all_checkbox").hasClass("unchecked")) {
						_.each(this.model.models, function( model ){
							$(".checkbox-list").attr("checked","checked");
							model.attributes.checked = true;
						});
						$("#all_checkbox").removeClass("unchecked").addClass("checked");
					} else {
						_.each(this.model.models, function( model ){
							$(".checkbox-list").removeAttr("checked");
							model.attributes.checked = false;
						});
						$("#all_checkbox").removeClass("checked").addClass("unchecked");
					}
				},
				
				createQuick: function(e) {
					if (!this.inputTitle.val()) return;
					this.model.create({checked: false, title: this.inputTitle.val(), contact: this.inputContact.val(), client: this.inputCompany.val()});
					this.inputTitle.val('');
					this.inputContact.val('');
					this.inputCompany.val('');					
				},
				
				clearCompleted: function() {
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
					this.model.create({checked: false, title: this.dealTitle.val(), contact: this.dealContacts.val(), client: this.dealClient.val(), status: this.dealStatus.val(), 
									   type: this.dealType.val(), description: this.dealDescription.val()});
					this.dealTitle.val('');
					this.dealContact.val('');
					this.dealCompany.val('');
					this.dealStatus.val('');
					this.dealType.val('');
					this.dealDescription.val('');
					$('#advancedDeal').addClass("hidden");
				}
			});
		
		return DealsView;
	}
);