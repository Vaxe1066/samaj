var express = require('express');
var router = express.Router();
const path = require('path');

const auth_controller = require("../controllers/auth.controller");
const directory_controller = require("../controllers/directory");
const events_controller = require("../controllers/events");

const { verifySignUp, authJwt } = require("../middlewares");


const directory = require('../models/directory');




//routes for authentication
router.post('/auth/signup', [verifySignUp.checkDuplicateEmail], auth_controller.signup);
router.post("/auth/signin", auth_controller.signin);



//routes for posting and accessing the directory
router.get('/profile/search/:search', directory_controller.directory_search_get)
router.get('/profile/:id',  [authJwt.verifyToken, authJwt.isMember], directory_controller.directory_get);
router.post('/profile/:id', [authJwt.verifyToken, authJwt.isMember], directory_controller.directory_post);
router.put('/profile/:id',[authJwt.verifyToken, authJwt.isMember], directory_controller.directory_update);

//routes for events 
router.get('/events', events_controller.events_get);
router.post('/events', events_controller.events_post);
router.post('/events/:id', events_controller.events_update);
router.get('/events/:id', events_controller.events_detail_get)
router.delete('/events/:id', events_controller.event_delete)




module.exports = router;