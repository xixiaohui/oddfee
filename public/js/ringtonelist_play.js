//响应页面按钮的点击事件，单独放在一个非module的js文件
function playRingtone(e) {
    // let dataset = e.currentTarget.dataset;
    let ringtone_title = e.getAttribute('data-ringtonetitle');
    let ringtone_des = e.getAttribute('data-ringtonedes');
    let ringtone_url = e.getAttribute('data-ringtoneurl');
    let ringtone_id = e.getAttribute('data-ringtoneid');

    console.log(ringtone_title);
    console.log(ringtone_des);
    console.log(ringtone_url);
    console.log(ringtone_id);


    window.location.href = "/ringtone/des?id=" + ringtone_id;
}