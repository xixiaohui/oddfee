import { isReachToBottom, isMobile, loadCatagoriesTag } from './global.js';



let startLoading = true;

window.onscroll = function() {
    if (startLoading && isReachToBottom()) {
        console.log("已经到最底部了!");
        // alert("已经到最底部了!");


        if (isMobile()) {
            //不可以加载
            startLoading = false;
            //显示loading
            document.getElementById('loading').setAttribute("style", "visibility:visible");
            // alert("添加数据");
            addLoadingData();
        }
    }
};

window.onload = function() {

    loadCatagoriesTag();

    //加载session storage 存储的数据
    //在首页把页面加载的铃声全部在手机加载的时候加入到页面中
    let sessionStorageRingtones = window.sessionStorage.getItem('ringtones');
    if (sessionStorageRingtones != null) {

        let results = JSON.parse(sessionStorageRingtones);
        console.log(results);
        allRingtones = results;

        //把sessionStorage里存的铃声对象全部插入到页面
        insertRingtoneDatatToHtml(allRingtones);
    }
}


//存储当前的页数
let currentPage = parseInt(window.sessionStorage.getItem('currentPage'));
if (!currentPage) {
    console.log("currentPage is not saved.");
    currentPage = 1;
} else {
    console.log("currentPage is saved.");
    console.log(typeof(currentPage));
}

//存储当前页面已经加载的数据
let allRingtones = [];

//处理待保存的铃声
function adjustRingtoneDataToSessionStorage(ringtones) {

    for (let index = 0; index < ringtones.length; index++) {
        const element = ringtones[index];

        allRingtones.push(element);
    }
}

//手机上加载更多铃声
function addLoadingData() {
    // console.log("Bottom.");
    const http = new XMLHttpRequest();

    console.log(currentPage);

    //存入session
    window.sessionStorage.setItem('currentPage', currentPage);

    const requestUrl = '/ringtone/data?page=' + currentPage.toString();

    console.log(requestUrl);
    http.open("GET", requestUrl);

    http.send();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // alert("获取数据成功");
            const results = JSON.parse(http.responseText);
            // console.log(results);

            //把results各项保存到allRingtones
            adjustRingtoneDataToSessionStorage(results)
                //把allRingtones保存到sessionStorage
            window.sessionStorage.setItem('ringtones', JSON.stringify(allRingtones));

            //增加当前页
            currentPage += 1;
            //插入加载的铃声到页面
            insertRingtoneDatatToHtml(results)

            //结束显示loading
            document.getElementById('loading').setAttribute("style", "visibility:hidden");

            //允许加载
            startLoading = true;
        }
    }
}

//区别手机和PC 插入从后端加载的数据
function insertRingtoneDatatToHtml(results) {
    //把数据添加到页面上去 只有移动端插入数据
    if (isMobile()) {
        // window.location.href="移动端url";
        // alert("mobile");
        insertArrayRingtones(results);
    } else {
        // alert("pc")
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


//客户端使用http
// const http = new XMLHttpRequest();
// const url = "https://api.unsplash.com/photos/random?count=5&client_id=N_KJgUFKI94Gadt6yOoT1yzvJxv2YxzlJrNN-IGwpc0";
// http.open("GET", url);
// http.send();
// http.onreadystatechange = (e) => {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log(http.responseText);
//     }
// };