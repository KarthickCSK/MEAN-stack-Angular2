const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/getAllUSer',(req, res, next)=>{
	user.find(function(err,user){
		res.json({user});
	});
});

router.post('/addUser',(req, res, next)=>{
	let newUser = new user({
		user_name:req.body.username,
		email:req.body.email,
		password:req.body.password
	});
	newUser.save((err, user)=>{
		if(err){
			res.json({
				msg:'Failed to add new user',
				error:err
			});
		}else if(user){
			res.json({
				msg:'Successfully added new user'
			});
		}
	});
});

router.delete('/deleteUser/:username',(req, res, next)=>{
	user.remove({user_name:req.params.username}, function(err, result){
		if(err){
			res.json({
				msg:'Failed to remove user',
				error:err
			});
		}else if(result){
			res.json({
				msg:'Successfully removed user'
			});
		}
	});	
});
module.exports = router;