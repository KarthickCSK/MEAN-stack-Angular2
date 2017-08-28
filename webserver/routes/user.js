const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/getAllUSer',(req, res, next)=>{
	user.find(function(err,user){
		res.json({user});
	});
});

router.post('/addUser',(req, res, next)=>{
	console.log(req.body);
	let newUser = new user();
		newUser.local.username=req.body.username;
		newUser.local.email=req.body.email;
		newUser.local.password=req.body.password;
	
	console.log(newUser);
	newUser.save((err, user)=>{
		if(err){
			res.json({
				msg:'Failed to add new user',
				error:err,
				result: false
			});
		}else if(user){
			res.json({
				user: user,
				msg:'Successfully Registered',
				result: true
			});
		}
	});
});

router.delete('/deleteUser/:username',(req, res, next)=>{
	user.remove({'local.username':req.params.username}, function(err, result){
		if(err){
			res.json({
				msg:'Failed to remove user',
				error:err
			});
		}else if(result.result.n==1){
			res.json({
				msg:'Successfully removed user',
			});
		}else if(result.result.n==0){
			res.json({
				msg:'User not found'
			});
		}
	});	
});
module.exports = router;