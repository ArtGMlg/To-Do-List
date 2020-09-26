var express = require('express');
var router = express.Router();
var fs = require('fs');
const uuidv1 = require('uuid/v1');
var _ = require('lodash');

/* POST tasks listing. */
router.post('/save', function(req, res, next) {
	var task = req.body;

	var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
	task.id = uuidv1();
	data.tasks.push(task);

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		res.contentType('json');
		res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify(task));
	});
});
router.get('/check/:id', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		res.contentType('json');
		res.setHeader('Content-Type', 'application/json');
	    var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
		var tasks = data.tasks;
		var id = req.params.id;
		for (i = 0; i<tasks.length; i++){
			if (id == tasks[i].id) 	{
				tasks[i].status = req.query.status === "true" ? "complete" : "incomplete";
			}
		}
		data.tasks = tasks;
		fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
			res.send(JSON.stringify('done'));
		});
		
});
router.post('/saveMultiple', function(req, res, next) {
	var task = req.body;

	var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
	var usersIds = task.usersIds.split(",");
	task.usersIds = usersIds;

	for(i=0; i<usersIds.length; i++){
		var copy = task;
		
		copy.id = uuidv1();
		copy.userId = usersIds[i];
		data.tasks.push({
			title: copy.title,
			description: copy.description,
			timeHours: copy.timeHours,
			timeMinutes: copy.timeMinutes,
			points: copy.points,
			date: copy.date,
			status: copy.status,
			admin: copy.admin,
			id: copy.id,
			userId: copy.userId
		});
	}
		fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			res.contentType('json');
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(task));
		});
});

router.post('/update', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
  var task = req.body;

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  data.tasks;
  for (i=0;i<data.tasks.length;i++) {
    if (data.tasks[i].id === task.id) {
      data.tasks[i]= task;
      break;
    }
  }
  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
      res.contentType('json');
      res.send(JSON.stringify({
        message: "Запрос принят"
      }));
  });
});

router.get('/get', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');	
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8'),
      tasks = data.tasks,
      user = req.query,
      requestedTasks = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].userId === user.id && tasks[i].date === user.date) {
      requestedTasks.push(tasks[i]);
    }
  }

  var sortedTasks = _.sortBy(requestedTasks, ['time']);

  res.jsonp(sortedTasks);
});

router.get('/getAllTasks', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  res.jsonp(data);
});

router.get('/get-by-email/:email', function(req, res, next) {
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var tasks = data.tasks;
  var email = req.params.email;
  var userstasks=[];
  for (i = 0; i<tasks.length; i++){
	  if (tasks[i].userId === email) {
	    userstasks.push(tasks[i]);
	  }
  }
  res.setHeader('Content-Type', 'application/json');	
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.jsonp(userstasks);
});

router.post('/complete', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.contentType('json');
	
  var taskId = req.body.taskId;

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  for (var i = 0; i < data.tasks.length; i++) {
    if (data.tasks[i].id === taskId) {
      data.tasks[i].status = 'complete';
      break;
    }
  }
  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    res.send(JSON.stringify({
      success: true
    }));
  });
});

router.get('/getUserStat/:userId', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.contentType('json');
	res.setHeader('Content-Type', 'application/json');
  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
	var tasks = data.tasks;
	var userTasks = [];
	var count = 0;
	var id = req.query.userId;
	for (i = 0; i<tasks.length; i++){
		if (id === tasks[i].userId) 	{
			userTasks.push(tasks[i]);
		}
	}
	var incomplete = 0;
	var complete = 0;
	var points = 0;
	for (j = 0; j < userTasks.length; j++) {
		if (userTasks[j].status === 'incomplete') {
			incomplete = incomplete + 1;
		}else if (userTasks[j].status === 'complete') {
			complete = complete + 1;
			points = points + parseInt(userTasks[j].points);
		}
	}
	var status = {
		completedTasks: complete,
		incompletedTasks: incomplete,
		points: points
	}
	res.jsonp(status);
});

router.post('/delete', function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.contentType('json');
	res.setHeader('Content-Type', 'application/json');

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');
  var taskId = req.body.taskId;
	for (i = 0; i < data.tasks.length; i++){
		if(data.tasks[i].id === taskId){
			data.tasks.splice(i,1);
			break;
		}
	} 
  fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {
    res.end();
  });
})

module.exports = router;