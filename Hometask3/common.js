


var textEdit = function(){
    let paragraph = document.querySelector('p.row-text');
    console.log(paragraph.innerText);
    paragraph.innerHTML = paragraph.innerHTML.replace(/([\s\n>\-\t\:]')|('[^a-z0-9])/gi, function (elem) {
        return elem.replace("'", '"');
    });
};

var validateForm = function(){

    let name = document.querySelector('#name');
    if ( !(/[a-z]+/gmi.test(name.value))){
        name.classList.add("invalid");
    } else{
        name.classList.remove('invalid');
    }
};


window.onload = function () {
  let editButton = document.querySelector("#editText")  ;
  editButton.addEventListener('click', textEdit);

  let formButton = document.querySelector('#send-Form');
    formButton.addEventListener('click', (e) =>{
        console.log('click');
        e.preventDefault();
        validateForm();
    })
};