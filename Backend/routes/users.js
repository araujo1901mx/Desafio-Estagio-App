import express from 'express'
import { createUser } from '../Controllers/UserController'
import router from './login'

const router = express.Router()

router.post('/users', createUser)




/*
var express = require('express');
var router = express.Router();

 GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/