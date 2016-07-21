// Initialize app
var demo = new Framework7({
    cache: true,
    cacheDuration: 1000 * 60,
    hideNavbarOnPageScroll:true
});
var $$ = Framework7.$;
var mainView = demo.addView('.view-main', {
    dynamicNavbar: true,
});


var listTemplate = $$('script#list-template').html();
var compiledListTemplate = Template7.compile(listTemplate);

//--------------------------------------------

// 加载flag
var loading = false;

// 每次加载添加多少条目
var itemsPerLoad = 7;

var page = 1;

$$.get(`/home/articles/gets/page/${page}/rows/${itemsPerLoad}`, (data, status) => {
    loading = false;
    // 生成新条目的HTML
    var html = compiledListTemplate({
        articles: JSON.parse(data)
    });
    // 添加新条目
    $$('#content-list').append(html);
    // 重置加载flag
});




// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function() {
    if (loading) return;
    loading = true;
    page += 1;
    $$.get(`/home/articles/gets/page/${page}/rows/${itemsPerLoad}`, (data, status) => {
        // 重置加载flag
        loading = false;
        // 生成新条目的HTML
        var html = compiledListTemplate({
            articles: JSON.parse(data)
        });
        // 添加新条目
        $$('#content-list').append(html);
    });

});