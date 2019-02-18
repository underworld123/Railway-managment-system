var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(2300);
console.log('Server is ready');

app.set('view engine', 'ejs');
//doing this make nodejs set default view engine as ejs 

app.use(express.static(__dirname + '/public'));
//express.static is used to load CSS and image files i.e. all general static files.

app.get('/', function(req,res){
	res.render('index');
});
//--------------------------------------------
var data = {
	'user':{
		"admin" : 'admin',
		"rishabh" : 'password'
	}
};
var valchck = {
	'logs':{
		1232122311222231 : 345,
		4321235123414231 : 243
	}
};

var json = JSON.stringify(data);
fs.writeFile('jsonfile.json', json, 'utf8');

//--------------------------------------------
app.post('/login', function(req,res){
	var un=req.body.username;
	var ps=req.body.password;

	console.log(un);
	console.log(ps);

	var to=fs.readFileSync('jsonfile.json', 'utf8');
	console.log(to);
	var ob = JSON.parse(to);
	console.log(ob);
	if( ob.user[un] == ps){
		console.log("Success");
		res.render('bookticket');
	}
	else {
		render('login');
		console.log("Wrong password");
	}
});

app.get('/register', function(req,res){
	res.render('registeruser');
});

app.post('/registerus', function(req,res){
	var un=req.body.uname;
	var ps=req.body.upass;

	console.log("in register");
	var to=fs.readFileSync('jsonfile.json', 'utf8');
	var ob = JSON.parse(to);
	console.log(ob);
	var c=ob.user;
	c[un]=ps;
	var json = JSON.stringify(ob);
	fs.writeFileSync('jsonfile.json', json, 'utf8');

	res.render('index');
});

var cost=0;
var cht={"delhi":105,
		 "ambala":50,
		 "chandigarh":90,
		 "Shimla":70};
app.post('/booktic', function(req,res){
	var fname=req.body.fname;
	var lname=req.body.lname;

	var srcc=req.body.srcc;
	var dt=req.body.dst;
	var st=req.body.nost;
	console.log(cht[srcc]);
	console.log(cht[dt]);
	if(cht[srcc]>cht[dt]){
		cost=(cht[srcc]-cht[dt]);	
	}
	else cost=(cht[dt]-cht[srcc]);
	cost=cost*st;
	console.log(cost);

	res.render('payment',snd = {fn: fname, ln: lname ,ct: cost});
});

app.post('/pay', function(req,res){
	var ccno=req.body.ccno;
	var ccvno=req.body.ccvno;
	var mnt=req.body.mnt;

	if(mnt>0&&mnt<=12){
		if(ccvno==345 && ccno==1232122311222231){
			console.log('success');
			res.render('success');
		}
		else if(ccno=4321235123414231&&ccvno==243){
			console.log('success');
			res.render('success');
		}
		else {
			console.log('unsuccess');
			res.render('login');	
		}
	}
	else {
		console.log('unsuccess');
		res.render('login');
	}
});	
