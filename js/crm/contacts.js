
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

  // Contact Item View
  // --------------
  var ContactView = Backbone.View.extend({

    tagName:  "tr",

    template: _.template($('#contact-item-template').html()),

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

    events: {
      "click #new-contact":  "createQuick",
      "click #delete-contact": "clearCompleted"
    },

    initialize: function() {
      this.inputName = this.$("#inputName");
	  this.inputEmail = this.$("#inputEmail");
	  this.inputPhone = this.$("#inputPhone");
      Contacts.bind('add', this.addOne, this);
	  Contacts.bind('reset', this.addAll, this);
      Contacts.fetch();
    },

    render: function() {},

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
