define( ['lodash', 'backbone', 'backboneStorage', 'crm/deals/deal-model'],

	function( _, Backbone, Store, Deal) {

		var DealList = Backbone.Collection.extend({
		
			model: Deal,
		
			localStorage: new Store("deals-crm")
			
		});
		
		return DealList;
	}
);