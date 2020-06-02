if(localStorage.getItem('theme') === 'light'){
  $('head').append('<link rel="stylesheet" type="text/css" href="./css/toDoList.css">')
}else if(localStorage.getItem('theme') === 'dark'){
	$('head').append('<link rel="stylesheet" type="text/css" href="./css/toDoListDark.css">')
}