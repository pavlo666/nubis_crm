require.config({

	deps: ["main"],

	baseUrl: "js",

	paths: {
		lodash: "libs/lodash.min",
		backbone: "libs/backbone",
		backboneStorage: "libs/backbone-storage",
		text: 'libs/text'
	},

	shim: {
		backbone: {
			deps: ["lodash"],
			exports: "Backbone"
		},
		backboneStorage :{
			deps: ["lodash", "backbone"],
			exports: "Store"
		}
	}
	
});
