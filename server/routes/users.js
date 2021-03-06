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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  var user = req.body;

  //user.uniqNum = Math.floor(100000 + Math.random() * 900000);

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
    res.send(JSON.stringify({
  	  success: true,
  	  message: "Запрос принят"
  	}));
  });
});

router.post('/reg/confirm', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  for (i = 0; i < data.unconfirmedUsers.length; i++) {
    if (req.body.email === data.unconfirmedUsers[i].email && data.unconfirmedUsers[i].uniqNum === parseInt(req.body.num)) {
      delete data.unconfirmedUsers[i].uniqNum;
      data.users.push(data.unconfirmedUsers[i]);
      data.unconfirmedUsers.splice(i,1);
    }else{
      res.send(JSON.stringify({
        success: false
      }));
      return;
    }
  } 

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
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
      res.send(JSON.stringify({
        success: false,
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
  for (i = 0; i < users.length; i++) {
    var userScore = 0;
	for(j=0; j< Tasks.length; j++){
		if(Tasks[j].status === "complete" && Tasks[j].userId === users[i].email){
			userScore = userScore + parseInt(Tasks[j].points);
		};
	};
	users[i].score = userScore;
  };
  
  var sortedUsers = _.sortBy(users, ['score']);
  var revercedSort  = _.reverse(sortedUsers);
  
  res.jsonp(revercedSort);
});

router.post('/change', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  var updatedUser = req.body;

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  for (i = 0; i < data.users.length; i++) {
    if (updatedUser.email === data.users[i].email) {
      updatedUser.password = data.users[i].password;
      updatedUser.admin = data.users[i].admin;
      data.users[i] = updatedUser;
    }
  }

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    res.send(JSON.stringify({
      success: true,
      message: "Запрос принят"
    }));
  });
});

router.post('/confirmNewEmail', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  var email = req.body.id,
      num = parseInt(req.body.num),
      user,
      groupU;

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  for (i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email) {
      if (data.users[i].num === num) {
        data.users[i].email = data.users[i].newMail;
        user = data.users[i];
        for (var j = 0; j < data.tasks.length; j++) {
          if (data.tasks[j].userId === email) {
            data.tasks[j].userId = data.users[i].newMail;
            continue;
          }
        };
        delete data.users[i].num;
        delete data.users[i].newMail;
        break;
      } else {
        res.status(500).jsonp({});
      }
    }
  };

  allGroupsLoop:
  for (x = 0; x < data.groups.length; x++){
    groupLoop:
    for (y = 0; y < JSON.parse(data.groups[x].users).length; y++) {
      groupU = JSON.parse(data.groups[x].users);
      if (groupU[y] === email) {
        groupU[y] = user.email;
        data.groups[x].users = JSON.stringify(groupU);
        break groupLoop;
      }
    }
  };

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    delete user.password;
    res.send(JSON.stringify(user));
  });
});

router.post('/changePassword', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  var email = req.body.id,
      password = req.body.pass,
      newPassword = req.body.newPass;

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  for (i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email) {
      if (data.users[i].password === password) {
        data.users[i].password = newPassword;
        fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
          res.send(JSON.stringify({
            success: true
          }));
        });
        break;
      }else{
        res.send(JSON.stringify({
          success: false
        }))
        break;
      }
    }
  }
});

module.exports = router;
