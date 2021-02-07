//背景随机颜色
function random_bg_color() {

    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    document.querySelector("#ringtonedes").style.background = bgColor;
}

// random_bg_color();

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let ringtone_title = document.querySelector("#ringtone-title").textContent.trim();
let ringtone_des = document.querySelector("#ringtone-des").textContent.trim();
let ringtone_url = document.querySelector("#ringtone-url").getAttribute('data-path').trim();

console.log(ringtone_title);
console.log(ringtone_des);
console.log(ringtone_url);

let track_list = [{
        name: ringtone_title,
        artist: ringtone_des,
        image: "/images/pexels-photo-2264753.jpeg",
        path: ringtone_url
    },
    // {
    //     name: "Enthusiast",
    //     artist: "Tours",
    //     image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    //     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    // },
    // {
    //     name: "Shipping Lanes",
    //     artist: "Chad Crouch",
    //     image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    //     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    // },
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    // random_bg_color();
}

// Load the first track in the tracklist
loadTrack(track_index);

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}



function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}


// function downloadRingtoneBlob(e) {
//     let url = e.getAttribute('data-path')
//     console.log(url);

//     let link = document.createElement('a');
//     link.download = 'myringtone.mp3';
//     let blob = new Blob(['Hello, world!'], { type: 'audio/mp3' });
//     link.href = URL.createObjectURL(blob);
//     link.click();
//     URL.revokeObjectURL(link.href);

// }

// function downloadURL(url, name = '') {
//     const link = document.createElement('a')
//     link.download = name
//     link.href = url
//     if ('download' in document.createElement('a')) {
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//     } else {
//         // 对不支持download进行兼容
//         click(link, (link.target = '_blank'))
//     }
// }

// function click(node) {
//     try {
//         node.dispatchEvent(new MouseEvent('click'))
//     } catch (e) {
//         var evt = document.createEvent('MouseEvents')
//         evt.initMouseEvent(
//             'click',
//             true,
//             true,
//             window,
//             0,
//             0,
//             0,
//             80,
//             20,
//             false,
//             false,
//             false,
//             false,
//             0,
//             null
//         )
//         node.dispatchEvent(evt)
//     }
// }

// // 创建blob对象
// function downloadBlob(url) {
//     return new Promise((resolve, reject) => {
//         var xhr = new XMLHttpRequest()
//         xhr.open('GET', url)
//         xhr.responseType = 'blob'
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 resolve(xhr.response)
//             } else {
//                 reject(new Error(xhr.statusText || 'Download failed.'))
//             }
//         }
//         xhr.onerror = function() {
//             reject(new Error('Download failed.'))
//         }
//         xhr.send()
//     })
// }

// // 主要用于下载导出的代码
// function downloadFile(url, fileName = '') {
//     return downloadBlob(url, fileName)
//         .then(resp => {
//             if (resp.blob) {
//                 return resp.blob()
//             } else {
//                 return new Blob([resp])
//             }
//         })
//         .then(blob => URL.createObjectURL(blob))
//         .then(url => {
//             downloadURL(url, fileName)
//             URL.revokeObjectURL(url)
//         })
//         .catch(err => {
//             throw new Error(err.message)
//         })
// }

const downloadMp3 = (filePath, fileName) => {
    fetch(filePath).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none'
            // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        // 指定下载的文件名
        a.download = fileName;
        a.click();
        document.body.removeChild(a)
            // 移除blob对象的url
        window.URL.revokeObjectURL(url);
    });
}


/**
 * 本地路径可以弹出下载
 * 一旦跨域就显示跨域cros问题
 * @param {} filePath 
 * @param {*} fileName 
 */
const crosDownloadMp3 = (filePath, fileName) => {
    fetch(filePath)
        .then(d => {
            console.log(d);
            return d.blob();
        })
        .then(b => {
            console.log(b);
            var bURL = URL.createObjectURL(b);

            var link = document.createElement('a');
            link.href = bURL;
            link.setAttribute('download', fileName);
            document.getElementsByTagName("body")[0].appendChild(link);
            // Firefox
            if (document.createEvent) {
                var event = document.createEvent("MouseEvents");
                event.initEvent("click", true, true);
                link.dispatchEvent(event);
            }
            // IE
            else if (link.click) {
                link.click();
            }
            link.parentNode.removeChild(link);

        });
}






/**
 * URL方式保存文件到本地
 * @param data 文件的blob数据
 * @param name 文件名
 */
function saveAs(data, name) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    save_link.click();
}

/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
function getFileName(url) {
    var num = url.lastIndexOf('/')
    var fileName = url.substring(num)
        //把参数和文件名分割开
    fileName = decodeURI(fileName.split("?")[0]);
    return fileName;
}

/**
 * 获取页面文件名
 * @param url 文件url
 */
function downloadUrlFile(url) {
    url = url.replace(/\\/g, '/');
    console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
    xhr.onload = () => {
        if (xhr.status === 200) {
            // 获取文件blob数据并保存
            var fileName = getFileName(url);
            saveAs(xhr.response, fileName);
        }
    };

    xhr.send();
}



//数据放服务器上，提供下载
function downloadRingtone(e) {
    // let ringtoneurl = e.getAttribute('data-path');
    let ringtoneurl = '/resource/Airtel/airtel-3g-best-tone.mp3'


    let splitLength = ringtoneurl.split('/').length;
    fileName = ringtoneurl.split('/')[splitLength - 1];
    // console.log(ringtoneurl);
    // console.log(fileName);

    //本地可以
    // downloadMp3(ringtoneurl, fileName);
    //本地可以
    // crosDownloadMp3(ringtoneurl, fileName);
    //本地可以
    downloadUrlFile(ringtoneurl);

    //本地不可以
    // download(ringtoneurl, fileName, 'audio/mp3');
}