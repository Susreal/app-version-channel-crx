var appInfo = {
    appId: "1404845879",
    apkName: "com.cccampus.younglife",
    huaweiId: "C100295325",
    baiduId: "26255558",
    sougouId: "667320"
}

var allShops = [
    "IOS",
    "YINGYONGBAO",
    "XIAOMI",
    "HUAWEI",
    "MEIZU",
    "BAIDU",
    "SOUGOU"
]

function updateTable(id, text) {
    let th = document.getElementById(id);
    if(th) th.innerText = text;
}

function updateLatestVerion(appInfo, shopName) {
    let latestVerion = "0.0.0";

    updateTable(shopName, "loading...");

    switch(shopName) {
        case "IOS":
            $.ajax({
                type: "GET",
                url: "https://apps.apple.com/cn/app/id"+appInfo.appId,
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".whats-new__latest__version");
                    if (data.length>0) latestVerion = data[0].innerText.substring(2);
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        case "YINGYONGBAO":
            $.ajax({
                type: "GET",
                url: "https://sj.qq.com/myapp/detail.htm?apkName="+appInfo.apkName,
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".det-othinfo-data");
                    if (data.length>0) latestVerion = data[0].innerText.substring(1);
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        case "XIAOMI":
            $.ajax({
                type: "GET",
                url: "http://app.mi.com/details?id="+appInfo.apkName,
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".cf > .weight-font + li");
                    if (data.length>0) latestVerion = data[1].innerText;
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        case "HUAWEI":
            $.ajax({
                type: "GET",
                url: "https://appstore.huawei.com/app/"+appInfo.huaweiId,
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".app-info-ul > .ul-li-detail > span");
                    if (data.length>0) latestVerion = data[3].innerText;
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        case "MEIZU":
            $.ajax({
                type: "GET",
                url: "http://app.meizu.com/apps/public/detail?package_name="+appInfo.apkName,
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".app_content");
                    if (data.length>0) latestVerion = data[3].innerText;
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        case "BAIDU":
            $.ajax({
                type: "GET",
                url: "https://shouji.baidu.com/software/"+appInfo.baiduId+".html",
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".detail > .version");
                    if (data.length>0) latestVerion = data[0].innerText.substring(3);
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        case "SOUGOU":
            $.ajax({
                type: "GET",
                url: "http://zhushou.sogou.com/apps/detail/"+appInfo.sougouId+".html",
                success: function (resp) {
                    let doms = $.parseHTML(resp);
                    let data = $(doms).find(".info td");
                    if (data.length>0) {
                        let splitText = data[1].innerText.split("：");
                        if (splitText.length>0) latestVerion = splitText[splitText.length-1].trim();
                    }
                    updateTable(shopName, latestVerion);
                }
            });
            break;
        default:
            break;
    }
}

$("#save").click(function() {
    let tInfo = {
        appId: "1404845879",
        apkName: "com.cccampus.younglife",
        huaweiId: "C100295325",
        baiduId: "26255558",
        sougouId: "667320"
    }
    chrome.storage.local.set({'app_version_in_shops_info': tInfo}, function() {
        console.log('保存成功!!!');
    });
}); 

$("#search").click(function() {
    chrome.storage.local.get(['app_version_in_shops_info'], function(aInfo) {
        for(let i=0; i<allShops.length; i++) {
            updateLatestVerion(aInfo.app_version_in_shops_info, allShops[i]);
        }
    });
});


document.body.onload = function() {
    //表单初始赋值
// form.val('example', {
//     "username": "贤心"
//   });
}
