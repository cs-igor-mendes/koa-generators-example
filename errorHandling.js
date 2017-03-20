var koa = require('koa');
var router = require('koa-router');
var app = new koa();
var _ = router();

_.get('/not_found', printErrorMessage);
_.get('/hello', printHelloMessage);
app.use(_.routes());

app.use(handle404Errors);

function *printHelloMessages(){
    this.status = 200;
    this.body = "Hey there!";
}


function *printErrorMessage(){
    this.status = 404;
    this.body = "Sorry we do not have this resource.";
}

function *printHelloMessage(){
    this.status = 200;
    this.body = "Hey there!";
}

function *handle404Errors(next){
  if (404 != this.status) return;
  this.redirect('/not_found');
}

app.listen(3000);
