layui.use(['layer', 'form', 'element', 'table'], function(){
    var layer = layui.layer
    ,form = layui.form
    ,element = layui.element
    ,table = layui.table;
    
    // layer.msg('Hello World');
    form.val('search', {
        'app_name': localStorage.getItem('app_name')
    });

    // 表单中搜索按钮的有效状态处理
    $('#app_name').bind('input propertychange', function() {  
        let input = $('#app_name').val();
        if (input) {
            $('#search-btn').removeClass('layui-btn-disabled');
        }
        else {
            $('#search-btn').addClass('layui-btn-disabled');
        }
    });

    // 监听提交
    form.on('submit(search_app)', function(data){
        let input = data.field.app_name;
        if (input && !$('#search-btn').hasClass('layui-btn-disabled')) {
            localStorage.setItem('app_name', input);
            layer.msg(JSON.stringify(data.field));
        }
        return false;
    });

    // //默认prompt
    // layer.prompt(function(val, index){
    //     layer.msg('得到了'+val);
    //     layer.close(index);
    // });

    let shop_info = loadShopInfo();

    //第一个实例
    table.render({
        elem: '#shops'
        ,id: 'shops'
        ,data: loadShopInfo()
        ,cols: [[ //表头
        {field: 'shop_id', title: 'shop_id', width:50}
        ,{field: 'shop_name', title: '渠道', width:120}
        ,{field: 'shop_url', title: '爬虫链接（点击编辑）'}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:80}
        ]]
    });

    window.addEventListener('setItemEvent', function (e) {
        if (e.key == 'shop_info') {
            if (e.oldValue != e.newValue) {
                // shop_info 变化，则重新加载表格
                let new_shop_info = JSON.parse(e.newValue);
                console.log('shop_info变化！重新加载表格...');
                table.reload('shops', {
                    data: new_shop_info
                });
            }
        }
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        
        if (layEvent == 'edit') { //编辑
            layer.prompt({title: '修改网址...',value: data.shop_url}, function(val, index){
                //同步更新缓存对应的值
                // obj.update({
                //     shop_url: val
                // });
                layer.close(index);
                updateShopUrlInStorage(data.shop_id, val);
                tr.removeClass('layui-table-click');
            });
        }
    });
});





$('.shop_url-input').bind('input propertychange', function() {  
    let shop_name = $(this).attr('name');
    console.log(typeof shop_name); //string

});
