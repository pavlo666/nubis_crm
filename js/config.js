require.config({

	deps: ["main"],

	baseUrl: "js",

	paths: {
		jquery: "libs/jquery-1.8.2.min",
		lodash: "libs/lodash.min",
		backbone: "libs/backbone",
		backboneStorage: "libs/backbone-storage",
		text: 'libs/text'
	},

	shim: {
		backbone: {
			deps: ["lodash", "jquery"],
			exports: "Backbone"
		},
		backboneStorage :{
			deps: ["lodash", "jquery", "backbone"],
			exports: "Store"
		}
	}
	
});
