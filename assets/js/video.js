var Video = (function () {
    var vid = document.getElementById("myVideo");
    var fillBar = document.getElementById("fill");
    var currentTime = document.getElementById("currentTime");
    var volumeSlider = document.getElementById("volume");

    var vidError;
    
    var _questionTime = null;


  var _initComponent = function () {
    
    $('#playBtn').click(function (e) {
        e.preventDefault();
        playOrPause();
    })
  
    $('#volume').change(function () {
        changeVolume();
    });

    $('body').on('click', '.q_answer', function (e) {
        e.preventDefault();
        const resp = $(this).attr('data-response');
        let response = JSON.parse(resp);
        if(response.is_correct){
            alert("correcto!!");
            $('#modal').modal('hide');
            playOrPause();

        }else{
            alert("buuuuuu!!");
            var html = '<video height="90%" width="90%" id="videoError" controls>'
                    +'<source src="' + response.extra.resource + '" >'                        
                    +'</video>';
            $("#video-error").append(html);
            vidError = $("#videoError");

            vidError.on("ended", function () {
                console.log(console.time);
                _toggleInModal();
                $("#video-error").children().remove();
                $('#modal').modal('hide');
                _toggle();
            });

            _toggleInModal();
        }
    });

   
  };

  var _change = function (data) {
    $('#myVideo').prop('src', data.resource);
    $("#playBtn").attr("src", "../assets/images/Pause.png");
    _ask(data);
    _toggle();        
  };

  var _toggle = function () {
    $("#player").toggleClass("hide");  
    $("#all-questions").toggleClass("hide");
  };

  var _toggleInModal = function () {
    $("#quiz").toggleClass("hide");  
    $("#video-error").toggleClass("hide");
  };

  var _ask = function (question) {
    var t = 0;
    var timer= setInterval(function(){myTimer()},1000);
    function myTimer(){  
        t++;    
        if(t == question.time_to_ask){
            vid.pause();   
            _showAsk(question);         
            window.clearInterval(timer); 
        }
        
    }

  };

  var _showAsk = function (question) {
      $('.modal-title').text(question.title);
      //$('#description').text(question.description);
      let options = $('#quiz');
      options.children().remove();
      options.removeClass('hide');
      $("#video-error").addClass("hide");
      $.each(question.responses, function (key, r) {
          var json = JSON.stringify(r);
          var id = "q_answer-" + r.code;
          var html = '<div id="'+id+'" class="q_answer"><label class="element-animation1 btn btn-lg btn-primary btn-block">'+
            '<span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>'+
            '<input type="radio" name="q_answer" value="' + r.code + '"> ' + r.text + ' </label></div>';
            options.append(html);
            $("#"+id).attr("data-response", json);
      });
      $('#modal').modal('show');
  }

  function playOrPause() {
    if (vid.paused) {
      vid.play();
      $("#playBtn").attr("src", "../assets/images/Pause.png");
    } else {
      vid.pause();
      $("#playBtn").attr("src", "../assets/images/Play.png");
    }
  }

  vid.addEventListener("timeupdate", function () {
    var position = vid.currentTime / vid.duration;
    fillBar.style.width = position * 100 + "%";
    convertTime(Math.round(vid.currentTime)); //convert decimal no into intiger
    if (vid.ended) {
      $("#playBtn").attr("src", "../assets/images/Play.png");
      _toggle();     
    }
  });

  

  function convertTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;

    totalTime(Math.round(vid.duration));
  }

  function totalTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent += " / " + min + ":" + sec;
  }

  function changeVolume() {
    vid.volume = volumeSlider.value;

    if (volumeSlider.value == 0) {
      $("#speaker").attr("src", "../assets/images/Mute.png");
    } else {
      $("#speaker").attr("src", "../assets/images/Speaker.png");
    }
  }

  

  return {
    init: _initComponent,
    change: _change,
  };
})();
