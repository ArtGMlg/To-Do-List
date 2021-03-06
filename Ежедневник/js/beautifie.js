function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

$('#loadingImage').attr('src', './img/animation-'+ localStorage.getItem('theme') +'.gif');

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

window.addEventListener('resize', onResize, false);

onResize();

function onResize() {
  if (!localStorage.getItem('theme')){
    localStorage.setItem('theme', 'light');
    $('#themeSwitcher').prop('checked', false);
  }else if(localStorage.getItem('theme') === 'dark'){
    $('#themeSwitcher').prop('checked', true);
  }else if(localStorage.getItem('theme') === 'light'){
    $('#themeSwitcher').prop('checked', false);
  };
  if ($(window).width() >= 800) {
    $('#linksContainer').find('form').tooltip('enable');
  }else if ($(window).width() <= 800) {
    $('#linksContainer').find('form').tooltip('disable');
  };
}

var background;

$.ajax({
  url: encodeURI("https://k16-omsk.ru/server_for_tasks/image/get"),
  type: 'GET',
  crossDomain: true,
  dataType: 'jsonp',
  contentType: 'application/json; charset=utf-8',
  success: function (data) {
    switchTheme('firstLoad').then(setBackground(data, 'firstLoad'));
  },
  error: function(){
    switchTheme('firstLoad').then(setBackgroundError('firstLoad'));
  }
});

function setBackgroundError(arg) {
  background = './img/' + randomInteger(1, 13) + '.jpg';
  if (arg === 'firstLoad'){
    $('#bgBlur img, #bgBlurLt img').delay(100).attr('src', background);
  }else{
    $('#bgBlur img, #bgBlurLt img').attr('src', background);
  }
}

function setBackground(result, arg) {;
  background = "https://bing.com" + result.images[0].url.replace('1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp','1280x720.jpg');
  if (arg === 'firstLoad'){
    $('#bgBlur img, #bgBlurLt img').delay(100).attr('src', background);
  }else{
    $('#bgBlur img, #bgBlurLt img').attr('src', background);
  }
};

async function switchTheme(arg) {
  if (arg === 'firstLoad') {
    if (localStorage.theme === 'dark') {
      $('head').append('<link rel="stylesheet" type="text/css" href="./css/darkCalendar.css">');
      $('link[href="./img/tdl-ico.ico"]').replaceWith('<link rel="shortcut icon" href="./img/tdl-ico-dark.ico" type="image/x-icon">');
      if($('.jumbotron').length > 0){
        var ji = $('.jumbotron').find('img').attr('src').split('.')[1];
      } else if (ji) {
        ji = undefined;
      };
      if (ji && !ji.includes('_dark')) {
        $('.jumbotron').css({
          'background-color': '#121212',
          'color': 'white'
        }).find('img').attr('src', '.' + ji + '_dark.svg');
      };
      $('hr.mx-4').addClass('border-0');
      $('h3').css('color', 'white');
      $('#linksContainer .dropdown-menu .dropdown-item').hover(
        function(){
          $(this).css('background-color', '#3a3b45!important');
        },
        function(){
          $(this).css('background-color', 'transparent');
        }
      );
      $('.weaTools').hover(
        function (){
          $(this).css('color', 'white');
        },
        function (){
          $(this).css('color', '#b3b3b3');
        }
      );
      $('.mbsc-ios-dark .mbsc-switch-handle').html('<i class="fas fa-cloud-moon" style="color: #7950f2";font-size: 1.05em;"></i>')
      return;
    } else {
      $('link[href="./img/tdl-ico-dark.ico"]').replaceWith('<link rel="shortcut icon" href="./img/tdl-ico.ico" type="image/x-icon">');
      if ($('.jumbotron').length > 0) {
        var ji = $('.jumbotron').find('img').attr('src').split('.')[1];
      }else if(ji){
        ji = undefined;
      }    
      if (ji) {
        $('.jumbotron').css({
          'background-color': 'transparent',
          'color': 'black'
        }).find('img').attr('src', '.' + ji.replace('_dark','') + '.svg');
        $('#linksContainer .dropdown-menu .dropdown-item').hover(
          function(){
            $(this).css('background-color', '#f8f9fa!important');
          },
          function(){
            $(this).css('background-color', 'transparent');
          }
        );
        $('.weaTools').css('color', '#343a40').hover(
          function (){
            $(this).css('color', '#00000080')
          },
          function (){
            $(this).css('color', '#343a40')
          }
        );
        $('.mbsc-ios-dark .mbsc-switch-handle').html('<i class="fas fa-cloud-sun" style="color: rgb(243, 159, 24);font-size: 1.05em;"></i>');
        return;
      };  
    }
  } else if (arg === 'empty') {
    if (localStorage.theme === 'dark') {
      var ji = $('.jumbotron').find('img').attr('src').split('.')[1];
      if (!$('.jumbotron').find('img').attr('src').split('.')[1].includes('_dark')) {
        $('.jumbotron').css({
          'background-color': '#121212',
          'color': 'white'
        }).find('img').attr('src', '.' + ji + '_dark.svg');
      };
      return;
    }else{
      var ji = $('.jumbotron').find('img').attr('src').split('.')[1]; 
      $('.jumbotron').css({
        'background-color': 'transparent',
        'color': 'black'
      }).find('img').attr('src', '.' + ji.replace('_dark','') + '.svg');
      return;
    }
  };
  if ($('#themeSwitcher').prop('checked') === true) {
    localStorage.setItem('theme', 'dark'); 
    $('head').append('<link rel="stylesheet" type="text/css" href="./css/darkCalendar.css">');
    $('link[href="./img/tdl-ico.ico"]').replaceWith('<link rel="shortcut icon" href="./img/tdl-ico-dark.ico" type="image/x-icon">');
    $('#bgBlur img').css({
      '-webkit-filter': 'blur(40px) saturate(150%) opacity(0)',
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
    $('#contentContainer').css('background-color', 'transparent');
    if($('.jumbotron').length > 0){
      var ji = $('.jumbotron').find('img').attr('src').split('.')[1];
    } else if (ji) {
      ji = undefined;
    };
    if (ji && !$('.jumbotron').find('img').attr('src').split('.')[1].includes('_dark')) {
      $('.jumbotron').css({
        'background-color': '#121212',
        'color': 'white'
      }).find('img').attr('src', '.' + ji + '_dark.svg');
    };
    $('hr.mx-4').addClass('border-0');
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
    $('#loadingAnim').css('background-color', 'rgb(25 25 25 / .8)').find('img').css({
      '-webkit-filter': 'invert(100%)',
      'filter': 'invert(100%)'
    });
    $('#linksContainer .dropdown-menu').css({
      'color': '#dddfeb',
      'background-color': '#121212'
    }).addClass('border-0').find('.dropdown-divider').css('border-color', '#dddfeb');
    $('#linksContainer .dropdown-menu .dropdown-item').hover(
      function(){
        $(this).css('background-color', '#3a3b45!important');
      },
      function(){
        $(this).css('background-color', 'transparent');
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
    $('#toTop').css({
      'background-color': 'rgba(255,255,255,.5)',
      'color': 'black'
    });
    $('.progress').css('background-color', '#121212');
    $('.mbsc-ios-dark .mbsc-switch-handle').html('<i class="fas fa-cloud-moon" style="color: #7950f2";font-size: 1.05em;"></i>')
  }else if ($('#themeSwitcher').prop('checked') === false){
    localStorage.setItem('theme', 'light');
    $('link[href="./css/darkCalendar.css"]').remove();
    $('link[href="./img/tdl-ico-dark.ico"]').replaceWith('<link rel="shortcut icon" href="./img/tdl-ico.ico" type="image/x-icon">');
    $('#bgBlur img').css({
      '-webkit-filter': 'blur(40px) saturate(150%) opacity(1)',
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
    $('#contentContainer').css('background-color', 'rgba(255,255,255, .5)');
    if ($('.jumbotron').length > 0) {
      var ji = $('.jumbotron').find('img').attr('src').split('.')[1];
    }else if(ji){
      ji = undefined;
    }    
    if (ji) {
      $('.jumbotron').css({
        'background-color': 'transparent',
        'color': 'black'
      }).find('img').attr('src', '.' + ji.replace('_dark','') + '.svg');
    };    
    $('hr.my-4').css('border-color', 'black');
    $('hr.mx-4').removeClass('border-0');
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
    $('#loadingAnim').css('background-color', 'rgb(230 230 230 / .5)').find('img').css({
      '-webkit-filter': 'invert(0%)',
      'filter': 'invert(0%)'
    });
    $('#linksContainer .dropdown-menu').css({
      'color':' #858796',
      'background-color': '#fff'
    }).removeClass('border-0').find('.dropdown-divider').css('border-color', 'rgb(221, 223, 235)');
    $('#linksContainer .dropdown-menu .dropdown-item').hover(
      function(){
        $(this).css('background-color', '#f8f9fa!important');
      },
      function(){
        $(this).css('background-color', 'transparent');
      }
    );
    $('.weaTools').css('color', '#343a40').hover(
      function (){
        $(this).css('color', '#00000080')
      },
      function (){
        $(this).css('color', '#343a40')
      }
    );
    $('#toTop').css({
      'background-color': 'rgba(0,0,0,.5)',
      'color': 'white'
    });
    $('.progress').css('background-color', '#e9ecef');
    $('.mbsc-ios-dark .mbsc-switch-handle').html('<i class="fas fa-cloud-sun" style="color: rgb(243, 159, 24);font-size: 1.05em;"></i>');
  };
  $(".theme-btn").focus(function(){
    if (localStorage.getItem('theme') === 'light') {
      $(this).css("box-shadow", "0 0 0 0.2rem rgba(38,143,255,.5)");
    }else if (localStorage.getItem('theme') === 'dark') {
      $(this).css("box-shadow", "0 0 0 0.2rem rgba(121, 80, 242, .5)");
    }
  }).blur(function(){
    $(this).css("box-shadow", "none");
  }).hover(
    function() {
      localStorage.theme === 'dark' ? $(this).css({
        'background-color': '#482e92',
        'border-color': '#482e92'
      }) : $(this).css({
        'background-color': '#0069d9',
        'border-color': '#0062cc'
      });
    },
    function() {
      localStorage.theme === 'dark' ? $(this).css({
        'background-color': '#7950f2',
        'border-color': '#7950f2'
      }) : $(this).css({
        'background-color': '#007bff',
        'border-color': '#007bff'
      });
    }
  );
};

window.onload = function(){
  $('#loadingScreen').fadeOut(500);
  $('body').removeClass('modal-open').find('.opacityOnLoad').animate({
    opacity: 1
  }, 300, 'linear');
  if ($(window).width() <= 800) {
    $('#themeSwitcherContainer').tooltip('disable');
  };
  $(".theme-btn").focus(function(){
    if (localStorage.getItem('theme') === 'light') {
      $(this).css("box-shadow", "0 0 0 0.2rem rgba(38,143,255,.5)");
    }else if (localStorage.getItem('theme') === 'dark') {
      $(this).css("box-shadow", "0 0 0 0.2rem rgba(121, 80, 242, .5)");
    }
  }).blur(function(){
    $(this).css("box-shadow", "none");
  }).hover(
    function() {
      localStorage.theme === 'dark' ? $(this).css({
        'background-color': '#482e92',
        'border-color': '#482e92'
      }) : $(this).css({
        'background-color': '#0069d9',
        'border-color': '#0062cc'
      });
    },
    function() {
      localStorage.theme === 'dark' ? $(this).css({
        'background-color': '#7950f2',
        'border-color': '#7950f2'
      }) : $(this).css({
        'background-color': '#007bff',
        'border-color': '#007bff'
      });
    }
  );
  $('input, textarea, select').focus(function(){
    window.location.href.includes('user.html') ? '' : localStorage.getItem('theme') === 'light' ? $(this).css({
      'box-shadow': '0 0 0 0.2rem rgba(0,123,255,.25)',
      'border-color': '#80bdff'
    }) : $(this).css({
      'box-shadow': '0 0 0 0.2rem #7950f240',
      'border-color': '#7950f2'
    })
  }).blur(function(){
    $(this).css({
      'box-shadow': 'none',
      'border-color': ''
    });
  });
  $('.mbsc-ios-dark .mbsc-switch-handle').html(localStorage.theme === 'light' ? '<i class="fas fa-cloud-sun" style="color: rgb(243, 159, 24);font-size: 1.05em;"></i>' : '<i class="fas fa-cloud-moon" style="color: #7950f2";font-size: 1.05em;"></i>');
  if (window.location.href.includes('user.html')) {
    if (localStorage.getItem('theme')==='dark') {
      $('head').append('<link rel="shortcut icon" href="./img/tdl-ico-dark.ico" type="image/x-icon">');
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
      $('.h3').css('color', 'white');
      $('.close').css('color', 'white');
      $('#loadingAnim').css('background-color', 'rgb(25 25 25 / .8)').find('img').css({
        '-webkit-filter': 'invert(100%)',
        'filter': 'invert(100%)'
      });
    } else {
      $('head').append('<link rel="shortcut icon" href="./img/tdl-ico.ico" type="image/x-icon">');      
    }
  }
}