// Initialize app
var demo = new Framework7({
    pushState: true,
    cache: true,
    cacheDuration: 1000 * 60,
    hideNavbarOnPageScroll: true,
    swipeBackPageActiveArea: 100,
    precompileTemplates: true,
    swipePanel: 'left',
    domCache: true,
    init: false
});

var $$ = Framework7.$;
var panelcontent = $$("#panel-content");
var mainView = demo.addView('.view-main', {
    dynamicNavbar: true,
});


$$(document).on('pageBack', function(e) {
    console.log(e)
})

demo.init();
var loading = false;
var itemsPerLoad = 7;
var page = 0;
var homedom = $$("#content-list");
var currentarticle = "";


var loadmore = () => {
    page += 1;
    $$.get(`/home/articles/gets/page/${page}/rows/${itemsPerLoad}`, (data, status) => {
        loading = false;
        var html = Template7.templates["list-template"]({
            articles: JSON.parse(data)
        });
        homedom.append(html);
    });
}

// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function() {
    if (loading) return;
    loading = true;
    loadmore();
});



loadmore()

demo.onPageInit("home", (page) => {
    mainView.router.back({ content: homedom })
    homedom.append(homedom);
    $$('.infinite-scroll').on('infinite', function() {
        if (loading) return;
        loading = true;
        loadmore();
    });
});

demo.onPageBeforeRemove("home", (page) => {
    console.log(page)
    homedom = $$("#content-list");
})



var loadpage = (id) => {
    $$.get("/articles/get/id/" + id, (data, status) => {
        currentarticle = JSON.parse(data);
        var html = Template7.templates["page-temp"]({ article: currentarticle });
        mainView.router.load({ content: html });
    })
}

var pagemore = (id) => {
    var tmp = currentarticle;
    tmp.content = "省略"
    var html = Template7.templates["page-more"]({ article: tmp });
    panelcontent.html(html);
    demo.openPanel('right');
}