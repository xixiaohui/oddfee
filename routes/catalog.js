const express = require('express');

// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const router = express.Router();

const request = require('request');

//导入控制器模块
const ringtone_controller = require('../controllers/ringtoneController');
const Ringtone = require('../models/Ringtone');


//铃声列表目录
router.get('/', ringtone_controller.ringtone_list);

// router.get('/:id', ringtone_controller.ringtone_list);

router.get('/des', ringtone_controller.ringtone_description);

// const regexp = pathToRegexp("/.*all$/");

router.get(/.*all$/, ringtone_controller.ringtone_catagory);

//测试请求数据
router.get('/data', ringtone_controller.ringtone_load_one_page);

//请求分类数据
router.get('/catagory', ringtone_controller.ringtone_load_catagory_one_page);

module.exports = router;