function pageButtoneClick(elem) {





}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}


window.onload = function() {
    //do something
    console.log("on loaded. my.js")
    const allitems = document.getElementsByClassName('page-item');
    Array.prototype.forEach.call(allitems, function(el, i) {


    });

    addCatagoriesTag();
}

//绑定分页按钮点击事件
let first = document.getElementById('first');
if (first != null) {
    document.getElementById('first').addEventListener('click', firstButtonClick);
    document.getElementById('prev').addEventListener('click', prevButtonClick);
    document.getElementById('next').addEventListener('click', nextButtonClick);
    document.getElementById('last').addEventListener('click', lastButtonClick);
}

//点击首页按钮
function firstButtonClick(e) {
    e.preventDefault();
    console.log(document.baseURI);
    console.log(document.URL);
    console.log(document.location.pathname);

    let pathname = document.location.pathname;

    window.location.href = pathname + "?page=1";
}

//点击前一页按钮
function prevButtonClick(e) {
    console.log('prevButtonClick');
    let pathname = document.location.pathname;

    let target = e.currentTarget;
    let jumppage = target.dataset.prepage;
    if (jumppage > 0) {
        window.location.href = pathname + "?page=" + jumppage;
    }
}

//点击后一页按钮
function nextButtonClick(e) {
    console.log('nextButtonClick');
    let pathname = document.location.pathname;

    let target = e.currentTarget;
    let jumppage = parseInt(target.dataset.nextpage);

    console.log("jumppage = " + jumppage);

    let allpage = parseInt(document.getElementById('last').dataset.allpage);

    console.log("allpage = " + allpage);

    console.log(typeof(jumppage));
    if (jumppage <= allpage) {
        window.location.href = pathname + "?page=" + jumppage;
    } else {
        console.log("no jump");
    }
}

//点击最后一页按钮
function lastButtonClick(e) {
    console.log('lastButtonClick');
    let pathname = document.location.pathname;
    let target = e.currentTarget;
    let jumppage = target.dataset.allpage;

    window.location.href = pathname + "?page=" + jumppage;
}

// document.getElementById('myplaybutton').addEventListener('click', playRingtone)

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


//增加分类标签
function addCatagoriesTag() {

    console.log('addCatagoriesTag');

    const tags = ['Love', 'Joker', 'BGM', 'Nokia', 'Telugu', 'Oppo', 'iPhone', 'Vivo', 'Xiaomi', 'Blackberry',
        'Infinix', 'Call', 'Samsung', 'Oneplus', 'Sounds', 'Islamic', 'Airtel', 'English', 'Tik Tok', 'Warning',
        'Alarm', 'Funny', 'Instrumental', 'Techno', 'Mood Off', 'Pakistani Song', 'Music', 'Electronica', 'Google', 'Motorola',
        'LG', 'Scary', 'Animal', 'IPL', 'Remix', 'SMS', 'Arabic', 'Classical', 'Romantic', 'Corona',
        'Poetry', 'Attitude', 'PSL 5', '2020', 'Haryanvi', 'Spanish', 'Christmas', 'Bhojpuri', 'Dialogue', 'Bollywood',
        'Sad', 'Tamil', 'Punjabi', 'Desh Bhakti', 'Malayalam', 'Mashup', 'Bengali', 'Kannada', 'Lava', 'Marathi'
    ];

    for (let i = 0; i < tags.length; i++) {

        let element = document.createElement('li');
        let link = document.createElement('a');
        link.innerHTML = tags[i];
        link.classList.add('dropdown-item');
        link.href = "/ringtone/" + tags[i] + "-all";
        element.appendChild(link);

        let menu = null;
        if (i < 20) {
            menu = document.getElementById('mydropdownmenu-first');
        } else if (i < 40) {
            menu = document.getElementById('mydropdownmenu-second');
        } else {
            menu = document.getElementById('mydropdownmenu-third');
        }
        menu.appendChild(element);
    }


}