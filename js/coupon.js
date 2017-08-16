/**
 * Created by Jepson on 2017/05/30.
 */

(function () {

    /* 渲染优惠券 */
    renderCoupon();

    /* 渲染优惠券 */
    function renderCoupon() {
        $.get( Route.baseUrl + "/api/getcoupon" , {}, function( data ) {
            console.log( data );
            /* 使用 template 渲染页面 */
            $('#couponUL').html( template( 'couponTemp', data ) );
        });
    }
})();


