function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

if (!localStorage.getItem('theme')){
  localStorage.setItem('theme', 'light');
}else if(localStorage.getItem('theme') === 'dark'){
  $('#themeSwitcher').prop('checked', true);
}

var background;

$.ajax({
  url: "http://localhost:3000/image/get",
  type: 'GET',
  crossDomain: true,
  dataType: 'jsonp',
  contentType: 'application/json; charset=utf-8',
  success: function (data) {
    printResult(data);
  },
  error: function(){
    setBackgroundError();
  }
});

function setBackgroundError() {
  background = './img/' + randomInteger(1, 13) + '.jpg';
  $('body').css('background', 'url('+ background +') center/cover fixed');
  switchTheme();
}

function printResult(result) {
  background = "http://bing.com" + result.images[0].url;
  $('body').css('background', 'url('+ background +') center/cover fixed');
  switchTheme();
};

$('.login-form').css({
  'padding-top': ($(window).height() - $('.login-form').height())/2 - 70 + "px",
  'opacity': '1'
});

function switchTheme() {
  if (document.getElementById('themeSwitcher').checked) {
    localStorage.setItem('theme', 'dark');
    $('#loadingScreen').css('background-color', 'rgba(0,0,0,.96)');
    $('#light').css("opacity", "0");
    $('#light').css("visibility", "hidden");
    $('#dark').css("visibility", "");
    $('#dark').css("opacity", "1");
    $('html').css({
      'backdrop-filter': 'blur(40px) saturate(150%) opacity(0%)'
    });
    $('body').css('background-color', '#181819');
    $('.list-group-item').css({
      'background-color': 'rgba(118,120,122,.5)',
      'color': 'rgba(255,255,255,.85)'
    });
    $('.jumbotron').css({
      'background-color': 'rgb(37, 37, 39)',
      'color': 'white'
    });
    $('.my-4').css('border-color', 'white');
    $('h3').css('color', 'white');
    $('.input-group-text').css('color', 'white');
    $('.theme-btn').css({
      'background-color': '#7950f2',
      'border-color': '#7950f2'
    });
    $('.modal-content').css({
      'background-color': 'rgb(27, 27, 27)',
      'color': 'white'
    });
    $('.form-control').css({
      'background-color': 'rgba(0, 0, 0, .5)',
      'color': 'white'
    });
    $('.close').css('color', 'white');
    $('#weaContainer').css({
      'background-color': 'rgb(37, 37, 39)',
      'color': 'white'
    });
    $('#settings').css('color', '#b3b3b3');
    $('#settings').hover(
      function (){
        $(this).css('color', 'white');
      },
      function (){
        $(this).css('color', '#b3b3b3');
      }
    )
  }else{
    localStorage.setItem('theme', 'light');
    $('#loadingScreen').css('background-color', '');
    $('#dark').css("opacity", "0");
    $('#dark').css("visibility", "hidden");
    $('#light').css("visibility", "");
    $('#light').css("opacity", "1");
    $('html').css({
      'backdrop-filter': 'blur(40px) saturate(150%) opacity(100%)',
      'background-color': ''
    });
    $('body').css('background-color', '#181819');
    $('.list-group-item').css({
      'background-color': 'rgba(255,255,255, .5)',
      'color': 'black'
    });
    $('.jumbotron').css({
      'background-color': 'rgba(233, 236, 239, .5)',
      'color': 'black'
    });
    $('.my-4').css('border-color', 'black');
    $('h3').css('color', 'black');
    $('.input-group-text').css('color', 'black');
    $('.complited-task').css('color', '#6c757d');
    $('.theme-btn').css({
      'background-color': '#007bff',
      'border-color': '#007bff',
      'outline-color': '#007bff'
    });
    $('.modal-content').css({
      'background-color': '#fff',
      'color': 'black'
    });
    $('.form-control').css({
      'background-color': 'white',
      'color': '#495057'
    });
    $('.close').css('color', 'black');
    $('#weaContainer').css({
      'background-color': 'rgba(233, 236, 239, .5)',
      'color': 'black'
    });
    $('#settings').css('color', '#b3b3b3');
    $('#settings').hover(
      function (){
        $(this).css('color', '#1c1c1c')
      },
      function (){
        $(this).css('color', '#b3b3b3')
      }
    );
  };
  var loadingScreen = $('#loadingScreen');
  setTimeout(function(){if (loadingScreen){loadingScreen.remove();}}, 500);
};

$(".theme-btn").focus(function(){
  if (localStorage.getItem('theme') === 'light') {
    $(this).css("box-shadow", "0 0 0 0.2rem rgba(38,143,255,.5)");
  }else if (localStorage.getItem('theme') === 'dark') {
    $(this).css("box-shadow", "0 0 0 0.2rem rgba(121, 80, 242, .5)");
  }
});

$(".theme-btn").blur(function(){
  if (localStorage.getItem('theme') === 'dark') {
    $(this).css("box-shadow", "none");
  }else if (localStorage.getItem('theme') === 'light') {
    $(this).css("box-shadow", "none");
  }
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})