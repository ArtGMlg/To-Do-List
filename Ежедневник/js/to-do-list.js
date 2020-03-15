if (!localStorage.getItem('isLogIn')) {
	window.location="log in.html";
}

var searchParams = new URLSearchParams(window.location.search);
var chosenDate = searchParams.get('chosenDate');
document.getElementById('to-do-date').value = chosenDate;

var breadCrumbToDoList = $('#breadCrumbToDoList');
var chosenDateString = new Date(chosenDate).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

breadCrumbToDoList.append(' ' + chosenDateString);

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
    }
  });

function addToDoItemsFromServer(data) {
	var email = JSON.parse(localStorage.getItem('user')).email;
	for(i=0; i<data.tasks.length; i++){
		if(chosenDate===data.tasks[i].date && email===data.tasks[i].userId){
			toDoItem = {
			    title: data.tasks[i].title,
				description: data.tasks[i].description,
			    timeHours: data.tasks[i].timeHours,
				timeMinutes: data.tasks[i].timeMinutes,
				points: data.tasks[i].points,
				id: data.tasks[i].id
			}
	for (var x = 0; x < data.users.length; x++) {
				if (data.users[x].email===email) {
					admItem=data.users[x].admin;
				}
			}		
			var toDoList= $('#to-do-list');
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
		}
	}
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
			$('#exampleModal').modal('hide');
			var toDoList= $('#to-do-list');
			if (toDoItem.date===chosenDate){
				toDoList.append('<a id="'+ response.id +'" href="#" class="list-group-item list-group-item-action">'
				+ '<div class="d-flex w-100 justify-content-between">'
				+ '<h5 class="mb-1 item-title">'+ toDoItem.title +'</h5>'
				+ '<small>' + '<span class="item-time-hours">' + toDoItem.timeHours + '</span>:' + '<span class="item-time-minutes">' + toDoItem.timeMinutes + '</span></small>'
				+ '</div>'
				+ '<p class="mb-1 item-description">'+toDoItem.description+'</p>'
				+ '<small class="item-points">'+pluralize(toDoItem.points, ['балл', 'балла', 'баллов']) +'</small>'
				+ '<button type="button" class="btn btn-danger float-right" onclick="removeToDoItem(this)"><i class="far fa-trash-alt"></i></button>'
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


    //$('#addNewToDoItemButton').hide();
    //$('#updateToDoItemButton').show();
    $('#exampleModal').data( "to-do-item-id",  target.parentElement.id);
	$('#exampleModalLive').modal('show');
	//$('#exampleModal').modal('show');
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