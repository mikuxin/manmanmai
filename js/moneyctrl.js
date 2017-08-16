/**
 * Created by Jepson on 2017/05/29.
 */

(function() {

    // 解析 search 获取参数 对象  pageid=x
    var obj = location.search ? tools.query( location.search ) : { pageid : 0 };

    /* 渲染商品 */
    renderMproduct();

    function renderMproduct() {
        var pageid = parseInt( obj['pageid'] || 0 ) ;
        $.get( Route.baseUrl + "/api/getmoneyctrl", { pageid: pageid }, function( data ) {
            if ( data ) {
                /* 渲染页面 */
                $('.mpro-list').html( template( 'tempMproduct', data ) );

                /* 添加分页功能, 传参 页数  start 0 传参 从 0 开始 */
                tools.fenye( { pageNum : Math.ceil( data.totalCount / data.pagesize), start : 0 } );
            }
        });
    }

})();
