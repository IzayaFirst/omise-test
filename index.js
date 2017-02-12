var express = require('express')
var path = require('path')
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')
var omise = require('omise')({
  'secretKey': 'skey_test_56xvl9vaoctzw49cszz'

})
var app = express();
app.engine('handlebars' , exphbs())
app.set('view engine' , 'handlebars')
app.set('views', path.join(__dirname, './src/templete'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get('/' , function(req , res){
  res.render('index.handlebars');
})
app.get('/complete' , function(req , res){
  res.send('Complete')
})
app.post('/Checkout' , function(req, res){
  var token = req.body.omiseToken
  console.log(token)
        omise.charges.create({
        'amount': '100000',
        'currency': 'thb',
        'card': token
        }, function(err, charge) {
          if(charge.status =='successful'){
                res.send("Complete Charging")
          }else{
            res.send(err)
          }
        });
})
app.listen(3000, function(){
  console.log("running at port 3000")
})
