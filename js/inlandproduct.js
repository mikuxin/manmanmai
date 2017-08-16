/**
 * Created by Jepson on 2017/05/29.
 */

(function() {
    // 使用公共函数类 tools的 query 方法
    // 解析 search 获取参数 对象  productid : x
    var obj = location.search ? tools.query( location.search ) : { productid : 0 };

    /* 渲染产品 */
    renderProduct();

    function renderProduct() {
        var productid = obj['productid'] || 0;
        $.get( Route.baseUrl + '/api/getdiscountproduct', { productid : productid }, function( data ) {
            if( !data ) return;
            // 设置底部三级导航名称
            $('.mdaohang .pro').html(data['result'][0]['productName']);
            // 渲染展示模板
            $('.mproductshow').html(template( 'tempMproduct', data ) );
        });
    }
}())