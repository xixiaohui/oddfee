const express = require('express');

// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const router = express.Router();

const request = require('request');

//导入控制器模块
const food_controller = require('../controllers/foodController');



//铃声列表目录
router.get('/', food_controller.foodToday);

// router.get('/:id', ringtone_controller.ringtone_list);


router.get('/login', food_controller.login);

module.exports = router;