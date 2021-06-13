var data;
var travelList = document.querySelector('.travel-list');
var areaTitle = document.querySelector('.area-title');

var select = document.querySelector('.form-control');
var area = ['全部景點', '三民區', '美濃區', '大樹區', '小港區', '六龜區', '仁武區', '內門區', '左營區', '田寮區', '甲仙區', '杉林區', '岡山區', '前金區', '前鎮區', '苓雅區', '茂林區', '茄萣區', '梓官區', '新興區', '楠梓區', '鼓山區', '旗津區', '鳳山區'];

var hotArea = document.querySelector('.hot-area-list');

var body = document.body;
var goTopBtn = document.querySelector('.gotop');

// 下拉選單行政區
function getOption() {
    var areaLen = area.length;
    var str = '';
    for (var i = 0; i < areaLen; i++) {
        var areaName = area[i];
        var str = document.createElement('option');
        str.textContent = areaName;
        str.setAttribute('value', areaName);
        select.appendChild(str);
    }
}

getOption();

// 使用 AJAX
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
xhr.send(null);
xhr.onload = function () {
    data = JSON.parse(xhr.responseText)['result']['records'];
    showList(); // 執行取得景點資料
}


function showList(e) {
    var temp = [];
    var str = '';

    var select;

    if (!e) {
        select = area[0]
    } else if (e.target.nodeName === 'A') {
        e.preventDefault();
        select = e.target.innerHTML;
    }
    else {
        select = e.target.value;
    }

    for (var i = 0; i < data.length; i++) {

        if (select === data[i]["Zone"]) {
            areaTitle.innerHTML = data[i]["Zone"];
            temp.push(data[i]);

        } else if (select === area[0]) {
            areaTitle.innerHTML = area[0];
            temp.push(data[i]);

        } else if (temp.length === 0) {
            areaTitle.innerHTML = '您選擇的行政區沒有景點';
        }
    }

    for (var j = 0; j < temp.length; j++) {
        str +=
            '<li><div class="img-box" style="background-image: url(' +
            temp[j]["Picture1"] +
            ');"><div class="row desc align-items-center" ><div class="Block--8"><h4 class="travel-title">' +
            temp[j]['Name'] +
            '</h4></div><div class="Block--4"><p class="area-title">' +
            temp[j]["Zone"] +
            '</p></div></div></div><div class="text-box"><div class="row align-items-flex-end"><div class="Block--9"><ul class="m-0 p-0"><li><span class="icons"><img src="images/icons_clock.png" alt=""></span>' +
            temp[j]['Opentime'] +
            '</li ><li><span class="icons"><img src="images/icons_pin.png" alt=""></span>' +
            temp[j]['Add'] +
            '</li><li><span class="icons"><img src="images/icons_phone.png" alt=""></span>' +
            temp[j]['Tel'] +
            '</li></ul></div><div class="Block--3"><ul class="m-0 p-0"><li><span class="icons"><img src="images/icons_tag.png" alt=""></span>' +
            temp[j]['Ticketinfo'] +
            '</li></ul></div></div></div ></li >';
    }
    travelList.innerHTML = str;
}


function goTop(e) {
    e.preventDefault();
    if (e.target.offsetParent.classList.value == 'gotop') {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}

hotArea.addEventListener('click', showList);
select.addEventListener('change', showList);

body.addEventListener('click', goTop);