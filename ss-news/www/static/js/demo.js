// Initialize app
var demo = new Framework7({
    cache: true,
    cacheDuration: 1000 * 60,
    hideNavbarOnPageScroll: true,
    swipeBackPageActiveArea: 100,
    precompileTemplates: true,
    swipePanel: 'left'
});
var $$ = Framework7.$;
var mainView = demo.addView('.view-main', {
    dynamicNavbar: true,
});

var loading = false;
var itemsPerLoad = 7;
var page = 0;


var loadmore = () => {
    page += 1;
    $$.get(`/home/articles/gets/page/${page}/rows/${itemsPerLoad}`, (data, status) => {
        loading = false;
        var html = Template7.templates["list-template"]({
            articles: JSON.parse(data)
        });
        $$('#content-list').append(html);
    });
}

var loadpage = (id) => {
    $$.get("/articles/get/id/" + id, (data, status) => {
        var article = JSON.parse(data);
        var html = Template7.templates["page-temp"]({ article: article });
        mainView.router.load({ content: html });
    })
}

loadmore();


// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function() {
    if (loading) return;
    loading = true;
    loadmore();
});