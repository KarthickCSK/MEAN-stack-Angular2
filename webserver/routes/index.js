const express = require('express');
const router = express.Router();

router.get('/index',(req, res, next)=>{
	res.send('Working with server side');
});

router.post('/index',(req, res, next)=>{
	//
});

router.delete('/index',(req, res, next)=>{
	//
});
module.exports = router;