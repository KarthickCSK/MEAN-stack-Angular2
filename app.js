const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const index = require('./webserver/routes/index');
const auth = require('./webserver/routes/auth');
const user = require('./webserver/routes/user');
const config = require('./webserver/config/database');
const cors = require('cors')
const app = express();

//Port number
const port = 3000;

//cofigure passport
require('./webserver/config/passport')(passport);

// required for passport
app.use(session({
    secret: 'sessionsecret', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//connect to database
mongoose.connect(config.uri);
mongoose.connection.on('connected',()=>{
	console.log('Connected to Database: '+config.db)
});
mongoose.connection.on('err',()=>{
	console.log('error in connecting to Database: ',err);
});

//Static files
app.use(express.static(__dirname + '/webclient/src/'));

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/webclient/src/index.html'));
});

//Routes
app.use('/',index);
app.use('/user',user);
app.use('/auth',auth);

//initiate port
app.listen(port,()=>{
	console.log('Server started at',port);
})

