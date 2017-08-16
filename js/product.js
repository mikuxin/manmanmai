/**
 * Created by Jepson on 2017/05/29.
 */

(function() {

    // 使用公共函数类 tools的 query 方法 解析成 对象
    if ( !location.search ) return;
    var obj = location.search ? tools.query( location.search ) : { productid : 0 , categoryid : 0 };
    /* 渲染 三级导航栏 */
    renderMdaohang();
    /* 渲染 product 产品 */
    renderMproduct();
    /* 渲染 mpingjia 产品评论 */
    renderMpingjia();


    /* 渲染 三级导航栏 */
    function renderMdaohang() {
        var categoryid = obj['categoryid']; // 产品分类 id
        if ( categoryid == undefined ) return;
        // 获取标题栏数据渲染 分类导航
        $.get( Route.baseUrl + "/api/getcategorybyid", { categoryid: categoryid }, function( data ) {
            if( !data ) return;
            $('.mdaohang .cate').html(data['result'][0]['category'] + ' > ').attr('href', "productlist.html?categoryid="+categoryid );
        });
    }

    /* 渲染 product 产品 */
    function renderMproduct() {
        var productid = obj[ 'productid' ]; // 产品ID
        if( productid == undefined ) return;
        $.get( Route.baseUrl + "/api/getproduct", { productid: productid }, function( data ) {
            if ( !data ) return;
            // 设置导航标题
            $('.mdaohang .pro').text(data['result'][0]['productName'].trim().split(' ')[0]);
            // 渲染商品信息
            $('.mprodetail').html( template( 'tempMprodetail', data ) );
            // 渲染比价购买
            $('.bjnote').html( data['result'][0]['bjShop'] );
        });
    }

    /* 渲染 productcom 产品评价 */
    function renderMpingjia() {
        var productid = obj['productid']; // 产品ID
        if( productid == undefined ) return;
        $.get( Route.baseUrl + "/api/getproductcom", { productid: productid }, function( data ) {
            if ( !data ) return;
            $('.mpingjia').html( template( 'tempMpingjia', data ) );
        });
    }

})();
