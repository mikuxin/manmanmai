/**
 * Created by Jepson on 2017/05/29.
 */

(function() {
    // 渲染商品列表
    renderMprolist();
    
    function renderMprolist() {
        $.get( Route.baseUrl + "/api/getinlanddiscount", {}, function( data ) {
            // 渲染展示模板
            $('.mproduct').html(template( 'tempMprolist', data ) );
        });
    }
}());