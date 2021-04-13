const express = require('express');

var fs = require('fs');
var multer = require('multer')
let path = require("path");

var upload = multer({ dest: '../public/images/privatestore/mystore/' });

//上传文件配置  
const storage = multer.diskStorage({
    //文件存储位置  
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/images/privatestore/mystore/'));
    },
    //文件名  
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${Math.ceil(Math.random() * 1000)}_multer.${file.originalname.split('.').pop()}`);
    }
});
const uploadCfg = {
    storage: storage,
    limits: {
        //上传文件的大小限制,单位bytes  
        fileSize: 1024 * 1024 * 20
    }
}



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


//下载图片
router.get('/download', photo_controller.photo_download);

//上传图片
router.post('/api/upload', async(req, res) => {
    let upload = multer(uploadCfg).any();
    upload(req, res, async(err) => {
        if (err) {
            res.json({ path: `/images/privatestore/mystore/${uploadFile.filename}` });
            console.log(err);
            return;
        };
        console.log(req.files);
        let uploadFile = req.files[0];
        res.json({ path: `/images/privatestore/mystore/${uploadFile.filename}` });
    });

});

module.exports = router;