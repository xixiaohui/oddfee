const express = require('express');

// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const router = express.Router();

const request = require('request');

//导入控制器模块
const photo_controller = require('../controllers/photoController');
// const Ringtone = require('../models/Ringtone');


//请求图片数据
router.get('/', photo_controller.photos);


//搜索图片
router.get('/search', photo_controller.photoSearch);


//请求图片数据
router.get('/data', photo_controller.photo_load_one_page);


module.exports = router;