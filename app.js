var Cat = function(name, count, img) {
  this.name = name;
  this.count = count;
  this.img = img;
};
Cat.prototype.incrementCount = function() {
  this.count += 1;
};


var App = {

  model: {
    cats: [],
    
    selectedCat: null,

    init: function() {
      App.model.cats.push(
        new Cat('Mausi', 0, 'img/cat1.jpg'),
        new Cat('Katzi', 0, 'img/cat2.jpg'),
        new Cat('CuddleCat', 0, 'img/cat3.jpg'),
        new Cat('Scar', 0, 'img/cat4.jpg')
      );
    }
  },

  octopus: {
    init: function() {
      App.model.init();
      App.listView.init();
    },

    bindCatImgClickEvent: function(selectedCat) {
      $('#' + selectedCat.name).on('click', (function(catCopy) {
        return function() {
          catCopy.incrementCount();
          App.catView.render();
        };
      })(selectedCat));
    },

    bindCatListClickEvents: function() {
      var cats = App.model.cats;
      var catsLength = cats.length;
      for (var i = 0; i < catsLength; i++) {
        var cat = cats[i];
        var domListCat = document.querySelector('#list-' + cat.name);

        domListCat.addEventListener('click', (function(catCopy) {
          return function() {
            App.model.selectedCat = catCopy;

            App.catView.render();
          }
        })(cat));
      }
    }

  },

  view: {
    render: function(name, destination, data) {
      var finalTemplate = '';
      
      // build up the final template for each data set
      for(var i = 0; i < data.length; i++) {
        finalTemplate += this.buildTemplate(name, data[i]);
      }

      $(destination).html(finalTemplate);
    },

    buildTemplate: function(name, data) {

      // setup
      var templateVars = [];
      var template = $('script[data-template="' + name + '"]').html();

      // find all the templateVars in the template string
      for (var i = 0; i < template.length; i = firstPos > -1 ? firstPos + 1 : template.length) {
        var firstPos = template.indexOf('{{', i);
        var lastPos = template.indexOf('}}', firstPos);

        if (firstPos > -1) {
          templateVars.push(template.substring(firstPos + 2, lastPos));
        }
      }
      
      // replace the tags in the template with actual data
      for (var i = 0; i < templateVars.length; i++) {
        var tag = templateVars[i];
        var re = new RegExp('{{' + tag + '}}', "g");
        template = template.replace(re , data[tag]);
      }

      return template;
    }
  },

  listView: {
    init: function() {
      this.render();
    },

    render: function() {
      App.view.render('list', '#cats-list', App.model.cats);
      App.octopus.bindCatListClickEvents();
    }

  },

  catView: {
    render: function() {
      var selectedCat = App.model.selectedCat;
      if (selectedCat) {
        App.view.render('cat', '#cat', [selectedCat]);

        App.octopus.bindCatImgClickEvent(selectedCat);
      }
    }
  }

};

App.octopus.init();