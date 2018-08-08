
/*Base class conteiner fo HTML elements*/
function Container() {
    this.id = "";
    this.className = "";
    this.htmlCode = "";
}

/*Add method to Container*/

Container.prototype.render = function () {
  return this.htmlCode;
};

Container.prototype.remove = function () {
   for (var property in this){
       console.log(property);
       this[property] = undefined;
   }
};

/*Class menu*/
function Menu(my_id, my_class, my_items) {
    Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
    this.htmlCode = `<ul class="${this.className}" id="${this.id}">`;
    for (var item in this.items){
        if ( this.items[item] instanceof MenuItem){
            this.htmlCode += this.items[item].render();
        }
    }
    this.htmlCode += '</ul>';
    return this.htmlCode;
};

/*Class MenuItem*/
function MenuItem(href, content) {
    Container.call(this);
    this.className = 'menu-item';
    this.href = href;
    this.content = content;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
    this.htmlCode = `<li class="${this.className}"><a href="${this.href}">${this.content}</a></li>`;
    return this.htmlCode;
};

/*Class menu with Submenu*/
function MenuWithInner( globalItems) {
    Menu.call(this);
    this.className = "menu";
    this.items = globalItems
}

MenuWithInner.prototype = Object.create(Menu.prototype);
MenuWithInner.prototype.constructor = MenuWithInner;
MenuWithInner.prototype.render =function () {
    this.htmlCode = `<ul class="${this.className}">`;
    for (var item in this.items){
        if ( this.items[item] instanceof Menu){
            this.htmlCode += `<li>${this.items[item].render()}</li>`;
        } else if(this.items[item] instanceof MenuItem){
            this.htmlCode +=this.items[item].render();
        }
    }
    this.htmlCode += '</ul>';
    return this.htmlCode;
};



var m_item1_1 = new MenuItem("#", "Подменю 1");
var m_item1_2 = new MenuItem("#", "Подменю 2");
var m_item1_3 = new MenuItem("#", "Подменю 3");

var m_item2_1 = new MenuItem("#", "Подменю 1");
var m_item2_2 = new MenuItem("#", "Подменю 2");
var m_item2_3 = new MenuItem("#", "Подменю 3");
var m_item2_4 = new MenuItem("#", "Подменю 4");
var m_item2_5 = new MenuItem("#", "Подменю 5");

var m_item3_1 = new MenuItem("#", "Подменю 1");

var m_item1 = new MenuItem("#", "Меню 1");
var m_item2 = new MenuItem("#", "Меню 2");
var m_item3 = new MenuItem("#", "Меню 3");



var m_items1_1 = {
    0:m_item1_1,
    1:m_item1_2,
    2:m_item1_3,

};

var m_items2_2 = {
    0:m_item2_1,
    1:m_item2_2,
    2:m_item2_3,
    3:m_item2_4,
    4:m_item2_5

};
var m_items3_3 = {0: m_item3_1};


var sub_menu1 = new Menu('sub_menu1', 'sub_menu',m_items1_1);
var sub_menu2 = new Menu('sub_menu1', 'sub_menu',m_items2_2);
var sub_menu3 = new Menu('sub_menu1', 'sub_menu',m_items3_3);

var main_meni_item = {
    0:m_item1,
    1:sub_menu1,
    2:m_item2,
    3:sub_menu2,
    4:m_item3,
    5:sub_menu3
};

var superMenu = new MenuWithInner(main_meni_item );
var div = document.write(superMenu.render());


