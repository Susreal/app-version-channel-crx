function updateInputByName(name, value) {
    $("[name="+String(name)+"]").val(value);
}

function updateTextById(id, text) {
    let th = document.getElementById(id);
    if(th) th.innerText = text;
}

function loadShopInfo() {
    let shop_info = [
        {
            id: "SHOP_IOS",
            shop_name: "App Store",
            url: "https://apps.apple.com/cn/app/id1404845879"
        },
        {
            id: "SHOP_YYB",
            shop_name: "应用宝",
            url: "https://sj.qq.com/myapp/detail.htm?apkName=com.cccampus.younglife"
        },
        {
            id: "SHOP_MI",
            shop_name: "小米",
            url: "http://app.mi.com/details?id=com.cccampus.younglife"
        },
        {
            id: "SHOP_HW",
            shop_name: "华为",
            url: "https://appstore.huawei.com/app/C100295325"
        },
        {
            id: "SHOP_MZ",
            shop_name: "魅族",
            url: "http://app.meizu.com/apps/public/detail?package_name=com.cccampus.younglife"
        },
        {
            id: "SHOP_BD",
            shop_name: "百度",
            url: "https://shouji.baidu.com/software/26255558.html"
        },
        {
            id: "SHOP_SG",
            shop_name: "搜狗",
            url: "http://zhushou.sogou.com/apps/detail/667320.html"
        }
    ];

    chrome.storage.local.get(['shop_info'], function(result) {
        if (result.shop_info) {
            // 如果有缓存
            return result.shop_info;
        } else {
            return shop_info;
        }
    });

    return shop_info;
}