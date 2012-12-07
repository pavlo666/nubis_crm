// Load the application once the DOM is ready, using `jQuery.ready`:
// TODO remove DOM ready 
$(function(){

  // Contact Model
  // ----------
  var Contact = Backbone.Model.extend({
  
    defaults: function() {
      return {
        // tbd       
      };
    },
	
    initialize: function() {},
	
    clear: function() {
      this.destroy();
    }
	
  });

  // Contact Collection
  // ---------------
  var ContactList = Backbone.Collection.extend({

    model: Contact,

    localStorage: new Store("contacts-crm")
  });

  var Contacts = new ContactList;
  
  require(["text!js/crm/contacts/contactTemplate.htm", "text!js/crm/contacts/contacts.htm"], function(contactTpl, contactsTpl){ 
	  	  
	  // Contact Item View
	  // --------------
	  var ContactView = Backbone.View.extend({

		tagName:  "tr",

		template: _.template(contactTpl),

		events: {
		  "click a.destroy" : "clear" 
		},
		
		initialize: function() {
		  this.model.bind('change', this.render, this);
		  this.model.bind('destroy', this.remove, this);
		},

		render: function() {
		  this.$el.html(this.template(this.model.toJSON()));      
		  return this;
		},
		
		clear: function() {
		  this.model.clear();
		}

	  });
	  
	  // The Contacts View
	  // ---------------
	  var ContactsView = Backbone.View.extend({
		
		el: $("#tab4"),
		
		template: _.template(contactsTpl),

		events: {
		  "click #new-contact":  "createQuick",
		  "click #delete-contact": "clearCompleted"
		},

		initialize: function() {
		  $(this.el).html(this.template());
		  
		  Contacts.bind('add', this.addOne, this);
		  Contacts.bind('reset', this.addAll, this);
		  
		  this.inputName = this.$("#inputName");
		  this.inputEmail = this.$("#inputEmail");
		  this.inputPhone = this.$("#inputPhone");
		  		  
		  Contacts.fetch();
		},

		addOne: function(contact) {
		  var view = new ContactView({model: contact});
		  this.$("#crm-contacts-container").append(view.render().el);
		},
		
		addAll: function(){
			Contacts.each(this.addOne); // TODO looks quite bad - refresh DOM on each item.
		},

		createQuick: function(e) {
		  if (!this.inputName.val()) return;

		  Contacts.create({name: this.inputName.val(), email: this.inputEmail.val(), phone: this.inputPhone.val()});
		  this.inputName.val('');
		  this.inputEmail.val('');
		  this.inputPhone.val('');
		},

		clearCompleted: function() {
		  _.each(Contacts.models, function(model){ model.clear(); });
		  return false;
		}

	  });

		var App = new ContactsView;
	});
});
