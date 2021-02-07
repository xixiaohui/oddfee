const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RingtoneSchema = new Schema({

    title: { type: String, required: true },
    des: { type: String, required: true },
    url: { type: String, required: true }
});


RingtoneSchema
    .virtual('ringtone_url')
    .get(function () {
        return '/ringtone/' + this._id;
    });

// 导出 Book 模块
module.exports = mongoose.model('Ringtone', RingtoneSchema);