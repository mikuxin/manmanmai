/**
 * Created by Jepson on 2017/05/30.
 */

(function () {
    // myScroll 对象
    var myScroll;


    /* 渲染头部导航 并 添加功能 */
    renderMheadnav();

    /* 渲染底部页面 */
    renderMproducts();

    /* 渲染头部导航 并 添加效果 */
    function renderMheadnav() {
        $.get( Route.baseUrl + "/api/getbaicaijiatitle" , {}, function( data ) {
            /* 使用 template 渲染页面 */
            $('#navlist').html( template( 'headNavTemp', data ) );
            // 初始化
            $('#navlist').children().eq(0).addClass('active');
            // 添加 scroll 效果 点击效果
            addScroll();
        });

        // 添加 scroll 效果 点击效果
        function addScroll() {
            function loaded () {
                myScroll = new IScroll('#wapper', {
                    scrollX: true,   // 横向
                    scrollY: false   // 纵向
                });
            }
            /*
                 myScroll 初始化函数, myScroll 初始化函数
                 注意：初始化函数，必须完全能确定 选定元素 和 其子元素 宽高时，执行才有效
                 比如：ajax动态渲染的结构，loaded就要放在结构渲染完再执行
             */
            // 计算宽度 进行 ul 宽度初始化
            var width = 0;
            $('#wapper>ul>li').each(function( index, item ) {
                // width()方法用于获得元素宽度；
                // innerWidth()方法用于获得包括内边界（padding）的元素宽度
                // outerWidth()方法用于获得包括内边界(padding)和边框(border)的元素宽度
                width += $( item ).innerWidth();
            });
            // 加上右侧搜索框的宽度
            width += $('.nav-searchbtn').innerWidth();
            // 最后设置给ul
            $('#wapper>ul').width(width);

            // 初始化完ul宽度后，进行wapper初始化
            loaded();
        }

        // 绑定点击事件，点击时切换样式，并让被选中的元素跑到第一个去, 并渲染列表的内容
        $('#wapper').on('click', 'li', function() {
            // 排他切换样式
            $(this).addClass('active').siblings().removeClass('active');
            // 让其第一个显示
            myScroll.scrollToElement($(this)[0]);
            // 拿到当前点击的 Li 上存的自定义 属性 titleId
            var titleId = $(this).attr('titleId');
            // 渲染底部商品
            renderMproducts( titleId );
        });
    }


    /* 渲染产品列表内容 通过 titleId */
    function renderMproducts( titleId ) {
        titleId = titleId || 0;
        $.get( Route.baseUrl + "/api/getbaicaijiaproduct" , {titleid:titleId}, function( data ) {
            console.log( data );
            /* 使用 template 渲染页面 */
            $('#bcproductsUL').html( template( 'productsTemp', data ) );
        });
    }
})();


