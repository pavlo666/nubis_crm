var Contact = Backbone.Model.extend({
  
	defaults: function() {
		return {};
	},

	clear: function() {
		this.destroy();
	}
});

var ContactList = Backbone.Collection.extend({
	
	model: Contact,
	
	localStorage: new Store("contacts-crm")
		
});

var Contacts = new ContactList;