// Initialize app
var demo = new Framework7({
    cache: true,
    cacheDuration: 1000 * 60,
    hideNavbarOnPageScroll: true,
    swipeBackPageActiveArea: 100,
    precompileTemplates: true,
    swipePanel: 'left',
    domCache: true
});
var $$ = Framework7.$;
var mainView = demo.addView('.view-main', {
    dynamicNavbar: true,
});
var loading = true;
var itemsPerLoad = 7;
var page = 0;
var homedom = "";

var homeinit = () => {
    var loading = true;
    var itemsPerLoad = 7;
    var page = 0;
    var homedom = "";
    // 注册'infinite'事件处理函数
    $$('.infinite-scroll').on('infinite', function() {
        if (loading) return;
        loading = true;
        loadmore();
    });
    loadmore()
}

demo.onPageInit("home", (page) => {
    if (homedom) {
        $$("#content-list").append(homedom);
        $$('.infinite-scroll').on('infinite', function() {
            if (loading) return;
            loading = true;
            loadmore();
        });
    } else {
        homeinit();
    }
});

demo.onPageBeforeRemove("home", (page) => {
    homedom = $$("#content-list").html();
})

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
var pagemore = (id) => {
    $$.get("/articles/get/id/" + id, (data, status) => {
        var article = JSON.parse(data);
        var html = Template7.templates["page-more"]({ article: article });
        mainView.router.load({ content: html });
    })
}





$$(document).on('pageInit', function(e) {
    // Page Data contains all required information about loaded and initialized page 
    var page = e.detail.page;
    console.log(page)
})

homeinit();