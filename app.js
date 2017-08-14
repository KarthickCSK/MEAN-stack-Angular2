const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./webserver/routes/index');
const user = require('./webserver/routes/user');
const config = require('./webserver/config/database');
const cors = require('cors')
const app = express();

//Port number
const port = 3000;

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
app.use(express.static(__dirname + '/webclient/dist/'));

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/webclient/dist/index.html'));
});

//Routes
app.use('/',index);
app.use('/user',user);

//initiate port
app.listen(port,()=>{
	console.log('Server started at',port);
})

