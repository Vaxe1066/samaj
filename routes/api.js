var express = require('express');
var router = express.Router();
const path = require('path');

const auth_controller = require("../controllers/auth.controller");
const directory_controller = require("../controllers/directory");
const events_controller = require("../controllers/events");


const directory = require('../models/directory');




//routes for authentication
router.post('/auth/signup', auth_controller.signup);
router.post("/auth/signin", auth_controller.signin);



//routes for posting and accessing the directory
router.get('/profile/:id', directory_controller.directory_get);
router.post('/profile/:id', directory_controller.directory_post);

//routes for events 
router.get('/events', events_controller.events_get);
router.post('/events', events_controller.events_post);
router.get('/events/:id', events_controller.events_detail_get)


module.exports = router;