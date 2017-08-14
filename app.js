const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./webserver/routes/index');
const user = require('./webserver/routes/user');

const cors = require('cors')
const app = express();

//Port number
const port = 3000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//connect to database
mongoose.connect('mongodb://localhost:27017/meanDB');
mongoose.connection.on('connected',()=>{
	console.log('Connected to Database')
});
mongoose.connection.on('err',()=>{
	console.log('error in connecting to Database',err);
});

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use('/',index);
app.use('/user',user);
//initiate port
app.listen(port,()=>{
	console.log('Server started at',port);
})