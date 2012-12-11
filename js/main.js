require(['lodash', 'backbone', 'crm/contacts/contact-view', "crm/contacts/contact-collection"],

	function (_, Backbone, ContactsView, ContactList) {

		Backbone.View.prototype.close = function() {
			console.log('Closing view ' + this);
			if (this.beforeClose) {
				this.beforeClose();
			}
			this.remove();
			this.unbind();
		};
		
		var AppRouter = Backbone.Router.extend({
			routes: {
				"tasks": "tasks",				
				"calendar" : "calendar",
				"deals" : "deals",
				"contacts": "contacts",
				"docs": "docs",
				"calls": "calls",
				"billing": "billing",
				"journal": "journal"
			},
			
			
			tasks: function() {
				$('a[href="#tasks"]').tab('show');
				// TODO
			},
			
			calendar: function() {
				$('a[href="#calendar"]').tab('show');
				// TODO
			},
			
			
			deals: function() {
				$('a[href="#deals"]').tab('show');
				// TODO
			},
						
			contacts: function() {
				$('a[href="#contacts"]').tab('show');
				if (!this.contactList) {
					this.contactList = new ContactList();
					var self = this;
					this.contactList.fetch({
						success: function() {
							var contactList = new ContactsView({
								model: self.contactList
							}).render();
						}
					});
				}
			},			
			
			docs: function() {
				$('a[href="#docs"]').tab('show');
				// TODO
			},
			
			calls: function() {
				$('a[href="#calls"]').tab('show');
				// TODO
			},
			
			
			billing: function() {
				$('a[href="#billing"]').tab('show');
				// TODO
			},
			
			journal: function() {
				$('a[href="#journal"]').tab('show');
				// TODO
			},
			
		});
		
		window.app = new AppRouter();
		Backbone.history.start();
		app.navigate("tasks", {trigger: true, replace: true});
	}
);
	
	


