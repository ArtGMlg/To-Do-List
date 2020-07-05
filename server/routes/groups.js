var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

router.post('/create', function(req, res, next) {
  var group = {
  	name: req.body.name,
  	users: req.body.users
  }

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.contentType('json');
	res.setHeader('Content-Type', 'application/json');
	var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
    for (i = 0; i < data.groups.length; i++) {
		if (group.name === data.groups[i].name) {
			res.send(JSON.stringify({
			  error: "Группа с таким именем уже существует!"
			}));
			return;
		}
	}
  
  data.groups.push(group);	
		
    

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
  	res.contentType('json');
    res.send(JSON.stringify({
	  success: true,
	  message: "Запрос принят"
	}));
  });
});

router.post('/update', function(req, res, next) {
  var group = {
  	name: req.body.name,
  	users: JSON.parse(req.body.users)
  }

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.contentType('json');
	res.setHeader('Content-Type', 'application/json');
	var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
    for (i = 0; i < data.groups.length; i++) {
		if (group.name === data.groups[i].name) {
			var newUsers = group.users.concat(JSON.parse(data.groups[i].users));
			function onlyUnique(value, index, self) { 
				return self.indexOf(value) === index;
			}
			newUsers = JSON.stringify(newUsers.filter( onlyUnique ));
			data.groups[i].users = newUsers;
			fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
				res.contentType('json');
				res.send(JSON.stringify({
				  success: true,
				  message: "Запрос принят"
				}));
			});
		}
	}
});

router.get('/get', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var groups = data.groups;
  var groupsForAdmin = [];
  for (i = 0; i < groups.length; i++) {
    groupsForAdmin.push({
        name: groups[i].name,
        users: groups[i].users
    });
  };
  res.jsonp(groupsForAdmin);
});

router.get('/users/:groupName', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var users = data.users;
  var groups = data.groups;
  var group = {};

  for(i=0; i<groups.length; i++){
    if(groups[i].name===req.params.groupName){
      group = groups[i];
    };
  };
var groupUsers = [];
  for(i=0; i<group.users.length; i++){
    for(j=0; j<users.length; j++){
      if(JSON.parse(group.users)[i]===users[j].email){
        groupUsers.push({
          firstName: users[j].firstName,
          lastName: users[j].lastName,
          surName: users[j].surName,
          email: users[j].email
        });
      };
    }; 
  };
  res.jsonp(groupUsers);
});

router.post('/remove', function(req, res, next) {
  var groups = JSON.parse(req.body.groupNames);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var result = [];
  for (i = 0; i < data.groups.length; i++) {
    var flag = false;
    for (j=0; j<groups.length; j++){
      if(data.groups[i].name === groups[j]){
        flag = true
      }; 
    };
    if(flag === false){
      result.push(data.groups[i]);
    };
  };
  
  data.groups = result;  
    
    

  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    res.contentType('json');
    res.send(JSON.stringify({
    success: true,
    message: "Запрос принят"
  }));
  });
});
router.post('/removeUsers', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var groups = data.groups;
  var groupId =req.body.groupId.toString();
  var peopleIds = JSON.parse(req.body.peopleIds);
  
	
  for (i = 0; i< groups.length; i++){
		if (groupId.toString() == groups[i].name.toString()){
			groups[i].users  = JSON.stringify(JSON.parse(groups[i].users).filter( function( el ) {
			  return peopleIds.indexOf( el ) < 0;
			}));
		}
  }
  
  data.groups = groups;
   fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    res.contentType('json');
    res.send(JSON.stringify({
    success: true,
    message: "Запрос принят"
  }));
  });
  
});

router.get('/getTop', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var users = data.users;
  var Tasks = data.tasks;
  var groups = data.groups;
  for (i = 0; i < users.length; i++) {
    var userScore = 0;
    for(j=0; j< Tasks.length; j++){
      if(Tasks[j].status === "complite" && Tasks[j].userId === users[i].email){
        userScore = userScore + parseInt(Tasks[j].points);
      };
    };
    users[i].score = userScore;
  };

  for (i = 0; i < groups.length; i++) {
    var groupUsers = JSON.parse(groups[i].users);
    var groupScore = 0;
    for (j = 0; j < groupUsers.length; j++) {
     for (x = 0; x < users.length; x++) {
       if (groupUsers[j] === users[x].email) {
         groupScore = groupScore + users[x].score;
       };
     };
    };
    groups[i].score = groupScore;
  };

  var sortedGroups = _.sortBy(groups, ['score']);
  var revercedSort  = _.reverse(sortedGroups);
  
  res.jsonp(revercedSort);
});
module.exports = router;