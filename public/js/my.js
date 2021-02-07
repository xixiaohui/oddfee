function pageButtoneClick(elem) {

    // console.log("pageButtoneClick");
    // const allitems = document.getElementsByClassName('page-item');
    // Array.prototype.forEach.call(allitems, function(el) {
    //     el.classList.remove('active');
    // });

    // const items = elem;
    // items.classList.add('active');



}

// (function() {

//     console.log("start");
//     let httpRequest;
//     document.getElementById("ajaxButton").addEventListener('click', makeRequest);

//     function makeRequest() {
//         httpRequest = new XMLHttpRequest();
//         if (!httpRequest) {
//             alert('Giving up :( Cannot create an XMLHTTP instance');
//             return false;
//         }
//         httpRequest.onreadystatechange = alertContents;
//         httpRequest.open('GET', '/searching');
//         httpRequest.send();
//         console.log("send");
//     }

//     function alertContents() {
//         if (httpRequest.readyState === XMLHttpRequest.DONE) {
//             if (httpRequest.status === 200) {
//                 // alert(httpRequest.responseText);

//                 console.log("over");
//             } else {
//                 alert('There was a problem with the request.');
//             }
//         }
//     }


// })();


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
    console.log("on loaded.")
    const allitems = document.getElementsByClassName('page-item');
    Array.prototype.forEach.call(allitems, function(el, i) {

        // let page = getQueryVariable('page');

        // console.log('page= ' + page);
        // if (!page) {
        //     return;
        // }

        // if (page == i) {
        //     el.classList.add('active');
        // } else {
        //     el.classList.remove('active');
        // }
    });
}

let first = document.getElementById('first');
if (first != null) {
    document.getElementById('first').addEventListener('click', firstButtonClick);
    document.getElementById('prev').addEventListener('click', prevButtonClick);
    document.getElementById('next').addEventListener('click', nextButtonClick);
    document.getElementById('last').addEventListener('click', lastButtonClick);

}

function firstButtonClick(e) {
    window.location.href = "/ringtone?page=1";
}

function prevButtonClick(e) {
    console.log('prevButtonClick');
    let target = e.currentTarget;
    let jumppage = target.dataset.prepage;
    if (jumppage > 0) {
        window.location.href = "/ringtone?page=" + jumppage;
    }
}

function nextButtonClick(e) {
    console.log('nextButtonClick');
    let target = e.currentTarget;
    let jumppage = parseInt(target.dataset.nextpage);

    console.log("jumppage = " + jumppage);

    let allpage = parseInt(document.getElementById('last').dataset.allpage);

    console.log("allpage = " + allpage);

    console.log(typeof(jumppage));
    if (jumppage <= allpage) {

        window.location.href = "/ringtone?page=" + jumppage;
    } else {
        console.log("no jump");
    }

}

function lastButtonClick(e) {
    console.log('lastButtonClick');
    let target = e.currentTarget;
    let jumppage = target.dataset.allpage;
    window.location.href = "/ringtone?page=" + jumppage;
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


function playRingtoneNow(e) {
    console.log("playRingtoneNow");


}