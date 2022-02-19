/*
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const adminData = require('./routs/admin');
const index = require('./routes 2/index');
const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use('/admin',adminData.routes);
app.use(index);

app.use('/indexof',(req,res,next) =>  {
    res.send('<h1>page of index</h1>');
    console.log('hello............');
});



app.listen(3000);
*/
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


//const http = require("http");
//const routes = require('./routse');
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const expressHbs = require('express-handlebars');
const error = require('./controller/error');
//const mongoConnect = require('./Util/database').mongoConnect;







//const adminData = require('./routes2/adminData');
//const index = require('./routes2/index');
app.set('view engine','pug');

//app.engine('hbs',expressHbs());
app.set('view engine', 'ejs');
app.set('views', 'views');



const adminData = require('./routs/admin'); 
const shopRouter = require('./routs/shop');




app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminData.routes);
app.use(shopRouter);
app.use('/indexof',(req,res,next) =>  {
    console.log('hello............');
    res.send('<h1>page of index</h1>');
    
});
app.use(express.static(path.join(__dirname,'public')));


//app.use(error.geterror);


  
//console.log(routes.sometext);
//const server  = http.createServer(app);

// mongoConnect(() => {
//     app.listen(5000);
// });
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false
    })
  );
const MONGODB_URI =
'mongodb+srv://Graduatenum1:9qb2gSvMdPrFrMC@cluster0.bwlfg.mongodb.net/SHOP?retryWrites=true&w=majority';


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'users'
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });


// note
// insert two Syntax to package.json
// "start": "nodemon first.js",
// "start-server": "node first.js"
