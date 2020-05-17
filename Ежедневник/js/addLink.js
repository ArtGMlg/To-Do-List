if(localStorage.getItem('theme') === 'light'){
  $('head').append('<link rel="stylesheet" type="text/css" href="./ccs/toDoList.css">')
}else if(localStorage.getItem('theme') === 'dark'){
	$('head').append('<link rel="stylesheet" type="text/css" href="./ccs/toDoListDark.css">')
}