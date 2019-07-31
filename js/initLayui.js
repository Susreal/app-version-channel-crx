layui.use(['layer', 'form', 'element', 'table'], function(){
    var layer = layui.layer
    ,form = layui.form
    ,element = layui.element
    ,table = layui.table;
    
    // ayer.msg('Hello World');

    form.val('example', {
        "username": "贤心"
    });
});


$('#appName').bind('input propertychange', function() {  
    let txt = $('#appName').val();
    if(txt) $('#labelName').text("valid");
    else $('#labelName').text("invalid");
});
