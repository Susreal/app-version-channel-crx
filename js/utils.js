function updateInputByName(name, value) {
    $("[name="+String(name)+"]").val(value);
}

function updateTextById(id, text) {
    let th = document.getElementById(id);
    if(th) th.innerText = text;
}

function reloadShopInfo() {
    let default_shop_info = [
        {
            shop_id: "SHOP_IOS",
            shop_name: "App Store",
            shop_url: "https://apps.apple.com/cn/app/id1404845879",
            latest_version: "0.0.0"
        },
        {
            shop_id: "SHOP_YYB",
            shop_name: "应用宝",
            shop_url: "https://sj.qq.com/myapp/detail.htm?apkName=com.cccampus.younglife",
            latest_version: "0.0.0"
        },
        {
            shop_id: "SHOP_MI",
            shop_name: "小米",
            shop_url: "http://app.mi.com/details?id=com.cccampus.younglife",
            latest_version: "0.0.0"
        },
        {
            shop_id: "SHOP_HW",
            shop_name: "华为",
            shop_url: "https://appstore.huawei.com/app/C100295325",
            latest_version: "0.0.0"
        },
        {
            shop_id: "SHOP_MZ",
            shop_name: "魅族",
            shop_url: "http://app.meizu.com/apps/public/detail?package_name=com.cccampus.younglife",
            latest_version: "0.0.0"
        },
        {
            shop_id: "SHOP_BD",
            shop_name: "百度",
            shop_url: "https://shouji.baidu.com/software/26255558.html",
            latest_version: "0.0.0"
        },
        {
            shop_id: "SHOP_SG",
            shop_name: "搜狗",
            shop_url: "http://zhushou.sogou.com/apps/detail/667320.html",
            latest_version: "0.0.0"
        }
    ];
    localStorage.setItem("shop_info",JSON.stringify(default_shop_info));
    console.log('保存默认shop_info到本地缓存...');
    return default_shop_info;
}

function loadAppName() {
    let app_name_str = localStorage.getItem("app_name");
    if (app_name_str) {
        // 如果有缓存，则返回缓存内容
        return String(app_name_str);
    } else {
        // 没有缓存就加载默认设置并存入缓存
        let default_app_name = "yaktalk";
        localStorage.setItem("app_name", default_app_name);
        console.log('保存默认app_name到本地缓存...');
        return default_app_name;
    }
}

function loadShopInfo() {
    let shop_info_str = localStorage.getItem("shop_info");
    if (shop_info_str) {
        // 如果有缓存，则返回缓存内容
        return JSON.parse(shop_info_str);
    }
    else {
        // 没有缓存就加载默认设置并存入缓存
        return reloadShopInfo();
    }
}

function updateShopUrlInStorage(shop_id, new_shop_url) {
    let shop_info_str = localStorage.getItem("shop_info");
    if (shop_info_str) {
        // 如果有缓存，则更新
        let new_shop_info = JSON.parse(shop_info_str);
        for (let i=0; i<new_shop_info.length; i++) {
            if (new_shop_info[i].shop_id == shop_id) {
                new_shop_info[i].shop_url = String(new_shop_url);
                localStorage.setItem("shop_info",JSON.stringify(new_shop_info));
                console.log('更新'+shop_id+'地址到本地缓存...');
                return true;
            }
        }
        return false;
    } else {
        // 没有缓存，无法更新
        return false;
    }

}

function updateLatestVersionInStorage(shop_id, new_version) {
    let shop_info_str = localStorage.getItem("shop_info");
    if (shop_info_str) {
        // 如果有缓存，则更新
        let new_shop_info = JSON.parse(shop_info_str);
        for (let i=0; i<new_shop_info.length; i++) {
            if (new_shop_info[i].shop_id == shop_id) {
                new_shop_info[i].latest_version = String(new_version);
                localStorage.setItem("shop_info",JSON.stringify(new_shop_info));
                console.log('更新'+shop_id+'最新版本到本地缓存...');
                return true;
            }
        }
        return false;
    } else {
        // 没有缓存，无法更新
        return false;
    }

}

// 重写localStorage的setItem方法
var orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key,newValue){
    var setItemEvent = new Event("setItemEvent");
    setItemEvent.key = key;
    setItemEvent.newValue = newValue;
    setItemEvent.oldValue = localStorage.getItem(key);
    window.dispatchEvent(setItemEvent);
    orignalSetItem.apply(this,arguments);
}