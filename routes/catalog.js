const express = require('express');

// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const router = express.Router();

const request = require('request');

//导入控制器模块
const ringtone_controller = require('../controllers/ringtoneController');


//铃声列表目录
router.get('/', ringtone_controller.ringtone_list);

// router.get('/:id', ringtone_controller.ringtone_list);

router.get('/des', ringtone_controller.ringtone_description);

// const regexp = pathToRegexp("/.*all$/");

router.get(/.*all$/, ringtone_controller.ringtone_catagory);

module.exports = router;