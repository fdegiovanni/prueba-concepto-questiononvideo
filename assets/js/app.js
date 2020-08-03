var App = function(){
    var _init = function () {
        Video.init();
        $.getJSON('./test1.json', function(data) {
            preguntas = data.data;
            _showBoxes();
        });

        $('body').on('click', '.box', function (e) {
            e.preventDefault();
            let code = $(this).attr('data-code');
            let pregunta = preguntas.find( p => p.code == code );
            console.log(pregunta);
            Video.change(pregunta);
        });
    };

    var _showBoxes = function () {
        $.each(preguntas, function (index, p) {
            var html = '<div class="box box-'+p.code+'" style="background-color: '+ getRandomColor() +';" data-code="'+p.code+'" >'+p.code+'.</div>'

            $('.container').append(html);
        })
        
    };



    return{
        init: _init
    };

}();