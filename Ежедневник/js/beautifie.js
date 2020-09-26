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

window.addEventListener('resize', onResize, false);

function onResize() {
  $('#uploadImg').css({
    'width': $('#avatar').width(),
    'height': $('#avatar').height()
  })
  if ($(window).width() >= 800) {
    $('#themeSwitcherContainer').tooltip('enable');
  }else if ($(window).width() <= 800) {
    $('#themeSwitcherContainer').tooltip('disable');
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
  $('#bgBlur img').attr('src', background);
  $('#bgBlurLt img').attr('src', background);
  switchTheme();
}

function setBackground(result) {;
  background = "https://bing.com" + result.images[0].url.replace('1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp','1280x720.jpg');
  $('#bgBlur img').attr('src', background);
  $('#bgBlurLt img').attr('src', background);
  switchTheme();
};

function switchTheme() {
  if ($('#themeSwitcher').prop('checked') === true) {
    localStorage.setItem('theme', 'dark'); 
    $('head').append('<link rel="stylesheet" type="text/css" href="./css/darkCalendar.css">');
    $('#light').css("opacity", "0");
    $('#light').css("visibility", "hidden");
    $('#dark').css("visibility", "");
    $('#dark').css("opacity", "1");
    $('#bgBlur img').css({
      'filter': 'blur(40px) saturate(150%) opacity(0)'
    });
    $('body').css({
      'background-color': 'black'
    });
    $('a.list-group-item').css({
      'background-color': '#121212',
      'color': 'rgba(255,255,255,.85)'
    });
    $('div#tasks li').css('color', 'white');
    $('#tasks').css('background-color', 'transparent');
    $('.jumbotron').css({
      'background-color': '#121212',
      'color': 'white'
    }).find('img').attr('src', './img/undraw_To_do_list_re_9nt7_dark.svg');
    $('.my-4').css('border-color', 'white');
    $('h3').css('color', 'white');
    $('.input-group-text').css('color', 'white');
    $('.theme-btn').css({
      'background-color': '#7950f2',
      'border-color': '#7950f2'
    });
    $('.modal-content').css({
      'background-color': '#121212',
      'color': 'white'
    });
    $('.form-control').css({
      'background-color': 'rgba(0, 0, 0, .5)',
      'color': 'white'
    });
    $('.close').css('color', 'white');
    $('#weaContainer').css({
      'background-color': '#121212',
      'color': 'white'
    });
    $('#loadingAnim').css('background-color', 'rgb(25 25 25 / .8)').find('img').css('filter', 'invert(100%)');
    $('#linksContainer .dropdown-menu').css({
      'color': '#dddfeb',
      'background-color': '#121212'
    }).addClass('border-0').find('.dropdown-divider').css('border-color', '#dddfeb');
    $('#linksContainer .dropdown-menu .dropdown-item').hover(
      function(){
        $(this).css('background-color', '#3a3b45!important');
      },
      function(){
        $(this).css('background-color', '');
      }
    );
    $('.weaTools').css('color', '#b3b3b3');
    $('.weaTools').hover(
      function (){
        $(this).css('color', 'white');
      },
      function (){
        $(this).css('color', '#b3b3b3');
      }
    );
    $('.progress').css('background-color', '#121212');
    $('.mbsc-ios-dark .mbsc-switch-handle').html('<i class="fas fa-cloud-moon" style="color: #7950f2";font-size: 1.05em;"></i>')
  }else if ($('#themeSwitcher').prop('checked') === false){
    localStorage.setItem('theme', 'light');
    $('link[href="./css/darkCalendar.css"]').remove();
    $('#dark').css("opacity", "0");
    $('#dark').css("visibility", "hidden");
    $('#light').css("visibility", "");
    $('#light').css("opacity", "1");
    $('#bgBlur img').css({
      'filter': 'blur(40px) saturate(150%) opacity(1)'
    });
    $('body').css({
      'background-color': '#181819'
    });
    $('a.list-group-item').css({
      'background-color': 'rgba(255,255,255, .5)',
      'color': 'black'
    });
    $('div#tasks li').css('color', 'black');
    $('#tasks').css('background-color', 'rgba(255,255,255, .5)');
    $('.jumbotron').css({
      'background-color': 'rgba(233, 236, 239, .5)',
      'color': 'black'
    }).find('img').attr('src', './img/undraw_To_do_list_re_9nt7.svg');
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
    $('#loadingAnim').css('background-color', 'rgb(230 230 230 / .5)').find('img').css('filter', 'invert(0%)');
    $('#linksContainer .dropdown-menu').css({
      'color':' #858796',
      'background-color': '#fff'
    }).removeClass('border-0').find('.dropdown-divider').css('border-color', 'rgb(221, 223, 235)');
    $('#linksContainer .dropdown-menu .dropdown-item').hover(
      function(){
        $(this).css('background-color', '#f8f9fa!important');
      },
      function(){
        $(this).css('background-color', '');
      }
    );
    $('.weaTools').css('color', '#6c757d');
    $('.weaTools').hover(
      function (){
        $(this).css('color', '#1c1c1c')
      },
      function (){
        $(this).css('color', '#6c757d')
      }
    );
    $('.progress').css('background-color', '#e9ecef');
    $('.mbsc-ios-dark .mbsc-switch-handle').html('<i class="fas fa-cloud-sun" style="color: rgb(243, 159, 24);font-size: 1.05em;"></i>');
  };
};

window.onload = function(){
  $('#loadingScreen').animate({
    opacity: 0
  }, 500, 'linear', function(){
    $('#loadingScreen').remove();
    $('body').removeClass('modal-open');
  });
  if ($(window).width() <= 800) {
    $('#themeSwitcherContainer').tooltip('disable');
  };
  $(".theme-btn").focus(function(){
    if (localStorage.getItem('theme') === 'light') {
      $(this).css("box-shadow", "0 0 0 0.2rem rgba(38,143,255,.5)");
    }else if (localStorage.getItem('theme') === 'dark') {
      $(this).css("box-shadow", "0 0 0 0.2rem rgba(121, 80, 242, .5)");
    }
  });
  $(".theme-btn").blur(function(){
    $(this).css("box-shadow", "none");
  });
  $('input, textarea, select').focus(function(){
    localStorage.getItem('theme') === 'light' ? $(this).css({
      'box-shadow': '0 0 0 0.2rem rgba(0,123,255,.25)',
      'border-color': '#80bdff'
    }) : $(this).css({
      'box-shadow': '0 0 0 0.2rem #7950f240',
      'border-color': '#7950f2'
    })
  });  
  $('input, textarea, select').blur(function(){
    $(this).css({
      'box-shadow': 'none',
      'border-color': ''
    });
  });
  $('.mbsc-ios-dark .mbsc-switch-handle').html(localStorage.theme === 'light' ? '<i class="fas fa-cloud-sun" style="color: rgb(243, 159, 24);font-size: 1.05em;"></i>' : '<i class="fas fa-cloud-moon" style="color: #7950f2";font-size: 1.05em;"></i>');
  if (window.location.href.includes('user.html')) {
    if (localStorage.getItem('theme')==='dark') {
      $('.list-group-item').addClass('text-white-50');
      $('.list-group-item').css('border-color', '#f8f9fa1f');
      $('strong').toggleClass('text-body');
      $('strong').toggleClass('text-light');
      $('.font-weight-bold').addClass('text-white');
      $('#back').removeClass('btn-outline-dark');
      $('#back').addClass('btn-outline-light');
      $('hr.my-4').css('border-color', '#f8f9fa80');
      $('label').addClass('text-light');
      $('.modal-content').css({
        'background-color': '#121212',
        'color': 'white'
      });
      $('.form-control').css({
        'background-color': 'rgba(0, 0, 0, .5)',
        'color': 'white'
      });
      $('.theme-btn').css({
        'background-color': '#7950f2',
        'border-color': '#7950f2'
      });
      $('#loadingAnim').css('background-color', 'rgb(25 25 25 / .8)').find('img').css('filter', 'invert(100%)');
    }
  }
}