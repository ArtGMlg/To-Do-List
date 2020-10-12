if(localStorage.getItem('theme') === 'light'){
  $('head').append(['<link rel="stylesheet" type="text/css" href="./css/toDoList.css">', '<link rel="shortcut icon" href="./img/tdl-ico.ico" type="image/x-icon">'])
}else if(localStorage.getItem('theme') === 'dark'){
  $('head').append(['<link rel="stylesheet" type="text/css" href="./css/toDoListDark.css">', '<link rel="shortcut icon" href="./img/tdl-ico-dark.ico" type="image/x-icon">'])
}