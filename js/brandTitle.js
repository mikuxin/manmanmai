/**
 * Created by Jepson on 2017/5/30.
 */
(function () {

    /* 渲染品牌排行 */
    renderBrandTitle();

    /* 渲染品牌排行  */
    function renderBrandTitle() {
        $.get( Route.baseUrl + "/api/getbrandtitle" , {}, function( data ) {
            console.log( data );
            /* 使用 template 渲染页面 */
            $('#brand-con').html( template( 'brandTitleTemp', data ) );
        });
    }

})();






