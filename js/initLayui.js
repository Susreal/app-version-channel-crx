layui.use(['layer', 'form', 'element', 'table'], function(){
    var layer = layui.layer
    ,form = layui.form
    ,element = layui.element
    ,table = layui.table;
    
    // layer.msg('Hello World');

    form.val('search', {
        "title": "贤心"
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
        // ,url: 'defaultTable.json' //数据接口
        ,data: shop_info
        ,cols: [[ //表头
        {field: 'id', title: 'ID', width:50}
        ,{field: 'shop_name', title: '渠道', width:120}
        ,{field: 'url', title: '爬虫链接（点击编辑）'}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:80}
        ]]
    });

    // //监听单元格编辑
    // table.on('edit(demoEvent)', function(obj){
    //     var value = obj.value //得到修改后的值
    //     ,data = obj.data //得到所在行所有键值
    //     ,field = obj.field; //得到字段
    //     layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value, {offset: 't'});

    // });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        
        if(layEvent === 'detail'){ //查看
            //do somehing
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
            layer.close(index);
            //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){ //编辑
            //do something
            //默认prompt
            layer.prompt({title: '修改网址...'}, function(val, index){
                // layer.msg('得到了'+val);
                //同步更新缓存对应的值
                obj.update({
                    url: val
                });
                layer.close(index);
                tr.removeClass("layui-table-click");
            });
        }
    });
});


$('#app-name').bind('input propertychange', function() {  
    let txt = $('#app-name').val();
    if(txt) {
        if ($('#search-btn').hasClass("layui-btn-disabled")) {
            $('#search-btn').removeClass("layui-btn-disabled");
        }
        $('#label-name').text("valid");
    }
    else {
        if (!$('#search-btn').hasClass("layui-btn-disabled")) {
            $('#search-btn').addClass("layui-btn-disabled");
        }
        $('#label-name').text("invalid");
    }
});


$('.shop_url-input').bind('input propertychange', function() {  
    let shop_name = $(this).attr("name");
    console.log(typeof shop_name); //string

});
