var Cat = function(name, count, img) {
  this.name = name;
  this.count = count;
  this.img = img;
};
Cat.prototype.incrementCount = function() {
  this.count += 1;
};


var App = {
  init: function(count, cat) {

    var cat1 = new Cat('Mausi', 0, 'img/cat1.jpg');
    var cat2 = new Cat('Katzi', 0, 'img/cat2.jpg');
    var cat3 = new Cat('CuddleCat', 0, 'img/cat3.jpg');
    var cat4 = new Cat('Scar', 0, 'img/cat4.jpg');
    App.cats.push(cat1);
    App.cats.push(cat2);
    App.cats.push(cat3);
    App.cats.push(cat4);

    App.updateDom('#cats-list');
    App.updateDom('#cats');

    for (var i = 0; i < App.cats.length; i++) {
      var cat = App.cats[i];
      var domListCat = document.querySelector('#list-' + cat.name);

      domListCat.addEventListener('click', (function(catCopy) {
        return function() {
          App.selectedCat = catCopy.name;

          App.updateDom('#cats');
        }
      })(cat));
    }

  },

  selectedCat: null,

  buildTemplate: function(template, data) {
    var string = template.string;

    for (var i = 0; i < template.vars.length; i++) {
      var selector = template.vars[i].toLowerCase();
      var re = new RegExp(template.vars[i], "g");
      string = string.replace(re , data[selector]);
    }

    return string;
  },

  updateDom: function(destination) {
    var strings = [];

    if (destination === '#cats') {
      for (var i = 0; i < App.cats.length; i++) {
        var cat = App.cats[i];

        if (cat.name === App.selectedCat) {
          strings.push(App.buildTemplate(App.templates.cat, cat));
        }

      }
    } else if (destination === '#cats-list') {
      for (var i = 0; i < App.cats.length; i++) {
        var cat = App.cats[i];

        strings.push(App.buildTemplate(App.templates.list, cat));
      }
    }

    var dest = document.querySelector(destination);
    var finalString = '';

    for (var i = 0; i < strings.length; i++) {
      finalString += strings[i];
    }

    dest.innerHTML = finalString;

    if (destination === '#cats') {
      for (var i = 0; i < App.cats.length; i++) {
        var cat = App.cats[i];

        if (cat.name === App.selectedCat) {
          var selector = '#' + cat.name + ' img';

          var domCat = document.querySelector(selector);

          domCat.addEventListener('click', (function(catCopy) {
            return function() {
              catCopy.incrementCount();
            };
          })(cat));
        }

      }
    }

  },

  cats: [],

  templates: {
    cat: {
      id: 'cat',
      vars: ['NAME', 'COUNT', 'IMG'],
      string: '<hr><div class="cat" id="NAME"><p>Count for NAME: <span class="count">COUNT</span></p><img src="IMG" alt="Cat"></div>'
    },
    list: {
      id: 'list',
      vars: ['NAME'],
      string: '<li id="list-NAME">NAME</li>'
    }
  }

};

App.init('#count', '#cat');