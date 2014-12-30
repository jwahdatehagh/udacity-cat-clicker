var Cat = function(name, count, img) {
  this.name = name;
  this.count = count;
  this.img = img;
};
Cat.prototype.incrementCount = function() {
  this.count += 1;
};

var App = {

  data: {
    cats: []
  },

  model: {
    init: function() {
      var cat1 = new Cat('Mausi', 0, 'img/cat1.jpg');
      var cat2 = new Cat('Katzi', 0, 'img/cat2.jpg');
      var cat3 = new Cat('CuddleCat', 0, 'img/cat3.jpg');
      var cat4 = new Cat('Scar', 0, 'img/cat4.jpg');
      App.data.cats.push(cat1);
      App.data.cats.push(cat2);
      App.data.cats.push(cat3);
      App.data.cats.push(cat4);
    }
  },

  octopus: {
    init: function() {
      App.model.init();
    }
  },

  listView: {
    init: function() {
      this.render();
    },

    render: function() {
      // regex: /{{\w[^ }-]*}}/g
      // tag.substring(2, tag.length - 2);
      
    }
  },

  catView: {
    init: function() {
      this.render();
    },

    render: function() {

    }
  }

};

App.octopus.init();