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

function ajaxRequest() {
    return $.ajax({
        url: 'http://localhost:8000/getCities',
        type:'get',
        dataType: 'json',

    });
}

let  fillCities = function() {
    let cities;
    $.when(ajaxRequest()).then(function (res) {
        cities = res;
    });
    console.log(cities);
    console.log('filled');
    return cities;

};

 /*   $.ajax({
        url: 'http://localhost:8000/getCities',
        type:'get',
        dataType: 'json',
        success :(data) => {
            var cities = data;
            return cities;

        },
        error : (err) => {
            console.error(err);
        }
    });
    console.log(cities);
    console.log('filled');



};
*/
$(document).ready(()=>{
    var cities = [];
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
            $.ajax({
                url: 'http://localhost:8000/getCities',
                type:'get',
                dataType: 'json',
                success :(data) => {
                    cities = data;
                    return cities;

                },
                error : (err) => {
                    console.error(err);
                }
            });
       }
       autocomplete($(this).val(), cities);
   });

    $('#autocomplete-list').on('click', 'li',function () {
        $('#city').val($(this).html());
        $('#autocomplete-list').html('');
    })

});