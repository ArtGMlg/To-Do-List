$('#breadCrumbToDoList .input-group.date').datepicker({
  language: "ru",
  orientation: "bottom auto",
  format: "yyyy-mm-dd"
});

var searchParams = new URLSearchParams(window.location.search);
var chosenDate = searchParams.get('chosenDate');

if (!chosenDate) {
  var today = new Date();
  var month = today.getMonth() + 1;
  var pluralizedMonth = pluralizeMonth(month);
  if(month < 10){
    month = '0'+month;
  }
  var day = today.getDate();
  if (day < 9) {
    day = '0'+ day;
  }
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  chosenDate = today.getFullYear() + '-' + month + '-' + day;
  var chosenDateString = days[today.getDay()] + ', ' + day + ' ' + pluralizedMonth;
}else{
  var today = new Date();
  var month = today.getMonth() + 1;
  var pluralizedMonth = pluralizeMonth(month);
  if(month < 10){
    month = '0'+month;
  }
  var day = today.getDate();
  if (day < 9) {
    day = '0'+ day;
  }
  var todayDate = today.getFullYear() + '-' + month + '-' + day;
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  if (chosenDate === todayDate) {
    var chosenDateString = days[today.getDay()] + ', ' + day + ' ' + pluralizedMonth;
  }else{
    var chosenDateString = new Date(chosenDate).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

document.getElementById('to-do-date').value = chosenDate;


$('#calendarIcon').append('<u id="dateText">' + chosenDateString + '</u>');

var toDoItem = {
};

var admItem;

$('#updateToDoItemButton').hide();

$.ajax({
    url: "http://localhost:3000/tasks/get",
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      addToDoItemsFromServer(data);
    },
    error: function(){
      $('#contentContainer').append(
        '<div class="jumbotron">'+
          '<h1 class="display-4">Упс, кажется, что-то пошло не так &#129301;</h1>'+
          '<p class="lead">Похоже, что сервер не поделился с нами данными &#128546;</p>'+
          '<hr class="my-4">'+
          '<p>Если Вы столкнулись с этой проблемой, пожалуйста, сообщите об этом нам.</p>'+
          '<p class="lead">'+
            '<a class="btn theme-btn btn-primary btn-lg" href="#" data-toggle="modal" data-target="#sendReportModal" data-whatever="Возникает ошибка." role="button">Отправить отчёт</a>'+
          '</p>'+
        '</div>'
    )}
  });

function addToDoItemsFromServer(data) {
  var email = JSON.parse(localStorage.getItem('user')).email;
  for (var x = 0; x < data.users.length; x++) {
    if (data.users[x].email===email) {
      admItem=data.users[x].admin;
    }
  };
  for(i=0; i<data.tasks.length; i++){
    if(chosenDate===data.tasks[i].date && email===data.tasks[i].userId && data.tasks[i].status === 'incomplite'){
      toDoItem = {
          title: data.tasks[i].title,
        description: data.tasks[i].description,
          timeHours: data.tasks[i].timeHours,
        timeMinutes: data.tasks[i].timeMinutes,
        points: data.tasks[i].points,
        id: data.tasks[i].id
      }
      
      var toDoList= $('#to-do-list-incomplite');
      toDoList.append('<a id="'+ toDoItem.id +'" href="#" class="list-group-item list-group-item-action">'
      + '<div class="d-flex w-100 justify-content-between">'
      + '<h5 class="mb-1 item-title">'+ toDoItem.title +'</h5>'
      + '<small>'+ '<span class="item-time-hours">' + toDoItem.timeHours +'</span>'+':'+ '<span class="item-time-minutes">' +toDoItem.timeMinutes+'</span>'+'</small>'
      + '</div>'
      + '<p class="mb-1 item-description">'+toDoItem.description+'</p>'
      + '<small class="item-points">'+pluralize(toDoItem.points, ['балл', 'балла', 'баллов']) +'</small>'
      + '<button type="button" class="btn btn-danger float-right"  onclick="removeToDoItem(this)"><i class="far fa-trash-alt"></i></button>'
      + '<button type="button" class="btn btn-primary theme-btn float-right"  onclick="updateToDoItem(this)"><i class="far fa-edit"></i></button>'
      + '<button type="button" class="btn btn-success float-right"  onclick="compliteToDoItem(this)"><i class="far fa-check-circle"></i></button>'
      + '</a>'
      );
    }else if (chosenDate===data.tasks[i].date && email===data.tasks[i].userId && data.tasks[i].status === 'complite') {
      toDoItem = {
          title: data.tasks[i].title,
        description: data.tasks[i].description,
          timeHours: data.tasks[i].timeHours,
        timeMinutes: data.tasks[i].timeMinutes,
        points: data.tasks[i].points,
        id: data.tasks[i].id
      }
      $('#to-do-list-complite').append('<a id="'+ toDoItem.id +'" href="#" class="complited-task list-group-item list-group-item-action">'
      + '<div class="d-flex w-100 justify-content-between">'
      + '<h5 class="mb-1 item-title">'+ toDoItem.title +'</h5>'
      + '<small>'+ '<span class="item-time-hours">' + toDoItem.timeHours +'</span>'+':'+ '<span class="item-time-minutes">' +toDoItem.timeMinutes+'</span>'+'</small>'
      + '</div>'
      + '<p class="mb-1 item-description">'+toDoItem.description+'</p>'
      + '<small class="item-points">'+pluralize(toDoItem.points, ['балл', 'балла', 'баллов']) +'</small>'
      + '<button type="button" class="btn btn-danger float-right" onclick="removeToDoItem(this)"><i class="far fa-trash-alt"></i></button>'
      + '</a>'
      );
    }
  }
  empty();
}

function empty(){
  if ($('#to-do-list-incomplite').children().length === 0 && $('#to-do-list-complite').children().length === 0) {
    $('#contentContainer').append(
      '<div class="jumbotron">'+
        '<h1 class="display-4">Похоже здесь ничего нет &#128558;</h1>'+
        '<p class="lead">Хотите создать какое-нибудь дело?</p>'+
        '<hr class="my-4">'+
        '<p>Если Вы уверены, что здесь что-то должно быть, отправьте нам, пожалуйста, отчёт об ошибке и мы постараемя её решить.</p>'+
        '<p class="lead">'+
          '<a class="btn theme-btn btn-primary btn-lg" href="#" data-toggle="modal" data-target="#sendReportModal" data-whatever="Проблемы с отображением дел." role="button">Отправить отчёт</a>'+
        '</p>'+
      '</div>'
    )
  }
}

window.addEventListener('scroll', onScroll, false);

var scrollNow = window.pageYOffset;

function onScroll() {
  if(window.pageYOffset > scrollNow){
    $('.btn-block').css({
      "width": "50px",
      "height": "50px",
      "border-radius": "100%"
    });
    $('.btn-block').html('<i class="fas fa-plus"></i>');
    $('.stat-btn').css({
      "height": "50px",
      "border-radius": "100%"
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
  document.getElementById('to-do-tittle').value = target.parentElement.getElementsByClassName('item-title')[0].innerText;
  document.getElementById('to-do-description').value = target.parentElement.getElementsByClassName('item-description')[0].innerText;
  document.getElementById('to-do-points').value = parseInt(target.parentElement.getElementsByClassName('item-points')[0].innerText);
    document.getElementById('to-do-time-hours').value = target.parentElement.getElementsByClassName('item-time-hours')[0].innerText; 
    document.getElementById('to-do-time-minutes').value = target.parentElement.getElementsByClassName('item-time-minutes')[0].innerText; 
    document.getElementById('to-do-date').value = chosenDate;


    $('#addNewToDoItemButton').hide();
    $('#updateToDoItemButton').show();
    $('#exampleModal').data( "to-do-item-id",  target.parentElement.id);
  $('#exampleModal').modal('show');
}

function updateToDoItemOnServer(target){
  if (!document.getElementById('to-do-tittle').value) {
      alert('Введите заголовок');
      return;
  }
  else if (!document.getElementById('to-do-points').value) {
    alert('Введите количетсво баллов');
    return;
  } 
  var updatedToDoItem = {
    id: $('#exampleModal').data( "to-do-item-id"),
    title: document.getElementById('to-do-tittle').value,
    description: document.getElementById('to-do-description').value,
      timeHours: document.getElementById('to-do-time-hours').value,
    timeMinutes: document.getElementById('to-do-time-minutes').value,
    points: document.getElementById('to-do-points').value,
    date: document.getElementById('to-do-date').value,
    userId: JSON.parse(localStorage.getItem('user')).email,
    status: "incomplite",
        admin: admItem
  }
  console.log(updatedToDoItem);
  $.post( "http://localhost:3000/tasks/update", updatedToDoItem, function( data ) {
    
    
  }, "json");
  $('#exampleModal').modal('hide');
  var updatedTarget = document.getElementById(updatedToDoItem.id)
  updatedTarget.getElementsByClassName('item-title')[0].innerText =document.getElementById('to-do-tittle').value ;
  updatedTarget.getElementsByClassName('item-description')[0].innerText = document.getElementById('to-do-description').value;
  updatedTarget.getElementsByClassName('item-points')[0].innerText = pluralize(document.getElementById('to-do-points').value, ['балл', 'балла', 'баллов']);
    updatedTarget.getElementsByClassName('item-time-hours')[0].innerText =document.getElementById('to-do-time-hours').value ;  
    updatedTarget.getElementsByClassName('item-time-minutes')[0].innerText =document.getElementById('to-do-time-minutes').value; 
  $('#exampleModal').on('hidden.bs.modal', function (e) {
      $('#addNewToDoItemButton').show();
      $('#updateToDoItemButton').hide();
  })
  restore()
};

function removeToDoItem(target) {
  $.ajax({
    url: "http://localhost:3000/tasks/delete/:taskId",
    type: 'GET',
    data: {"taskId": target.parentElement.id},
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function () {
        target.parentElement.remove();
        empty();
    },
    error: function(request,msg,error) {
        // handle failure
    }
  });
}

function addToDoItem() {
    if (!document.getElementById('to-do-tittle').value){
      alert('Введите заголовок!');
      return;
    }
    else if (!document.getElementById('to-do-points').value) {
      alert('Введите количество баллов');
      return;
    }
  toDoItem = {
    title: document.getElementById('to-do-tittle').value,
    description: document.getElementById('to-do-description').value,
      timeHours: document.getElementById('to-do-time-hours').value,
    timeMinutes: document.getElementById('to-do-time-minutes').value,
    points: document.getElementById('to-do-points').value,
    date: document.getElementById('to-do-date').value,
    userId: JSON.parse(localStorage.getItem('user')).email,
    status: "incomplite",
        admin: admItem
  }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/tasks/save',
    crossDomain: true,
        data: toDoItem,
        success: function(response) {
          var jumbotron = $('.jumbotron');
          if(jumbotron){
            jumbotron.remove();
          }
      $('#exampleModal').modal('hide');
      restore();
      var toDoList= $('#to-do-list-incomplite');
      if (toDoItem.date===chosenDate){
        toDoList.append('<a id="'+ response.id +'" href="#" class="list-group-item list-group-item-action">'
        + '<div class="d-flex w-100 justify-content-between">'
        + '<h5 class="mb-1 item-title">'+ toDoItem.title +'</h5>'
        + '<small>' + '<span class="item-time-hours">' + toDoItem.timeHours + '</span>:' + '<span class="item-time-minutes">' + toDoItem.timeMinutes + '</span></small>'
        + '</div>'
        + '<p class="mb-1 item-description">'+toDoItem.description+'</p>'
        + '<small class="item-points">'+pluralize(toDoItem.points, ['балл', 'балла', 'баллов']) +'</small>'
        + '<button type="button" class="btn btn-danger float-right" target="" onclick="removeToDoItem(this)"><i class="far fa-trash-alt"></i></button>'
        + '<button type="button" class="btn btn-primary float-right" onclick="updateToDoItem(this)"><i class="far fa-edit"></i></button>'
        + '<button type="button" class="btn btn-success float-right" onclick="compliteToDoItem(this)"><i class="far fa-check-circle"></i></button>' 
        + '</a>'
      );
      }
        }
    });

}

function compliteToDoItem(target) {
  document.getElementById('to-do-tittle').value = target.parentElement.getElementsByClassName('item-title')[0].innerText;
  document.getElementById('to-do-description').value = target.parentElement.getElementsByClassName('item-description')[0].innerText;
  document.getElementById('to-do-points').value = parseInt(target.parentElement.getElementsByClassName('item-points')[0].innerText);
  document.getElementById('to-do-time-hours').value = target.parentElement.getElementsByClassName('item-time-hours')[0].innerText; 
  document.getElementById('to-do-time-minutes').value = target.parentElement.getElementsByClassName('item-time-minutes')[0].innerText; 
  document.getElementById('to-do-date').value = chosenDate;
  $('#exampleModal').data( "to-do-item-id",  target.parentElement.id);
  $('#exampleModalLive').modal('show');
}

function compliteToDoItemOnServer(target){
  var complitedToDoItem = {
    id: $('#exampleModal').data( "to-do-item-id"),
    title: document.getElementById('to-do-tittle').value,
    description: document.getElementById('to-do-description').value,
      timeHours: document.getElementById('to-do-time-hours').value,
    timeMinutes: document.getElementById('to-do-time-minutes').value,
    points: document.getElementById('to-do-points').value,
    date: document.getElementById('to-do-date').value,
    userId: JSON.parse(localStorage.getItem('user')).email,
    status: "complite",
        admin: admItem
  }
  console.log(complitedToDoItem);
  $('#exampleModal').modal('hide');
  $('#exampleModalLive').modal('hide');
  $.post( "http://localhost:3000/tasks/complite", complitedToDoItem, function( data ) {
    
    
  }, "json");

  var updatedTarget = document.getElementById(complitedToDoItem.id)
  updatedTarget.getElementsByClassName('item-title')[0].innerText =document.getElementById('to-do-tittle').value ;
  updatedTarget.getElementsByClassName('item-description')[0].innerText = document.getElementById('to-do-description').value;
  updatedTarget.getElementsByClassName('item-points')[0].innerText = pluralize(document.getElementById('to-do-points').value, ['балл', 'балла', 'баллов']);
    updatedTarget.getElementsByClassName('item-time-hours')[0].innerText =document.getElementById('to-do-time-hours').value ;  
    updatedTarget.getElementsByClassName('item-time-minutes')[0].innerText =document.getElementById('to-do-time-minutes').value; 
  $('#exampleModal').on('hidden.bs.modal', function (e) {
      $('#addNewToDoItemButton').show();
      $('#updateToDoItemButton').hide();
  })
  restore();
  window.location.reload();
}

function restore(){
  document.getElementById('to-do-tittle').value = "";
  document.getElementById('to-do-description').value = "";
  document.getElementById('to-do-points').value = "";
  document.getElementById('to-do-time-hours').value = "" ;
  document.getElementById('to-do-time-minutes').value = "" ;
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
      return 'марта';
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
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-body input').val(recipient)
})

function switchDate() {
  chosenDate = $('#toInput').val();
  window.location = 'to do list.html?chosenDate=' + chosenDate;
}

function send(){
  var subject = $('#recipient-name').val();
  var body = $('#message-text').val();
  window.open('mailto:to-do-list-report-email@inbox.ru?subject=' + subject + '&body=' + body);
}

function logout() {
  localStorage.removeItem('isLogIn');
  localStorage.removeItem('user');
  window.location.replace('log in.html');
}

function showStat() {
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
      $('#statModal').modal('toggle');
      $('#statModalLabel').text('Статистика пользователя ' + user.firstName);
      $('#todayStat').text('Выполнено дел в этот день ' + $('#to-do-list-complite').children().length + '/' + $('#to-do-list-incomplite').children().length);
      $('#incompliteProgressToday').css('width', ($('#to-do-list-incomplite').children().length / ($('#to-do-list-incomplite').children().length + $('#to-do-list-complite').children().length))*100 + '%');
      $('#compliteProgressToday').css('width', ($('#to-do-list-complite').children().length / ($('#to-do-list-incomplite').children().length + $('#to-do-list-complite').children().length))*100 + '%');
      $('#allTimeStat').text('Выполнено дел за всё время ' + data.complitedTasks + '/' + data.incomplitedTasks);
      $('#incompliteProgressAllTime').css('width', (data.incomplitedTasks / (data.incomplitedTasks + data.complitedTasks))*100 + '%');
      $('#compliteProgressAllTime').css('width', (data.complitedTasks / (data.incomplitedTasks + data.complitedTasks))*100 + '%');
    },
    error: function(request,msg,error) {
      $('#statModal').modal('toggle');
      $('#statModalLabel').html('Упс &#128561;');
      $('#todayStat').text('К сожалению, нам не удалось получить данные с сервера, но не волнуйтиесь, мы уже работаем над этим!')
    }
  });
}

var weaData;
getForecast();

function getForecast(){
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
        $('#sky').html(data.weatherdata.weather[0].current[0].$.skytext);
        $('#temperature').html(data.weatherdata.weather[0].current[0].$.temperature + '&#8451;');
        $('#city').html(data.weatherdata.weather[0].$.weatherlocationname);
      }else{
        $('#sky').html('Не удалось загрузить прогноз.');
        $('#temperature').html('--/--&#8451;');
        $('#city').html(localStorage.getItem('city'));
      }
    },
    error: function(request,msg,error){
      console.log(request + ' ' + msg + ' ' + error);
      $('#sky').html('Не удалось загрузить прогноз.');
      $('#temperature').html('--/--&#8451;');
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
      $('#skyImg').attr('src', './weatherIcons/26.png');
      break;
    case '29':
    case '27':
    case '33':
      $('#skyImg').attr('src', './weatherIcons/29.png');
      break;
    case '30':
    case '28':
    case '34':
      $('#skyImg').attr('src', './weatherIcons/30.png');
      break;
    case '32':
    case '23':
    case '24':
    case '8':
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
  $.ajax({
    url: "http://localhost:3000/cities/get",
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      setAutocomplite(data);
    },
    error: function(request,msg,error){
      console.log(request + ' ' + msg + ' ' + error);
    }
  });
}

function setAutocomplite(data){
  $('#cityInput').autocomplete({source: data, appendTo: $('#weaModalBody')})
}

function setCity(){
  if ($('#cityInput').val().length === 0) {return}
  localStorage.setItem('city', $('#cityInput').val());
  $('#weaModal').modal('toggle');
  getForecast();
  $('#cityInput').val('');
}

function sortData() {
  $.ajax({
    url: "http://localhost:3000/cities/sort",
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      console.log(data);
    },
    error: function(request,msg,error){
      console.log(request + ' ' + msg + ' ' + error);
    }
  });
}
  