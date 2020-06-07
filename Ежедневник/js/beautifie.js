function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

if (!localStorage.getItem('theme')){
  localStorage.setItem('theme', 'light');
  $('#themeSwitcher').prop('checked', false);
}else if(localStorage.getItem('theme') === 'dark'){
  $('#themeSwitcher').prop('checked', true);
}else if(localStorage.getItem('theme') === 'light'){
  $('#themeSwitcher').prop('checked', false);
}

$('#loadingImage').attr('src', './img/animation-'+ localStorage.getItem('theme') +'.gif');

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

if ($(window).width() <= 590) {
  $('#themeSwitcherContainer').tooltip('disable')
}

window.addEventListener('resize', onResize, false);

function onResize() {
  if ($(window).width() >= 590) {
    $('#themeSwitcherContainer').tooltip('enable')
  }else if ($(window).width() <= 590) {
    $('#themeSwitcherContainer').tooltip('disable')
  }
}

var background;

$.ajax({
  url: "http://localhost:3000/image/get",
  type: 'GET',
  crossDomain: true,
  dataType: 'jsonp',
  contentType: 'application/json; charset=utf-8',
  success: function (data) {
    setBackground(data);
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

function setBackground(result) {
  background = "http://bing.com" + result.images[0].url;
  $('body').css('background', 'url('+ background +') center/cover fixed');
  switchTheme();
};

$('.padding-container').css({
  'margin-top': ($(window).height() - $('.padding-container').height())/2 - 70 + "px",
  'opacity': '1'
});

function switchTheme() {
  if ($('#themeSwitcher').prop('checked') === true) {
    localStorage.setItem('theme', 'dark'); 
    $('head').append('<link rel="stylesheet" type="text/css" href="./css/darkCalendar.css">');
    $('#loadingScreen').css('background-color', 'rgba(0,0,0,.96)');
    $('#light').css("opacity", "0");
    $('#light').css("visibility", "hidden");
    $('#dark').css("visibility", "");
    $('#dark').css("opacity", "1");
    $('#bgBlur').css({
      'backdrop-filter': 'blur(40px) saturate(150%) opacity(0%)'
    });
    $('body').css({
      'background-image': 'none',
      'background-color': '#181819'
    });
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
    $('.weaTools').css('color', '#b3b3b3');
    $('.weaTools').hover(
      function (){
        $(this).css('color', 'white');
      },
      function (){
        $(this).css('color', '#b3b3b3');
      }
    );
    $('.progress').css('background-color', '#0c0c0d');
  }else{
    localStorage.setItem('theme', 'light');
    $('link[href="./css/darkCalendar.css"]').remove();
    $('#loadingScreen').css('background-color', '');
    $('#dark').css("opacity", "0");
    $('#dark').css("visibility", "hidden");
    $('#light').css("visibility", "");
    $('#light').css("opacity", "1");
    $('#bgBlur').css({
      'backdrop-filter': 'blur(40px) saturate(150%) opacity(100%)',
      'background-color': ''
    });
    $('body').css({
      'background': 'url('+ background +') center/cover fixed',
      'background-color': '#181819'
    });
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
    $('.weaTools').css('color', '#b3b3b3');
    $('.weaTools').hover(
      function (){
        $(this).css('color', '#1c1c1c')
      },
      function (){
        $(this).css('color', '#b3b3b3')
      }
    );
    $('.progress').css('background-color', '#e9ecef');
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
  var loadingScreen = $('#loadingScreen');
  setTimeout(function(){if (loadingScreen){loadingScreen.remove();}}, 500);
};