/**
 * Created by Jepson on 2017/05/30.
 */

(function () {

    var obj = tools.query( location.href );
    // 优惠券 id
    var couponId = obj.couponId || 0;

    /* 渲染优惠券 */
    renderCouponProduct( couponId );

    /* 渲染优惠券 */
    function renderCouponProduct( couponId ) {
        $.get( Route.baseUrl + "/api/getcouponproduct" , { couponid : couponId }, function( data ) {
            console.log( data );
            /* 使用 template 渲染页面 */
            $('#productsUL').html( template( 'couproductTemp', data ) );
        });
    }
})();

