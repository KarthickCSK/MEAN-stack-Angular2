'use strict';
// load the things we need
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/auth');
const Schema =  mongoose.Schema;
// define the schema for our user model
const UserSchema = mongoose.Schema({

    local: {
			user_name:{ type: String, required: true },
			email:{ type: String, required: true },
			password:{ type: String,required: true },
			authType:{ type:String }
		},
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String,
      authType: String,
      displayName:String,
      gender:String,
      photo:String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
      authType: String,
      gender:String,
      photo:String


    }

});

UserSchema.statics.generateToken = function(email) {
    let token = jwt.sign({
        id: email
    }, CONFIG.JWT.secret, {
        expiresIn: 15 * 60
    });
    return token;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', UserSchema);
