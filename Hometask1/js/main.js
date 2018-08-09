/*-------------------------------------------------------------------------------------------------------------------
* Start base class
* ------------------------------------------------------------------------------------------------------------------*/
/*Base class conteiner fo HTML elements*/
function Container() {
    this.id = "";
    this.className = "";
    this.htmlCode = "";
}

/*Add method to Container render*/

Container.prototype.render = function () {
    return this.htmlCode;
};
/*Add method to Container remove
* undefined all properties*/
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
/*Rewriting render method*/
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

/*Rewriting render method*/
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


/*Creating Menu items*/
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
var m_item2_5 = new MenuItem("#", "Меню 2.5");
var m_item3 = new MenuItem("#", "Меню 3");

/*Creatings objects gor menu*/
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


};
var m_items3_3 = {0: m_item3_1};

/*Creating submenus*/
var sub_menu1 = new Menu('sub_menu1', 'sub_menu',m_items1_1);
var sub_menu2 = new Menu('sub_menu1', 'sub_menu',m_items2_2);
var sub_menu3 = new Menu('sub_menu1', 'sub_menu',m_items3_3);

var main_meni_item = [m_item1,sub_menu1,m_item2,sub_menu2, m_item2_5, m_item3, sub_menu3];

/*Create super menu*/
var superMenu = new MenuWithInner(main_meni_item );
var div = document.write(superMenu.render());
/*--------------------------------------------------------------------------------------------------------------------
* Hamburger task
* --------------------------------------------------------------------------------------------------------------------
* */

/*HAMBURGER CONSTANTS*/
function Product(price, kkals, name){
    this.name = name;
    this.price = price;
    this.kkals = kkals;
}

/*Constants*/
HAMBURGER_SIZE_SMALL = new Product(50, 20,'smal');
HAMBURGER_SIZE_BIG = new Product(100, 40,'big');
HAMBURGER_STUFFING_SALAD = new Product(20, 5, 'salad');
HAMBURGER_STUFFING_CHEESE = new Product(10, 20,'cheese');
HAMBURGER_STUFFING_POTATO = new Product(15,10, 'potato');
HAMBURGER_TOPING_MAYO = new Product(20, 5,'mayo');
HAMBURGER_TOPING_SPICE = new Product(15, 0, 'spice');

/*Hamburger Task*/
/*Class of Hamburger
* size - size of burger
* stuffing - stuf of burger ( salad or cheese or potato)
* topings - array of toping*/
function Hamburger( size, stuffing, number ){
    try{
        if (size !== HAMBURGER_SIZE_SMALL && size !==HAMBURGER_SIZE_BIG) throw new Error("HamburgerException");
        if (stuffing !== HAMBURGER_STUFFING_SALAD &&
            stuffing !== HAMBURGER_STUFFING_CHEESE &&
            stuffing !== HAMBURGER_STUFFING_POTATO) throw new Error("HamburgerException");
        Product.call(this);
        var numberHam = number;
        this.size = size;
        this.stuffing = stuffing;
        this.topings = [];
        console.log("Burger created");
        /*Adding toping to ham*/
        this.addTopping = function (toping) {
            try{
                if (toping !== HAMBURGER_TOPING_MAYO &&
                    toping !== HAMBURGER_TOPING_SPICE) throw Error("HamburgerException");
                for (var addedToping of this.topings){
                    if (addedToping === toping) throw Error("HamburgerException");
                }
                this.topings.push(toping);
                this.calculatePrice();
                this.calculateCalories();
                console.log(toping.name +  " Добавлен");

            }catch (HamburgerException) {
                hamburgerException('Невозможно добавить топинг');
            }
        };
        /*Remove toping from Ham*/
        this.removeToping = function (toping) {
            try{
                var index = this.topings.indexOf(toping);
                if (index === -1) throw Error("HamburgerException");
                this.topings.splice(index, 1);
                this.calculatePrice();
                this.calculateCalories();

            }catch (HamburgerException) {
                hamburgerException('Невозможно удалить топинг');
            }
        };
        /*Get list of topings
        * */
        this.getTopings = function () {
          return this.topings;
        };
        /*Get size of burger*/
        this.getSize = function () {
           return this.size.name;
        };
        /*Get stuff of burger*/
        this.getStuffing = function () {
            return this.stuffing.name;
        };
        /*Calculating price*/
        this.calculatePrice = function () {
            this.price = this.size.price + this.stuffing.price;
            for (var tops of this.topings ){
                this.price+= tops.price;
            }
            return this.price;
        };
        /*Calculating Energy price*/
        this.calculateCalories = function () {
            this.kkals = this.size.kkals + this.stuffing.kkals;
            for (var tops of this.topings ){
                this.kkals+= tops.kkals;
            }
            return this.kkals;
        };

    }catch (HamburgerException) {
        hamburgerException('Бургер не создан');
    }
}

function hamburgerException(errorMessage) {
    console.log(errorMessage);
}


/*Tests class hamburger*/
var ham1 =new Hamburger(HAMBURGER_SIZE_SMALL,HAMBURGER_STUFFING_SALAD,0 );
console.log(ham1);
console.log(ham1.getSize());
console.log(ham1.getStuffing());


ham1.addTopping(HAMBURGER_TOPING_SPICE);
ham1.addTopping(HAMBURGER_TOPING_MAYO);
ham1.addTopping(HAMBURGER_TOPING_SPICE);
ham1.addTopping(HAMBURGER_TOPING_MAYO);
ham1.removeToping(HAMBURGER_TOPING_SPICE);


console.log(ham1.calculatePrice());
console.log(ham1.calculateCalories());
/*End hamburger*/

/*-------------------------------------------------------------------------------------------------------------------
* Start coffemachine
* --------------------------------------------------------------------------------------------------------------------*/
/*Coffe class*/
function CoffeType(coffee, water, milk) {
    this.coffee = coffee;
    this.water = water;
    this.milk=milk;
}
/*Popular typos of coffee*/
var espresso = new CoffeType(10, 50, 0);
var capuchino = new CoffeType(10, 100, 20);
var americano = new CoffeType(10, 120, 0);
var ristreto = new CoffeType(20, 50, 0);

/*Class CoffeMachine*/
function CoffeeMachine(power, maxWater, maxCoffee, capuchin, coffeeTypes) {
    var waterAmount = 0;
    var coffee = 0;
    var milk = 0;
    var  coffeeAlow = coffeeTypes;

    var capuchinator =capuchin;

    var timerID = undefined;

    var maxTemp = 90;
    var WATER_HEAT_CAPACUTY= 4200;



    var MAXWATER = maxWater;
    var MAXCOFFEE = maxCoffee;
    var MAXMILK = 1000;
    /*Add water*/
    this.addWater = function (newAmount) {
        if (newAmount >= 0 ) {
            if (waterAmount + newAmount >= MAXWATER){
                waterAmount = MAXWATER;
            }else {
                waterAmount += newAmount;
            }


        } else {
            console.error('Нельзя добавить отрицательное значение!');
        }
    };
    /*Add milk*/
    this.addMilk = function (newMilk) {
        if (newMilk >= 0 ) {
            if( capuchinator === true){
                if (milk + newMilk >=MAXMILK){
                    milk = MAXMILK;
                }else {
                    milk += newMilk;
                }

            }else{
                console.error("Кофеварка не поддерживает молоко");
            }


        } else {
            console.error('Нельзя добавить отрицательное значение!');
        }
    };
    /*Add coffe*/
    this.addCoffee = function (newCoffe) {
        if (newCoffe >= 0 ) {
            if (coffee + newCoffe >= MAXCOFFEE){
                coffee = MAXCOFFEE;
            }else {
                coffee += newCoffe;
            }

        } else {
            console.error('Нельзя добавить отрицательное значение!');
        }
    };
    /*Stop coffemachine*/
    this.stop = function () {
        clearTimeout(timerID);
    };
    /*mAKE COFFE*/
    var makeCoffee = function (coffeType) {
        if( waterAmount >= coffeType.water &&
            coffee >= coffeType.coffee &&
            milk >= coffeType.milk){

                waterAmount -= coffeType.water;
                coffee -= coffeType.coffee;
                milk -= coffeType.milk;
                console.log("Кофе готов");
        }else{
            console.error("Недостаточно ресурсов");
            clearInterval(timerID);
        }
    };

    /*Calculate heating time*/
    var calcBoilTime = function (waterheat) {
        return (waterheat * WATER_HEAT_CAPACUTY * maxTemp) / power;
    };
    /*Get heating time*/
    this.getBoilTime = function(waterheat) {
        return calcBoilTime(waterheat);
    };
    /*Lanch coffemachine*/
    this.launch = function (coffeType) {
        try {

            if (coffeeAlow.indexOf(coffeType) === -1) throw Error();
            timerID = setInterval( function () {
                makeCoffee(coffeType);
            }, calcBoilTime(coffeType.water));



        }catch(e){
            console.error("Unknown type of Coffee")
        }

    }
}
/*Test coffemachine*/
var vitek = new CoffeeMachine(3500, 500,200, false, [espresso, americano]);

vitek.addWater(100);
vitek.addCoffee(50);
vitek.addMilk(100);
console.log(vitek.getBoilTime(espresso.water));
//vitek.launch(espresso);

var philips = new CoffeeMachine(6500, 1000,200, true, [espresso, americano, capuchino, ristreto]);

philips.addWater(500);
philips.addCoffee(300);
philips.addMilk(300);

philips.launch(capuchino);