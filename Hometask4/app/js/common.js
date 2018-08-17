let autocomplete = function(val, cities){
    $('#autocomplete-list').html('');
    console.log(val);
    let template = new RegExp(`^${val}.+`, 'i');

    if( val.length >= 3){
        for(item of cities){
            if(template.test(item)){
                let listItem = $('<li/>', {text: item});
                $('#autocomplete-list').append(listItem);
            }

        }
    }


};

let  fillCities = function(){
    console.log('filled');
    return ['Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург','Москва', 'Санкт-Петербург'];

};

$(document).ready(()=>{
    let cities = [];
    console.log('hello');
    $('.tab-text').hide();
    $('.first-tab').show();

   $('.control').on('click', '.tab', function(){
       $('.tab').removeClass('active');
       $(this).addClass('active');
       $('.tab-text').hide();
       $(`.content .tab-text:nth-child(${$(this).index()+1})`).show();
   });

   $('#city').on('keyup', function () {
        if (cities.length === 0){
           cities = fillCities();
       }
       autocomplete($(this).val(), cities);
   });

    $('#autocomplete-list').on('click', 'li',function () {
        $('#city').val($(this).html());
        $('#autocomplete-list').html('');
    })

});