var express = require('express');
var router = express.Router();
const path = require('path');
const uuid = require('uuid');

const auth_controller = require("../controllers/auth.controller");
const directory_controller = require("../controllers/directory");
const events_controller = require("../controllers/events");

const { verifySignUp, authJwt } = require("../middlewares");


const directory = require('../models/directory');

const multer = require('multer');
const fs = require('fs-extra')


const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public'));
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//routes for authentication
router.post('/auth/signup', [verifySignUp.checkDuplicateEmail, upload.single('profileImg')], auth_controller.signup);
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