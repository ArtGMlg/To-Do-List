var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var query = req.query;
  var login = query.userName;
  var password = query.password;
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var response;
  for (i =0;i<data.users.length;i++){
    if (login === data.users[i].email && password === data.users[i].password)  {
      response=data.users[i];
      break;
    }
  }
  if (response) {
      res.jsonp(response);
    } else {
      res.status(500).jsonp({});
    }
});

router.post('/reg', function(req, res, next) {
  var user = req.body

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.contentType('json');
	res.setHeader('Content-Type', 'application/json');
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
    for (i = 0; i < data.users.length; i++) {
		if (user.email === data.users[i].email) {
			
			res.send(JSON.stringify({
			  error: "Пользователь с таким Email уже существует!"
			}));
			return;
		}
	}
  
  data.users.push(user);	
		
    

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
  	res.contentType('json');
    res.send(JSON.stringify({
	  success: true,
	  message: "Запрос принят"
	}));
  });
});

router.post('/regAdmin', function(req, res, next) {
  var adminUser = req.body

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
    for (i = 0; i < data.adminUsers.length; i++) {
    if (adminUser.email === data.adminUsers[i].email) {
      console.log('Ура мы тут');
      
      res.send(JSON.stringify({
        error: "Пользователь с таким Email уже существует!"
      }));
      return;
    }
  }
  
  data.adminUsers.push(adminUser);  
    
    

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    res.contentType('json');
    res.send(JSON.stringify({
    success: true,
    message: "Запрос принят"
  }));
  });
});

router.get('/adminLogin', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var admQuery = req.query;
  var admLogin = admQuery.admUserName;
  var admPassword = admQuery.admPassword;
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var response;
  for (i =0;i<data.adminUsers.length;i++){
    if (admLogin === data.adminUsers[i].email && admPassword === data.adminUsers[i].password)  {
      response=data.adminUsers[i];
      break;
    }
  }
  if (response) {
      res.jsonp(response);
    } else {
      res.status(500).jsonp({});
    }
});

router.get('/get', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var users = data.users;
  var usersForAdmin = [];
  //console.log(users);
  for (i = 0; i < users.length; i++) {
    usersForAdmin.push({
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        surName: users[i].surName,
        email: users[i].email
    });
  };
  res.jsonp(usersForAdmin);
});

router.get('/getTop', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var users = data.users;
  var Tasks = data.tasks;
  //console.log(users);
  for (i = 0; i < users.length; i++) {
    var userScore = 0;
	for(j=0; j< Tasks.length; j++){
		if(Tasks[j].status === "complite" && Tasks[j].userId === users[i].email){
			userScore = userScore + 1;
		};
	};
	users[i].score = userScore;
  };
  
  var sortedUsers = _.sortBy(users, ['score']);
  
  res.jsonp(sortedUsers);
});

module.exports = router;
