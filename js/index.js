function updateLatestVerion2(shop_id, shop_url) {
    let latestVerion = "0.0.0";

    updateTextById(shop_id, "loading...");

    $.ajax({
        type: "GET",
        url: shop_url,
        success: function (resp) {
            let doms = $.parseHTML(resp);
            switch(shop_id) {
                case "SHOP_IOS": {
                    let data = $(doms).find(".whats-new__latest__version");
                    if (data.length>0) latestVerion = data[0].innerText.substring(2);
                    break;
                }
                case "SHOP_YYB": {
                    let data = $(doms).find(".det-othinfo-data");
                    if (data.length>0) latestVerion = data[0].innerText.substring(1);
                    break;
                }
                case "SHOP_MI": {
                    let data = $(doms).find(".cf > .weight-font + li");
                    if (data.length>0) latestVerion = data[1].innerText;
                    break;
                }
                case "SHOP_HW": {
                    let data = $(doms).find(".app-info-ul > .ul-li-detail > span");
                    if (data.length>0) latestVerion = data[3].innerText;
                    break;
                }
                case "SHOP_MZ": {
                    let data = $(doms).find(".app_content");
                    if (data.length>0) latestVerion = data[3].innerText;
                    break;
                }
                case "SHOP_BD": {
                    let data = $(doms).find(".detail > .version");
                    if (data.length>0) latestVerion = data[0].innerText.substring(3);
                    break;
                }
                case "SHOP_SG": {
                    let data = $(doms).find(".info td");
                    if (data.length>0) {
                        let splitText = data[1].innerText.split("：");
                        if (splitText.length>0) latestVerion = splitText[splitText.length-1].trim();
                    }
                    break;
                }
                default:
                    break;
            } 
            updateTextById(shop_id, latestVerion);
        }
    });
}

$("#reload").click(function() {
    reloadShopInfo();
});

$("#search").click(function() {
    let shops = loadShopInfo();
    for (let i=0; i<shops.length; i++) {
        updateLatestVerion2(shops[i].shop_id, shops[i].shop_url);
    }

    // chrome.storage.local.get(['app_version_in_shops_info'], function(aInfo) {
    //     for(let i=0; i<allShops.length; i++) {
    //         updateLatestVerion(aInfo.app_version_in_shops_info, allShops[i]);
    //     }
    // });
    // chrome.storage.local.get(['app_info'], function(result) {
    //     let ttt = result.app_info;
    //     for(let i=0; i<ttt.shop_info.length; i++) {
    //         console.log(ttt.shop_info[i].id);
    //         console.log(ttt.shop_info[i].url);
    //         let id = ttt.shop_info[i].id;
    //         let url = ttt.shop_info[i].url;
    //         updateInputByName(id, url);
    //     }
    // });
});


// window.addEventListener("setItemEvent", function (e) {
//     console.log('key: '+e.key);
//     console.log('newValue: '+e.newValue);
//     console.log('oldValue: '+e.oldValue);
// });
