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
	var chosenDate = today.getFullYear() + '-' + month + '-' + today.getDate();
}

document.getElementById('to-do-date').value = chosenDate;

var calendarIcon = $('#calendarIcon');
var chosenDateString = new Date(chosenDate).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

calendarIcon.append('<u id="dateText">' + chosenDateString + '</u>');

var toDoItem = {
};

var admItem;

$('#updateToDoItemButton').hide();
$('body').css('height', $(window).height()*1.5+"px");

var bb;

$.ajax({
    url: "http://localhost:3000/tasks/get",
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    	bb = data;
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
				    '<a class="btn btn-primary btn-lg" href="#" data-toggle="modal" data-target="#sendReportModal" data-whatever="Возникает ошибка." role="button">Отправить отчёт</a>'+
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
			+ '<button type="button" class="btn btn-danger float-right" onclick="removeToDoItem(this)"><i class="far fa-trash-alt"></i></button>'
			+ '<button type="button" class="btn btn-primary float-right" onclick="updateToDoItem(this)"><i class="far fa-edit"></i></button>'
			+ '<button type="button" class="btn btn-success float-right" onclick="compliteToDoItem(this)"><i class="far fa-check-circle"></i></button>'
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
			    '<a class="btn btn-primary btn-lg" href="#" data-toggle="modal" data-target="#sendReportModal" data-whatever="Проблемы с отображением дел." role="button">Отправить отчёт</a>'+
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
  }else{
    $('.btn-block').css({
    	"width": "",
    	"height": "",
    	"border-radius": ""
    });
    $('.btn-block').html('Добавить');
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

    restore()

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