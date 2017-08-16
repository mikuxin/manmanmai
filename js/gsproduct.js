/**
 * Created by Jepson on 2017/05/30.
 */

(function () {
    // 商品 id 初始化
    var shopid = 0;
    // 地区 id 初始化
    var areaid = 0;


    // 绑定点击事件进行切换展示
    $('.gs-filter').on('click', '.filter-item', function() {
        var typeId = $(this).attr('typeId');
        $("#"+typeId).toggleClass('hide').siblings('.popbox').addClass('hide');
    })

    // 商铺 请求一次数据进行渲染, 并绑定功能
    $('#shopTitle').one('click', function() {
        $.get( Route.baseUrl + "/api/getgsshop", {}, function( data ) {
            var $shop = $('#shop');
            /* 使用 template 渲染页面 */
            $shop.html( template( 'shopTemp', data ) );
            // 初始化
            $shop.find('ul>li').eq(0).addClass('active');

            // 绑定点击事件，选择子项后再次渲染 product
            $shop.on('click', 'li', function() {
                // 更新选中的 shopid
                shopid = $(this).attr('shopid') || 0;
                // 排他给自己添加选中
                $(this).addClass('active').siblings().removeClass('active');
                // 选完隐藏 shop
                $shop.addClass('hide');

                /* 渲染商品 */
                renderProducts( shopid, areaid );
            });
        });
    });

    // 地区 请求一次数据进行渲染， 并绑定功能
    $('#areaTitle').one('click', function() {
        $.get( Route.baseUrl + "/api/getgsshoparea", {}, function( data ) {
            var $area = $('#area');

            /* 使用 template 渲染页面 */
            $area.html( template( 'areaTemp', data ) );
            // 初始化
            $area.find('ul>li').eq(0).addClass('active');

            // 绑定点击事件，选择子项后再次渲染 product
            $area.on('click', 'li', function() {
                // 更新选中的 areaid
                areaid = $(this).attr('areaid') || 0;
                // 排他给自己添加选中
                $(this).addClass('active').siblings().removeClass('active');
                // 选完隐藏 shop
                $area.addClass('hide');

                /* 渲染商品 */
                renderProducts( shopid, areaid );
            });
        });
    });

    /* 渲染商品 */
    renderProducts( shopid, areaid );

    /* 渲染商品 通过 shopid 和 areaid */
    function renderProducts( shopid, areaid ) {
        var data = {
            shopid : shopid || 0,
            areaid : areaid || 0
        };
        $.get( Route.baseUrl + "/api/getgsproduct" , data, function( data ) {
            /* 使用 template 渲染页面 */
            $('#productUL').html( template( 'productTemp', data ) );
        });
    }
})();


