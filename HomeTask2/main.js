
function Menu(id, classlist, items) {
    this.id = id;
    this.class = classlist;

    function generateMenu(items) {
        let menuItems = [];
        for (let item of items){
            if (item.hasOwnProperty('submenu')){
                menuItems.push(new SubMenu(item.name, item.submenu))
            } else if(item.hasOwnProperty('href')){
                menuItems.push(new MenuItem(item.name, item.href));
            }
        }
        return menuItems;
    }

    this.items = generateMenu(items);


    this.render = function () {
        let menu =  document.createElement("ul");
        menu.classList.add(this.class);

        for (item of this.items){
            menu.appendChild(item.render());
        }
        return menu;
    }
    
}

function MenuItem(name, href) {
    this.name = name;
    this.href = href;
}
MenuItem.prototype.render = function () {
  let item = document.createElement('li');
  item.innerHTML = `<a href="${this.href}">${this.name}</a>`;
  return item;

};

function SubMenu(name, items){
    this.name = name;
    this.items= new Menu(null, null, items);

    this.render = function () {
        let submenu = document.createElement('li');
        submenu.innerHTML = this.name;
        submenu.appendChild(this.items.render());
       return submenu;
    }
}


const createMenu = function(base){
    let menuStruct = JSON.parse(base);
    let menu = new Menu(null, null, menuStruct);
    let body = document.querySelector('body');
    body.appendChild(menu.render());
};


var testAjax = function () {

    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/hello',true);

    xhr.onreadystatechange = function(){

        if(xhr.readyState !== 4) return;

        if(xhr.status !== 200){
            console.error(xhr.status)
        } else {
            createMenu(xhr.responseText);
        }
    };

    xhr.send();
};



window.onload = function () {
    console.log("hello");
    var getButton = document.querySelector('#get');
    getButton.addEventListener('click', testAjax);
};