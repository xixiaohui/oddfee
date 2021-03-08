//导入分类数据
export function loadCatagoriesTag() {
    //加载分类信息

    const allitems = document.getElementsByClassName('page-item');
    Array.prototype.forEach.call(allitems, function(el, i) {});
    addCatagoriesTag();
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

export function isReachToBottom() {

    // return (getScrollTop() + getWindowHeight() == getScrollHeight());

    return isReachToBottomJavascript();
}

function isReachToBottomJavascript() {
    //网页可视区域高度
    var windowH = document.documentElement.clientHeight;
    var documentH = document.documentElement.offsetHeight;
    var scrollH = document.documentElement.scrollTop;

    return (windowH + scrollH >= documentH - 60);
}


export function isMobile() {
    return ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)));
}