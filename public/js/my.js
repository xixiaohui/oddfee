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
    // throw new Error("some error happened");

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

function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

window.onscroll = function() {
    if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
        console.log("已经到最底部了!");

        let href = window.location.href;
        console.log(href);
        if (href.endsWith('ringtone') || href.endsWith('all')) {
            addLoadingData();
        }

    }
};

let currentPage = parseInt(window.sessionStorage.getItem('currentPage'));
if (!currentPage) {
    console.log("currentPage is not saved.");
    currentPage = 1;
} else {
    console.log("currentPage is saved.");
    console.log(typeof(currentPage));
}

//手机上加载更多铃声
function addLoadingData() {
    console.log("Bottom.");

    const http = new XMLHttpRequest();

    // const url = window.location.search;
    // let currentPage = 1;
    // if (url.indexOf("?") != -1) {
    //     let str = url.substr(1);
    //     let strs = str.split("=");
    //     currentPage = strs[1];
    // }
    // currentPage = parseInt(currentPage) + 1;

    console.log(currentPage);
    //保存到session中
    window.sessionStorage.setItem('currentPage', currentPage);
    const requestUrl = '/ringtone/data?page=' + currentPage.toString();

    console.log(requestUrl);
    http.open("GET", requestUrl);

    http.send();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            const results = JSON.parse(http.responseText);
            console.log(results);
            currentPage += 1;

            //把数据添加到页面上去
            insertArrayRingtones(results);
        }
    }
}

//插入一组铃声
function insertArrayRingtones(ringtones) {

    for (let index = 0; index < ringtones.length; index++) {
        const element = ringtones[index];
        insertOneRingtone(element);

    }
}

//插入一个铃声
function insertOneRingtone(ringtone) {

    let ringtone_list = document.querySelector('#ringtonelist');
    // console.log(ringtone_list.length);
    // console.log(ringtone_list);

    let popContent = [
        '<div class="row">',
        '<div class="col-sm-6">',
        '<div class="card mb-1">',
        '<div class="card-body row">',
        '<div class="col">',
        '<h5 class="card-title">',
        `${ringtone.title}`,
        '</h5>',
        '<p class="card-text">',
        `${ringtone.des}`,
        '</p>',
        `<a href="/ringtone/des?id=${ringtone._id}" class="btn btn-primary" data-ringtoneid="${ringtone._id}" data-ringtonetitle="${ringtone.title}" data-ringtonedes="${ringtone.des}" data-ringtoneurl="${ringtone.url}">download</a>`,
        '</div>',
        '<div class="col-4">',

        `<button type="button" class="btn" onclick="playRingtone(this)" data-ringtoneid="${ringtone._id}" data-ringtonetitle="${ringtone.title}" data-ringtonedes="${ringtone.des}" data-ringtoneurl="${ringtone.url}" data-test='{ "a" : 1}'>`,
        `<img src="/lib/bootstrap-icons/icons/play-circle.svg" alt="" width="48" height="48" title="play ringtone">`,
        `</button>`,
        `</div>`,
        `</div>`,
        `</div>`,
        `</div>`,
        `</div>`
    ].join('');

    ringtone_list.innerHTML += popContent;
}