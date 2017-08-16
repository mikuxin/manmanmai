/**
 * Created by Jepson on 2017/05/29.
 */

(function () {

    // 使用公共函数类 tools的 query 方法
    // 解析 search 获取参数 对象  categoryid=x pageid=y
    var obj = location.search ? tools.query( location.search ) : { categoryid : 0 };
    /* 通过 url 和 categoryid 渲染 三级导航栏 */
    renderMdaohang();
    /* 渲染商品列表 并 添加切页功能 */
    renderMproductlist();


    /* 通过 url 和 categoryid 渲染 三级导航栏 */
    function renderMdaohang() {
        var categoryid = obj['categoryid'] || 0;

        // 获取标题栏数据渲染
        $.get( Route.baseUrl + "/api/getcategorybyid", { categoryid: categoryid }, function( data ) {
            if( !data ) return;
            $('.mdaohang').html(template('tempMdaohang', data ));
        });

    }

    /* 渲染商品列表 并 添加切页功能 */
    function renderMproductlist() {
        // 规范请求数据格式，pageid 默认 为 1, 当前第几页
        var categoryid = Number(obj['categoryid'] || 1);
        var pageid = Number(obj['pageid'] || 1);

        // 渲染页面
        render();

        /* 通过 分类id page id 渲染页面并添加分页功能 */
        function render() {
            $.get( Route.baseUrl + "/api/getproductlist", obj, function( data ) {
                if( !data ) return;
                /* 加上 分类 id，在商品中加上，跳转页面用 */
                data.categoryid = obj['categoryid'];
                /* 渲染页面 */
                $('.productlist').html(template('tempMproductlist',data));
                /* 添加分页功能 */
                tools.fenye({
                    pageNum : Math.ceil( data['totalCount'] / data['pagesize'] ),   // 总计几页
                    extraStr: '&categoryid=' + obj['categoryid']   // 额外传参
                });
            });
        }
    }

})();


