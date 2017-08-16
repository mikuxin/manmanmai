/**
 * Created by Jepson on 2017/05/29.
 */

(function() {

    // 使用公共函数类 tools的 query 方法
    // 解析 search 获取参数 对象  productid : x
    var obj = location.search ? tools.query( location.search ) : { productid : 20 };

    /* 通过 url 和 productid 渲染 三级导航栏 */
    renderProduct();


    function renderProduct() {
        var productid = obj['productid'] || 20;
        $.get( Route.baseUrl + "/api/getmoneyctrlproduct", { productid : productid }, function( data ) {
            if( !data ) return;
            // 设置三级导航名称
            $('.mdaohang .pro').html(data['result'][0]['productName']);
            // 渲染展示模板
            $('.mproductshow').html(template( 'tempMproduct', data ) );
        });
    }

}())