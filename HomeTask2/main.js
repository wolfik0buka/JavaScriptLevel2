
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
    let menuSection = document.querySelector('section.menu');
    menuSection.innerHTML = '';
    menuSection.appendChild(menu.render());
};

const createGalery = function (rowData) {
    let parrent = document.querySelector("section.galery");
    parrent.innerHTML = '';
    let data ='';
    let listImages = JSON.parse(rowData);
    for (let image of listImages ){

        let item = document.createElement('a');
        item.href = image.href;
        item.classList.add('galery-item');
        item.innerHTML = `<img src="${image.preview}" alt="Galery Item">`;
        parrent.appendChild(item);
    }
};

var createUserList = function(data){
    let parrent = document.querySelector(".list-user");
    parrent.innerHTML = '';
    for (let user of data){
        let userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `<p><span>Name: </span>${user.name}</p>
                             <p><span>E-mail: </span><a href="mailto:${user.email}">${user.email}</a></p>
                             <p><span>Age: </span>${user.age}</p>`;
        parrent.appendChild(userDiv);
    }
};

var createUser = function(data){
    let parrent = document.querySelector(".selectedUser");
    parrent.innerHTML = '';
    if (data.hasOwnProperty('name')){
        let userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `<p><span>Name: </span>${data.name}</p>
                             <p><span>E-mail: </span><a href="mailto:${data.email}">${data.email}</a></p>
                             <p><span>Age: </span>${data.age}</p>`;
        parrent.appendChild(userDiv);
    }
    else {
        let error = document.createElement('p');
        error.innerText = 'Такого пользователя не существует';
        parrent.appendChild(error);
    }
};


var getMenu = function () {
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/getMenu',true);
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

var getGalery = function () {
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/getGalery');
    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4) return;
        if(xhr.status !== 200){
            console.error(xhr.status)
        } else {
            createGalery(xhr.responseText);
        }
    };
    xhr.send();
};

var getUserList = function(){
    fetch('http://89.108.65.123/user').then((res) => {
       return res.json();
    }).then((data) =>{
        createUserList(data);
    }).catch((err) =>{
        console.error(err);
    })
};
var getUserId = function(){
    let idUser = document.querySelector("#id-user");
    fetch(`http://89.108.65.123/user/${idUser.value}`).then((res) => {
        return res.json();
    }).then((data) =>{
        createUser(data);
    }).catch((err) =>{
        console.error(err);
    });
};
var notifySucsess = function () {
    let notify = document.createElement("p");
    notify.classList.add('notify');
    notify.innerText = "Пользователь успешно добавлен";
    let parent = document.querySelector("div.notify");
    parent.appendChild(notify);
    setTimeout(() =>{
        parent.removeChild(notify);
    }, 1000);
};

var addUser = function(){
    let newUser = {
        name : document.querySelector("#Name-User").value,
        email : document.querySelector("#Email-User").value,
        age : document.querySelector("#age-User").value,
    };

    fetch(`http://89.108.65.123/user/`, {
        method: 'POST',
        body : JSON.stringify(newUser)
    }).then((res) => {
        notifySucsess();
    }).catch((err) =>{
        console.error(err);
    });
    console.log(newUser);
};

window.onload = function () {

    var menuButton = document.querySelector('#getMenu');
    menuButton.addEventListener('click', getMenu);

    var galeryButton = document.querySelector('#getGalery');
    galeryButton.addEventListener('click', getGalery);

    var listUserButton = document.querySelector('#getUserList');
    listUserButton.addEventListener('click', getUserList);

    var idUserButton = document.querySelector('#getUserId');
    idUserButton.addEventListener('click', getUserId);

    var addUserButton = document.querySelector('#addUser');
    addUserButton.addEventListener('click', (e) =>{
        e.preventDefault();
        addUser()
    });

};