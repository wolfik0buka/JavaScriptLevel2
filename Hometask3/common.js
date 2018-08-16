


var textEdit = function(){
    let paragraph = document.querySelector('p.row-text');
    console.log(paragraph.innerText);
    paragraph.innerHTML = paragraph.innerHTML.replace(/([\s\n>\-\t\:]')|('[^a-z0-9])/gi, function (elem) {
        return elem.replace("'", '"');
    });
};

var isValidField = function (field, template) {
    console.log(`valid ${field.value}`);
    if (template.test(field.value)){
        field.classList.remove('invalid');
        console.log(`valid OK`);
        return true;

    } else{
        field.classList.add("invalid");
        console.log('valid BAD');
        return false;

    }

};

var validateForm = function(){

    var allValid = true;
    var name = document.querySelector('#name');
    var phone = document.querySelector("#phone");
    var mail = document.querySelector('#email');

    allValid &= isValidField(name,/^[a-zа-яё]+$/i);
    allValid &= isValidField(phone,/^\+7\(\d{3}\)\d{3}-\d{4}$/);
    /*Не используется \w потому что включает также _, которое по условию запрещено*/
    allValid &= isValidField(mail, /^[a-z0-9]+[a-z0-9.-]+@[a-z0-9.-]+\.[a-z0-9]{2,}$/i);

    /*Не использутеся конструкция if (isValidField(name,/[a-z]+/gi) &&
        isValidField(phone,/^\+7\(\d{3}\)\d{3}-\d{4}$/) &&
        isValidField(mail, /\w/)
        Потому что, если хотя бы одно поле на валидно, проверка завершается, следовательно пользователю
        не будет сообщено обо всех ошибках сразу*/

    if (allValid){
        name.value ='';
        phone.value = '';
        mail.value = '';
        document.querySelector('#message').value = '';
        var notify = document.createElement("div");
        notify.classList.add("notify");
        notify.innerHTML = "<p>Форма успешно отправлена</p>";
        document.querySelector('section.feedback').appendChild(notify);
        setTimeout(()=> {
            document.querySelector('section.feedback').removeChild(notify)
        }, 1000);
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