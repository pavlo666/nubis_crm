require(['lodash', 'backbone', 
		'crm/contacts/contact-view', "crm/contacts/contact-collection",
		'crm/deals/deal-view', 'crm/calendar/calendar-view',
		'crm/calls/call-view', 'crm/billing/billing-view',
		'crm/tasks/task-view', 'crm/journal/journal-view', 
		'crm/docs/docs-view'
		],

	function (_, Backbone, ContactsView, ContactList,
			DealsView, CalendarView, CallsView, BillingView, TasksView, JournalView, DocsView) {

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
				new TasksView().render();
			},
			
			calendar: function() {
				$('a[href="#calendar"]').tab('show');
				new CalendarView().render();
			},			
		
			deals: function() {
				$('a[href="#deals"]').tab('show');
				new DealsView().render();
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
				new DocsView();
			},
			
			calls: function() {
				$('a[href="#calls"]').tab('show');
				new CallsView().render();
			},			
			
			billing: function() {
				$('a[href="#billing"]').tab('show');
				new BillingView().render();
			},
			
			journal: function() {
				$('a[href="#journal"]').tab('show');
				new JournalView().render();
			},
			
		});
		
		window.app = new AppRouter();
		Backbone.history.start();
		app.navigate("tasks", {trigger: true, replace: true});
	}
);
	
	


