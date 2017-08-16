/**
 * Created by Jepson on 2017/05/29.
 */

(function () {

    /* 渲染导航栏并添加功能 */
    renderMnav();
    /* 渲染超值折扣 */
    renderMproduct();


    /* 渲染导航栏并添加功能 */
    function renderMnav() {
        // 获取数据并渲染
        $.get( Route.baseUrl +'/api/getindexmenu', {}, function( data ) {
            if ( !data ) return;
            /* 使用 template 渲染页面 */
            $('.mnav').html( template( 'tempMnav', data ) );
            showMore(); // 添加展示更多的功能
        });

        /* 功能:展示更多 */
        function showMore() {
            $('.mnav li').eq(7).on('click',function() {
                $('.mnav-list').toggleClass('contains');
                return false;
            });
        }
    }

    /* 渲染超值折扣 */
    function renderMproduct() {
        $.get( Route.baseUrl +'/api/getmoneyctrl', {}, function( data ) {
            if ( !data ) return;
            /* 使用 template 渲染页面 */
            $('.mpercent > .mpro-list').html( template( 'tempMproduct', data ) );
        });
    }
})();
