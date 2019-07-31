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

    // //第一个实例
    // table.render({
    //     elem: '#shops'
    //     ,url: 'defaultTable.json' //数据接口
    //     ,cols: [[ //表头
    //     {field: 'id', title: 'ID', width:50}
    //     ,{field: 'shop', title: '渠道', width:120}
    //     ,{field: 'url', title: '爬虫链接（点击编辑）', edit: 'text'}
    //     ]]
    // });

    // //监听单元格编辑
    // table.on('edit(demoEvent)', function(obj){
    //     var value = obj.value //得到修改后的值
    //     ,data = obj.data //得到所在行所有键值
    //     ,field = obj.field; //得到字段
    //     layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value, {offset: 't'});

    // });

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
