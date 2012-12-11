define( ['lodash', 'backbone', 'backboneStorage', 'crm/contacts/contact-model'],

	function( _, Backbone, Store, Contact) {

		var ContactList = Backbone.Collection.extend({
		
			model: Contact,
		
			localStorage: new Store("contacts-crm")
			
		});
		
		return ContactList;
	}
);