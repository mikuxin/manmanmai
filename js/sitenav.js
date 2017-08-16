/**
 * Created by Jepson on 2017/05/30.
 */

(function () {

    /* 渲染商城 */
    renderSite();

    /* 渲染商城 */
    function renderSite() {
        $.get( Route.baseUrl + "/api/getsitenav" , {}, function( data ) {
            console.log( data );
            /* 使用 template 渲染页面 */
            $('#siteNav').html( template( 'siteTemp', data ) );
        });
    }

})();

