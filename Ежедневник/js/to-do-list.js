mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'dark'
};
$('#breadCrumbToDoList .input-group.date').datepicker({
  language: "ru",
  orientation: "bottom auto",
  format: "yyyy-mm-dd",
  autoclose: true,
  todayHighlight: true,
  disableTouchKeyboard: true,
  todayBtn: 'linked'
});

$('#exampleModal .modal-dialog .modal-content .modal-body .input-group .form-control').datepicker({
  language: "ru",
  orientation: "auto",
  format: "yyyy-mm-dd",
  autoclose: true,
  todayHighlight: true,
  disableTouchKeyboard: true,
  assumeNearbyYear: true,
  todayBtn: 'linked'
});

var chosenDate = localStorage.getItem('date');

setDate();

function setDate () {
  if (!chosenDate) {
    var today = new Date();
    var month = today.getMonth() + 1;
    var pluralizedMonth = pluralizeMonth(month);
    month < 10 ? month = '0'+month : "";
    var day = today.getDate();
    day < 9 ? day = '0'+day : "";
    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среду', 'Четверг', 'Пятницу', 'Субботу'];
    chosenDate = today.getFullYear() + '-' + month + '-' + day;
    var chosenDateString = days[today.getDay()] + ', ' + today.getDate() + ' ' + pluralizedMonth;
  }else{
    var today = new Date();
    var month = today.getMonth() + 1;
    var pluralizedMonth = pluralizeMonth(month);
    month < 10 ? month = '0'+month : "";
    var day = today.getDate();
    day < 10 ? day = '0'+day : "";
    var todayDate = today.getFullYear() + '-' + month + '-' + day;
    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среду', 'Четверг', 'Пятницу', 'Субботу'];
    if (chosenDate === todayDate) {
      var chosenDateString = days[today.getDay()] + ', ' + today.getDate() + ' ' + pluralizedMonth;
    }else if (new Date(chosenDate).getDate() - day === 1 && (new Date(chosenDate).getMonth()+1) === parseInt(month)) {
      var chosenMonth = new Date(chosenDate).getMonth() + 1;
      var chosenDateString = 'Завтра' + ', ' + new Date(chosenDate).getDate() + ' ' + pluralizeMonth(chosenMonth);
    }else{
      var chosenDateString = new Date(chosenDate).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  $('#to-do-date').val(chosenDate);

  $('#calendarIcon').html('<i style="padding-right: 10px;" class="fas fa-calendar-alt"></i><u id="dateText">' + chosenDateString + '</u>');
}

var toDoItem = {},
    admItem,
    cPoints = 0,
    iPoints = 0,
    allTasks = 0,
    complTasks = 0,
    weaData;

$('#updateToDoItemButton').hide();

getTasks();

function getTasks () {
  $.ajax({
    url: "http://localhost:3000/tasks/get?id=" + JSON.parse(localStorage.getItem('user')).email + "&date=" + chosenDate,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      addToDoItemsFromServer(data).then(showBoxes());
    },
    error: function(){
      $('#contentContainer').append(
        '<div class="jumbotron py-4 py-md-5 lazy-load-container" style="max-width: 545px;" data-speed="500">'+
          '<div class="d-block">'+
            '<div class="d-flex align-items-center justify-content-center h4 mb-4 text-center">Ой-ой, кажется, что-то пошло не так...</div>'+
            '<div class="d-flex align-items-center justify-content-center mb-3 inactive">'+
              '<img src="./img/undraw_server_down_s4lk.svg" style="width: -webkit-fill-available;">'+
            '</div>'+
          '</div>'+
        '</div>'
      );
      showBoxes();
    }
  });
}

async function addToDoItemsFromServer(data) {
  $('#tasks').empty();
  var email = JSON.parse(localStorage.getItem('user')).email;
  cPoints = 0;
  iPoints = 0;
  complTasks = 0;
  allTasks = data.length;
  $('#incompleteProgressToday').css('width', '0%');
  $('#completeProgressToday').css('width', '0%');
  if (data.length < 1) {
    empty();
    $('#loadingAnim').fadeOut();
    $('body').removeClass('inactive');
    return;
  };
  $('.jumbotron').remove();
  for (var i = 0; i < data.length; i++) {
    if (data[i].time >= "00:00" && data[i].time<"01:00") {
      $('#0').length === 0 ? $('#tasks').append('<div id="0"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">00:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#0 .list-group').append(appendIncomplete(data[i])) : $('#0 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "01:00" && data[i].time<"02:00") {
      $('#1').length === 0 ? $('#tasks').append('<div id="1"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">01:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#1 .list-group').append(appendIncomplete(data[i])) : $('#1 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "02:00" && data[i].time<"03:00") {
      $('#2').length === 0 ? $('#tasks').append('<div id="2"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">02:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#2 .list-group').append(appendIncomplete(data[i])) : $('#2 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "03:00" && data[i].time<"04:00") {
      $('#3').length === 0 ? $('#tasks').append('<div id="3"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">03:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#3 .list-group').append(appendIncomplete(data[i])) : $('#3 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "04:00" && data[i].time<"05:00") {
      $('#4').length === 0 ? $('#tasks').append('<div id="4"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">04:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#4 .list-group').append(appendIncomplete(data[i])) : $('#4 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "05:00" && data[i].time<"06:00") {
      $('#5').length === 0 ? $('#tasks').append('<div id="5"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">05:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#5 .list-group').append(appendIncomplete(data[i])) : $('#5 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "06:00" && data[i].time<"07:00") {
      $('#6').length === 0 ? $('#tasks').append('<div id="6"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">06:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#6 .list-group').append(appendIncomplete(data[i])) : $('#6 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "07:00" && data[i].time<"08:00") {
      $('#7').length === 0 ? $('#tasks').append('<div id="7"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">07:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#7 .list-group').append(appendIncomplete(data[i])) : $('#7 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "08:00" && data[i].time<"09:00") {
      $('#8').length === 0 ? $('#tasks').append('<div id="8"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">08:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#8 .list-group').append(appendIncomplete(data[i])) : $('#8 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "09:00" && data[i].time<"10:00") {
      $('#9').length === 0 ? $('#tasks').append('<div id="9"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">09:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#9 .list-group').append(appendIncomplete(data[i])) : $('#9 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "10:00" && data[i].time<"11:00") {
      $('#10').length === 0 ? $('#tasks').append('<div id="10"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">10:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#10 .list-group').append(appendIncomplete(data[i])) : $('#10 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "11:00" && data[i].time<"12:00") {
      $('#11').length === 0 ? $('#tasks').append('<div id="11"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">11:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#11 .list-group').append(appendIncomplete(data[i])) : $('#11 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "12:00" && data[i].time<"13:00") {
      $('#12').length === 0 ? $('#tasks').append('<div id="12"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">12:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#12 .list-group').append(appendIncomplete(data[i])) : $('#12 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "13:00" && data[i].time<"14:00") {
      $('#13').length === 0 ? $('#tasks').append('<div id="13"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">13:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#13 .list-group').append(appendIncomplete(data[i])) : $('#13 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "14:00" && data[i].time<"15:00") {
      $('#14').length === 0 ? $('#tasks').append('<div id="14"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">14:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#14 .list-group').append(appendIncomplete(data[i])) : $('#14 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "15:00" && data[i].time<"16:00") {
      $('#15').length === 0 ? $('#tasks').append('<div id="15"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">15:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#15 .list-group').append(appendIncomplete(data[i])) : $('#15 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "16:00" && data[i].time<"17:00") {
      $('#16').length === 0 ? $('#tasks').append('<div id="16"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">16:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#16 .list-group').append(appendIncomplete(data[i])) : $('#16 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "17:00" && data[i].time<"18:00") {
      $('#17').length === 0 ? $('#tasks').append('<div id="17"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">17:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#17 .list-group').append(appendIncomplete(data[i])) : $('#17 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "18:00" && data[i].time<"19:00") {
      $('#18').length === 0 ? $('#tasks').append('<div id="18"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">18:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#18 .list-group').append(appendIncomplete(data[i])) : $('#18 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "19:00" && data[i].time<"20:00") {
      $('#19').length === 0 ? $('#tasks').append('<div id="19"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">19:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#19 .list-group').append(appendIncomplete(data[i])) : $('#19 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "20:00" && data[i].time<"21:00") {
      $('#20').length === 0 ? $('#tasks').append('<div id="20"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">20:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#20 .list-group').append(appendIncomplete(data[i])) : $('#20 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "21:00" && data[i].time<"22:00") {
      $('#21').length === 0 ? $('#tasks').append('<div id="21"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">21:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#21 .list-group').append(appendIncomplete(data[i])) : $('#21 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "22:00" && data[i].time<"23:00") {
      $('#22').length === 0 ? $('#tasks').append('<div id="22"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">22:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#22 .list-group').append(appendIncomplete(data[i])) : $('#22 .list-group').append(appendcomplete(data[i]));
      continue;
    } else if (data[i].time >= "23:00") {
      $('#23').length === 0 ? $('#tasks').append('<div id="23"><div class="list-group"><li class="list-group-item border-0 font-weight-bolder h3">23:00</li></div></div>') : "";
      data[i].status === 'incomplete' ? $('#23 .list-group').append(appendIncomplete(data[i])) : $('#23 .list-group').append(appendcomplete(data[i]));
      continue;
    }
  }
  $('#loadingAnim').fadeOut();
  $('body').removeClass('inactive');
  switchTheme();
}

function appendIncomplete(task) {
  iPoints += parseInt(task.points);
  return '<a id="'+ task.id +'" class="border-left-info list-group-item list-group-item-action for-anim lazy-load-box" data-speed="500">'
  + '<div class="d-flex w-100 justify-content-between">'
    + '<h5 class="mb-1 item-title">'+ task.title +'</h5>'
    + '<small><span class="item-time">' + task.time +'</span></small>'
  + '</div>'
  + '<p class="mb-1 item-description">'+task.description+'</p>'
  + '<small class="item-points">'+pluralize(task.points, ['балл', 'балла', 'баллов']) +'</small>'
  + '<button type="button" class="btn btn-danger remove-btn float-right" onclick="deleteToDoItem(this)"><i class="far fa-trash-alt"></i></button>'
  + '<button type="button" class="btn btn-primary theme-btn float-right" onclick="updateToDoItem(this)"><i class="far fa-edit"></i></button>'
  + '<button type="button" class="btn btn-success float-right" onclick="completeToDoItem(this)"><i class="far fa-check-circle"></i></button>'
  + '</a>'
}

function appendcomplete(task) {
  complTasks += 1;
  cPoints += parseInt(task.points);
  return '<a id="'+ task.id +'" class="border-left-success text-muted list-group-item list-group-item-action for-anim lazy-load-box" data-speed="500">'
  +'<div class="d-flex w-100 justify-content-between">'
    +'<h5 class="mb-1 item-title">'+ task.title +'</h5>'
    +'<small><span class="item-time">' + task.time +'</span></small>'
  +'</div>'
  +'<div class="d-flex w-100 justify-content-between">'
    +'<p class="mb-1 item-description">'+task.description+'</p>'
    +'<nobr class="item-points text-center font-weight-bold ml-2" style="font-size: 1.5rem;">'+ task.points +' б.</nobr>'
  +'</div>'
  +'<button type="button" class="btn btn-danger remove-btn float-right" onclick="deleteToDoItem(this)"><i class="far fa-trash-alt" aria-hidden="true"></i></button>'
+'</a>'
}

function empty(){
  $('#tasks').children().length === 0 && $('.jumbotron').length === 0 ? $('#contentContainer').append(
    '<div class="jumbotron py-4 py-md-5 lazy-load-container" data-speed="200" style="max-width: 545px;">'+
      '<div class="d-block">'+
        '<div class="d-flex align-items-center justify-content-center h4 mb-4 text-center">Здесь будут отображаться задачи на выбранную дату</div>'+
        '<div class="d-flex align-items-center justify-content-center mb-3 inactive">'+
          '<img src="./img/undraw_To_do_list_re_9nt7.svg" style="width: -webkit-fill-available;">'+
        '</div>'+
      '</div>'+
    '</div>'
  ) : '';
  switchTheme();
}

window.addEventListener('scroll', onScroll, false);

var scrollNow = window.pageYOffset;

function onScroll() {
  if(window.pageYOffset > scrollNow){
    $('.btn-block').css({
      "width": "50px",
      "height": "50px",
      "border-radius": "50%"
    });
    $('.btn-block').html('<i class="fas fa-plus"></i>');
    $('.stat-btn').css({
      "height": "50px",
      "border-radius": "50%"
    });
  }else{
    $('.btn-block').css({
      "width": "",
      "height": "",
      "border-radius": ""
    });
    $('.btn-block').html('Добавить');
    $('.stat-btn').css({
      "height": "",
      "border-radius": ""
    });
  };
  scrollNow = window.pageYOffset;
}

function updateToDoItem(target) {
  $('#to-do-tittle').val($(target).parent().find('.item-title').text());
  $('#to-do-description').val($(target).parent().find('.item-description').text());
  $('#to-do-points').val($(target).parent().find('.item-points').text().split(' ')[0]);
  $('#to-do-time-hours').val($(target).parent().find('.item-time').text().split(':')[0]);
  $('#to-do-time-minutes').val($(target).parent().find('.item-time').text().split(':')[1]);
  $('#to-do-date').val(chosenDate);

  $('#addNewToDoItemButton').hide();
  $('#updateToDoItemButton').show();
  $('#exampleModal').data( "to-do-item-id", $(target).parent().attr('id'));
  $('#exampleModal').modal('show');
}

function updateToDoItemOnServer(target){
  if ($('#to-do-tittle').val().length === 0) {
    alert('Введите заголовок');
    return;
  }
  else if ($('#to-do-points').val().length === 0) {
    alert('Введите количетсво баллов');
    return;
  } 
  $('#exampleModal').find('.btn-primary').attr('disabled', 'true');
  var updatedToDoItem = {
    id: $('#exampleModal').data("to-do-item-id"),
    title: $('#to-do-tittle').val(),
    description: $('#to-do-description').val(),
    time: $('#to-do-time-hours').val() + ':' + $('#to-do-time-minutes').val(),
    points: $('#to-do-points').val(),
    date: $('#to-do-date').val(),
    userId: JSON.parse(localStorage.getItem('user')).email,
    status: "incomplete",
    admin: admItem
  }
  $.post( "http://localhost:3000/tasks/update", updatedToDoItem, function( data ) {
    getTasks();
    $('#loadingAnim').css('display', 'flex');
    $('body').addClass('inactive');
    $('#exampleModal').modal('hide');
  }, "json");
  $('#exampleModal').on('hidden.bs.modal', function (e) {
    $(this).find('.btn-primary').removeAttr('disabled');
    $('#addNewToDoItemButton').show();
    $('#updateToDoItemButton').hide();
  })
  restore();
};

var tasksCards = [];

function deleteToDoItem(target) {
  tasksCards.push($(target).parent().clone());
  $(target).parent().replaceWith(
    '<a class="list-group-item list-group-item-action px-2 countdown-card '+$(target).parent().attr('id')+'" style="'+ cardTheme() +'">'
    +'<div class="circle-progress-bar position-relative" id="'+$(target).parent().attr('id')+'"><strong>5</strong></div>'
    +'<nobr class="text-center">Дело удалено&nbsp;&nbsp;&nbsp;</nobr>'
    +'<button type="button" class="btn btn-link" onclick="abortTheDeletion(\''+$(target).parent().attr('id')+'\')"><i class="fas fa-undo-alt" aria-hidden="true"></i> Отмена</button></a>'
  );
  $('#'+$(target).parent().attr('id')).on('circle-animation-progress', function(event, animationProgress, stepValue) {
    switch (Math.floor(stepValue*10)){
      case 8:
        $(this).find("strong").html('4');
        $('.countdown-card nobr').html('Дело удалено.&nbsp;&nbsp;');
        break;
      case 6:
        $(this).find("strong").html('3');
        $('.countdown-card nobr').html('Дело удалено..&nbsp;');
        break;
      case 4:
        $(this).find("strong").html('2');
        $('.countdown-card nobr').html('Дело удалено...');
        break;
      case 2:
        $(this).find("strong").html('1');
        $('.countdown-card nobr').html('Дело удалено&nbsp;&nbsp;&nbsp;');
        break;
      case 0:
        $(this).find("strong").html('0');
        $('.countdown-card nobr').html('Дело удалено.&nbsp;&nbsp;');
        break;
    }
  });
  $('#'+$(target).parent().attr('id')).circleProgress({
    startAngle: -Math.PI / 2,
    animationStartValue: 1,
    value: 0,
    size: 50,
    animation: {
      duration: 5000,
      easing: 'linear'
    },
    fill: {
      color: localStorage.getItem('theme') === 'light' ? '#007bff' : '#7950f2'
    },
    emptyFill: "rgba(255,255,255,.3)"
  }).on('circle-animation-end', function(event){
    $(this).data('circle-progress').lastFrameValue === 0 ? deleteTaskOnServer($(this).attr('id')) : "";
  });
}

function abortTheDeletion(id){
  $($('#'+id).circleProgress('widget')).stop();
  for (var i = 0; i < tasksCards.length; i++) {
    if (tasksCards[i][0].id===id) {
      $('.'+id).replaceWith(tasksCards[i]);
      tasksCards.splice(i,1);
      return;
    }
  };
}

function cardTheme(){
  if (localStorage.getItem("theme") === "light") {
    return 'background-color: rgba(255, 255, 255, 0.5); color: black; height: 112px;display: flex;align-items: center;justify-content: space-between;transform-origin: top;'
  }else{
    return 'background-color: #121212;color: rgba(255, 255, 255, 0.85);height: 112px;display: flex;align-items: center;justify-content: space-between;transform-origin: top;'
  }
}

function deleteTaskOnServer(id){
  $('.'+id).nextAll().animate({
    top: -112
  }, 500, 'linear', function(){
    $('.'+id).nextAll().css('top', '0');
  });
  $('.'+id).parents().eq(1).nextAll().css({'position': 'relative', 'top': '0'}).animate({
    top: -112
  }, 500, 'linear', function(){
    $('.'+id).parents().eq(1).nextAll().css({'top': '0', 'position': ''});
  });
  var newHeight = $('#tasks').height() - 112;
  $('#tasks').css('height', $('#tasks').height() + 'px').animate({
    height: newHeight
  }, 500, 'linear', function(){
    $('#tasks').css('height', '')
  });
  $({scale: 1, opacity: 1}).animate({
    opacity: 0,
    scale: 0
  }, {
    duration: 500,
    step: function(now, fx) {
      $('.'+id).css('transform', 'scale(' + now + ')');
      $('.'+id).css('opacity', now);
    },
    complete: function(){
      var parentDiv = $('.'+id).parents().eq(1);
      $('.'+id).remove();
      parentDiv.children('div.list-group').children().length === 1 ? $({scale: 1, opacity: 1}).animate({
        opacity: 0,
        scale: 0
      }, {
        duration: 300,
        easing: 'linear',
        step: function (now, fx) {
          parentDiv.children('div.list-group').css({
            'transform': 'scale(' + now + ')',
            'opacity': now
          })
        },
        complete: function(){
          parentDiv.animate({
            height: 0
          }, 300, 'linear', function(){
            $(this).remove();
            empty();
          })
        }
      }, 'linear') : '';
      allTasks -= 1;
      for (var i = 0; i < tasksCards.length; i++) {
        if(tasksCards[i][0].id === id && tasksCards[i][0].className.indexOf('border-left-success') !== -1){
          complTasks -= 1;
          cPoints -= parseInt($(tasksCards[i][0]).find('.item-points').text().split(' ')[0]);
          break;
        }else if (tasksCards[i][0].id === id && tasksCards[i][0].className.indexOf('border-left-info') !== -1) {
          iPoints -= parseInt($(tasksCards[i][0]).find('.item-points').text().split(' ')[0]);
        }
      }
      $.post( "http://localhost:3000/tasks/delete", {"taskId": id}, function( data ) {}, "json");
    }
  }, 'linear');
}

function addToDoItem() {
  if ($('#to-do-tittle').val().length===0){
    alert('Введите заголовок!');
    return;
  }
  else if ($('#to-do-points').val().length===0) {
    alert('Введите количество баллов');
    return;
  }
  var restore = $('#exampleModal .modal-body form').clone();
  toDoItem = {
    title: $('#to-do-tittle').val(),
    description: $('#to-do-description').val(),
    time: $('#to-do-time-hours').val() + ':' + $('#to-do-time-minutes').val(),
    points: $('#to-do-points').val(),
    date: $('#to-do-date').val(),
    userId: JSON.parse(localStorage.getItem('user')).email,
    status: "incomplete",
    admin: admItem
  }
  $('#exampleModal .modal-body form').css({'display': 'flex', 'justify-content': 'center'}).html('<img src="./img/load_new.webp">');
  $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/tasks/save',
      crossDomain: true,
      data: toDoItem,
      success: function(response) {
        getTasks();
        $('#exampleModal .modal-body form img').attr('src', './img/done_new.webp');
        setTimeout(function(){
          $('#exampleModal').modal('hide');
        },1600);
        $('#exampleModal').on('hidden.bs.modal', function (e) {
          $('#loadingAnim').css('display', 'flex');
          $('body').addClass('inactive');
          $('#exampleModal .modal-body form').replaceWith(restore);
          $('#to-do-tittle').val('');
          $('#to-do-description').val('');
          $('#to-do-points').val('');
          $('#to-do-time-hours').val('0');
          $('#to-do-time-minutes').val('00');
        })
      },
      error: function(){
        $('#exampleModal .modal-body form img').attr('src', './img/err_new.webp');
        setTimeout(function(){
          $('#exampleModal').modal('hide');
        },1500);
        $('#exampleModal').on('hidden.bs.modal', function (e) {
          $('#exampleModal .modal-body form').replaceWith(restore);
          $('#to-do-tittle').val('');
          $('#to-do-description').val('');
          $('#to-do-points').val('');
          $('#to-do-time-hours').val('0');
          $('#to-do-time-minutes').val('00');
        })
      }
  });
}

function completeToDoItem(target) {
  $('#exampleModalLive').data('id', $(target).parent().attr('id')).modal('show');
}

function completeToDoItemOnServer(){
  $('#'+$('#exampleModalLive').data('id')).find('.btn-success').html('<img style="width: 16px" src="./img/stat_load.gif">');
  var id = $('#exampleModalLive').data('id');
  $('#exampleModalLive').modal('hide');
  $.post( "http://localhost:3000/tasks/complete", {taskId: id}, function( data ) {
    $('#loadingAnim').css('display', 'flex');
    getTasks()
  }, "json");
}

function restore(){
  document.getElementById('to-do-tittle').value = "";
  document.getElementById('to-do-description').value = "";
  document.getElementById('to-do-points').value = "";
  document.getElementById('to-do-time-hours').value = "00" ;
  document.getElementById('to-do-time-minutes').value = "00" ;
  $('#to-do-date').val(chosenDate);
  $('#exampleModal').on('hidden.bs.modal', function (e) {
    $('#addNewToDoItemButton').show();
    $('#updateToDoItemButton').hide();
  })
}

function pluralize(count, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}

function pluralizeMonth(month) {
  switch(month){
    case 1:
      return 'Января';
    case 2:
      return 'Февраля';
    case 3:
      return 'Марта';
    case 4:
      return 'Апреля';
    case 5:
      return 'Мая';
    case 6:
      return 'Июня';
    case 7:
      return 'Июля';
    case 8:
      return 'Августа';
    case 9:
      return 'Сентября';
    case 10:
      return 'Октября';
    case 11:
      return 'Ноября';
    case 12:
      return 'Декабря';
  }
}

$('#sendReportModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var subject = button.data('whatever');
  $(this).find('.modal-body input#email-subject').val(subject);
})

function switchDate() {
  $('#loadingAnim').css('display', 'flex');
  $('body').addClass('inactive');
  chosenDate = $('#tasksDatePicker').val();
  setDate();
  getTasks();
}

function send(){
  var user = JSON.parse(localStorage.getItem('user'));
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/email/send',
    crossDomain: true,
    data: {
      name: user.firstName + ' ' + user.surName,
      from: $('#from-email').val().length > 0 ? $('#from-email').val() : user.email,
      subject: $('#email-subject').val(),
      text: $('#message-text').val()
    }
  });
  $('#sendReportModal').modal('hide');
}

function logout() {
  localStorage.removeItem('isLogIn');
  localStorage.removeItem('user');
  localStorage.setItem('theme', 'light');
  window.location.replace('log in.html');
}

function showStat() {
  $('#statBtn').html('<img src="./img/stat_load.gif">');
  var user = JSON.parse(localStorage.getItem('user'));
  var userId = user.email;
  $.ajax({
    url: "http://localhost:3000/tasks/getUserStat/:userId",
    type: 'GET',
    data: {"userId": userId},
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      $('#statBtn').html('<i class="far fa-chart-bar"></i>');
      $('#statModal').modal('toggle');
      $('#statModalLabel').text('Статистика пользователя ' + user.firstName);
      $('#todayStat').html('Выполнено дел в этот день <em>' + complTasks + '/' + allTasks + '</em> <br>' + 'Заработано баллов <em>' + cPoints + '/' + (iPoints + cPoints) + '</em>');
      $('#incompleteProgressToday').css('width', ((allTasks - complTasks) / allTasks)*100 + '%');
      $('#completeProgressToday').css('width', (complTasks / allTasks)*100 + '%');
      $('#allTimeStat').html('Выполнено дел за всё время <em>' + data.completedTasks + '/' + (data.incompletedTasks + data.completedTasks) + '</em> <br>' + 'Заработано баллов <em>' + data.points + '</em>');
      $('#incompleteProgressAllTime').css('width', (data.incompletedTasks / (data.incompletedTasks + data.completedTasks))*100 + '%');
      $('#completeProgressAllTime').css('width', (data.completedTasks / (data.incompletedTasks + data.completedTasks))*100 + '%');
    },
    error: function(request,msg,error) {
      $('#statBtn').html('<i class="far fa-chart-bar"></i>');
      $('#statModal').modal('toggle');
      $('#statModalLabel').text('Статистика пользователя ' + user.firstName);
      $('#todayStat').html('Выполнено дел в этот день <em>' + complTasks + '/' + allTasks + '</em> <br>' + 'Заработано баллов <em>' + cPoints + '/' + (iPoints + cPoints) + '</em>');
      $('#incompleteProgressToday').css('width', ($('#to-do-list-incomplete').children().length / ($('#to-do-list-incomplete').children().length + $('#to-do-list-complete').children().length))*100 + '%');
      $('#completeProgressToday').css('width', ($('#to-do-list-complete').children().length / ($('#to-do-list-incomplete').children().length + $('#to-do-list-complete').children().length))*100 + '%');
      $('#allTimeStat').html('Упс! <i class="emoji">&#128561;</i><br>К сожалению, нам не удалось получить данные с сервера, но не волнуйтиесь, мы уже работаем над этим!');
      $('#incompleteProgressAllTime').css('width', '0%');
      $('#completeProgressAllTime').css('width', '0%');
    }
  });
}

getForecast();

function getForecast(){
  $('#refresh i').toggleClass('rotation');
  if (localStorage.getItem('city')) {
    var cityName = localStorage.getItem('city');
    $('#cityInput').attr('placeholder', localStorage.getItem('city'));
  }else{
    var cityName = 'Москва';
    $('#cityInput').attr('placeholder', 'Введите название города');
  }

  $.ajax({
    url: "http://localhost:3000/weather/get/:city",
    type: 'GET',
    crossDomain: true,
    data: {"city": cityName},
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      if(data.weatherdata.weather[0].current[0]){
        setIcon(data);
        $('#refresh i').toggleClass('rotation');
        $('#sky').html(data.weatherdata.weather[0].current[0].$.skytext);
        $('#temperature').html(data.weatherdata.weather[0].current[0].$.temperature + '&#8451;');
        $('#city').html(data.weatherdata.weather[0].$.weatherlocationname);
        $('#providerLink').attr('href', data.weatherdata.weather[0].$.url);
      }else{
        $('#sky').html('Не удалось загрузить прогноз.');
        $('#temperature').html('--/--&#8451;');
        $('#city').html(localStorage.getItem('city'));
      }
    },
    error: function(request,msg,error){
      $('#refresh i').toggleClass('rotation');
      $('#refresh').html('<i class="fas fa-times-circle weaTools text-danger"></i>');
      setTimeout(function(){
        $('#refresh').html('<i class="fas fa-sync-alt weaTools"></i>');
      }, 2000);
      console.log(request + ' ' + msg + ' ' + error);
      $('#sky').text().length < 2 ? $('#sky').html('Не удалось загрузить прогноз.') : "";
      $('#city').html(localStorage.getItem('city'));
    }
  });
}

function setIcon(data) {
  switch(data.weatherdata.weather[0].current[0].$.skycode){
    case '12':
    case '10':
    case '11':
    case '18':
    case '40':
    case '39':
    case '45':
    case '9':
    case '8':
      $('#skyImg').attr('src', './weatherIcons/12.png');
      break;
    case '16':
    case '13':
    case '14':
    case '42':
    case '43':
    case '5':
    case '6':
    case '7':
    case '41':
    case '46':
    case '15':
      $('#skyImg').attr('src', './weatherIcons/16.png');
      break;
    case '26':
    case '15':
    case '19':
    case '20':
    case '21':
    case '22':
    case '25':
    case '28':
      $('#skyImg').attr('src', './weatherIcons/26.png');
      break;
    case '29':
    case '27':
    case '33':
      $('#skyImg').attr('src', './weatherIcons/29.png');
      break;
    case '30':
    case '34':
      $('#skyImg').attr('src', './weatherIcons/30.png');
      break;
    case '32':
    case '23':
    case '24':
      $('#skyImg').attr('src', './weatherIcons/32.png');
      break;
    case '35':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '17':
    case '37':
    case '38':
    case '47':
      $('#skyImg').attr('src', './weatherIcons/35.png');
      break;
    case '31':
      $('#skyImg').attr('src', './weatherIcons/31.png');
      break;
    case '36':
      $('#skyImg').attr('src', './weatherIcons/36.png');
      break;        
  };
}

function loadCitiesNames() {
  $('#loadingAnim').css('display', 'flex');
  $.ajax({
    url: "http://localhost:3000/cities/get",
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      setAutocomplete(data);
    },
    error: function(request,msg,error){
      console.log(request + ' ' + msg + ' ' + error);
    }
  });
}

function setAutocomplete(data){
  $('#weaModal').modal('show');
  $('#loadingAnim').fadeOut();
  $('#cityInput').autocomplete({source: data, appendTo: $('#weaModalBody')})
}

function setCity(){
  if ($('#cityInput').val().length === 0) {return}
  localStorage.setItem('city', $('#cityInput').val());
  $('#weaModal').modal('toggle');
  getForecast();
  $('#cityInput').val('');
}