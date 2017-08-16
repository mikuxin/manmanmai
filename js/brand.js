/**
 * Created by Jepson on 2017/6/8.
 */
(function () {

    // 解析 url 地址获取参数
    var obj = tools.query( location.href );
    // 类型 id
    var categoryId = obj.categoryId || 0;
    // 品牌 id
    var brandTitleId = obj.brandTitleId || 0;

    /* 渲染品牌排行 */
    renderBrand();
    /* 渲染销量排行 */
    renderProducts();

    /* 渲染品牌排行  */
    function renderBrand() {
        $.get( Route.baseUrl + "/api/getbrand" , { brandtitleid:brandTitleId}, function( data ) {
            /* 使用 template 渲染页面 */
            $('#mbrand-list').html( template( 'brandTemp', data ) );
        });
    }

    /* 渲染销量排行 */
    function renderProducts() {
        var data = {
            brandtitleid : brandTitleId,
            pagesize: 4
        }
        $.get( Route.baseUrl + "/api/getbrandproductlist" , data, function( data ) {
            /* 使用 template 渲染页面 */
            $('#productListUL').html( template( 'productTemp', data ) );

            /* 渲染评论 */
            renderComment( data.result[ 0 ] );
        });
    }


    /* 渲染评论 */
    function renderComment( product ) {
        console.log( product );
        var productid = product.productId;
        $.get( Route.baseUrl + "/api/getproductcom" , { productid : productid}, function( data ) {
            console.log( data );
            data.productName = product.productName;
            data.productImg = product.productImg;
            /* 使用 template 渲染页面 */
            $('#comments').html( template( 'commentTemp', data ) );
        });
    }

})();
