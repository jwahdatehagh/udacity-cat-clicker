var Cat = function(name, count, img) {
  this.name = name;
  this.count = count;
  this.img = img;
};
Cat.prototype.incrementCount = function() {
  var selector = '#' + this.name + ' span.count';

  this.count += 1;
  document.querySelector(selector).innerHTML = this.count;
};


var App = {
  init: function(count, cat) {
    var cat1 = new Cat('Mausi', 0, 'img/cat1.jpg');
    var cat2 = new Cat('Katzi', 0, 'img/cat2.jpg');
    App.cats.push(cat1);
    App.cats.push(cat2);

    App.updateDom('#cats');

    var cat1Selector = '#' + cat1.name + ' img';
    var cat2Selector = '#' + cat2.name + ' img';

    document.querySelector(cat1Selector).onclick = function() {
      cat1.incrementCount();
    };
    document.querySelector(cat2Selector).onclick = function() {
      cat2.incrementCount();
    };

  },

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

    for (var i = 0; i < App.cats.length; i++) {
      var cat = App.cats[i];

      strings.push(App.buildTemplate(App.templates.cat, cat));

    }

    var dest = document.querySelector(destination);
    var finalString = '';

    for (var i = 0; i < strings.length; i++) {
      finalString += strings[i];
    }

    dest.innerHTML = finalString;

  },

  cats: [],

  templates: {
    cat: {
      id: 'cat',
      vars: ['NAME', 'COUNT', 'IMG'],
      string: '<hr><div class="cat" id="NAME"><p>Count for NAME: <span class="count">COUNT</span></p><img src="IMG" alt="Cat"></div>'
    }
  }

};

App.init('#count', '#cat');