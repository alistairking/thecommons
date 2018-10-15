$(function () {

    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var BG_COLORS = [
        "#231f20",
        "#433f40",
        "#635f60",
    ];

    var ARTICLE_CNT = 3;

    var articles = [];
    var pageCount = 0;
    var currentPage = 1;
    var numArticles;

    var newsFirst;
    var newsLast;
    var newsPrev;
    var newsNext;

    function resizeArticles() {
        var blog = $('#news');
        var blogNav = $('#news .news-header');
        var height = blog.height() - blogNav.height();
        if ($(window).width() < 992) {
            //$(".blog-article .content").css("display", "none");
            //$(".blog-article").height("auto");
            $(".blog-article").height(300);
            blog.height(blogNav.height() + (300 * numArticles));
        } else {
            $(".blog-article").height(height);
            //$(".blog-article .content").css("display", "block");
        }
        return false;
    }

    function populateArticles(page) {
        // get the articles for this "page"
        var first = (page - 1) * 3;
        var thisArticles = articles.slice(first, first + 3);

        var blog = $('#news');
        var blogNav = $('#news .news-header');
        var blogContent = $('#news .news-content');
        blogContent.html("");
        numArticles = Math.min(ARTICLE_CNT, thisArticles.length);
        var contentHeight = blog.height() - blogNav.height();

        for (var idx = 0; idx < numArticles; idx++) {
            var article = thisArticles[idx];
            var date = new Date(Date.parse(article.date_published));
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            var dateStr = MONTHS[monthIndex] + " " + day + ", " + year;
            var idxClass = (idx === 0) ? "first" : (idx === 2) ? "last" : "";
            blogContent.append(
                '<div id="blog-article-' + idx + '" class="col-md-4 blog-article ' + idxClass + '" ' +
                    'style="height: ' + contentHeight + 'px; ' +
                    'background-color: ' + BG_COLORS[idx] + ';">' +
                    //'padding-left: ' + PADDING_LEFT[idx] + '; ' +
                    //'padding-right: ' + PADDING_RIGHT[idx] + ';">' +
                '<div>' +
                '<div class="date">' + dateStr + '</div>' +
                '<div class="title"><a href="' + article.url + '">' + article.title + '</a></div>' +
                '<div class="content">' +
                article.content_html +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }

        resizeArticles();
    }

    function firstClickHandler() {
        currentPage = pageCount;
        populateArticles(currentPage);
        disableButton('prev');
        enableButton('next');
    }

    function lastClickHandler() {
        currentPage = 1;
        populateArticles(currentPage);
        disableButton('next');
        enableButton('prev');
    }

    function prevClickHandler() {
        if (currentPage < pageCount) {
            currentPage++;
            populateArticles(currentPage);
        }
        // if this is now the oldest, grey out this icon
        if (currentPage === pageCount) {
            disableButton('prev');
        }
        // if this is now not the newest, enable the next icon
        if (currentPage === 2) {
            enableButton('next');
        }
    }

    function nextClickHandler() {
        if (currentPage > 1) {
            currentPage--;
            populateArticles(currentPage);
        }
        // if this is now the newest, grey out this icon
        if (currentPage === 1) {
            disableButton('next');
        }
        // if this is now not the oldest, enable the prev icon
        if (currentPage === pageCount - 1) {
            enableButton('prev');
        }
    }

    function enableButton(dir) {
        disableButton(dir);
        if (dir === 'prev') {
            newsPrev.on('click', prevClickHandler);
            newsPrev.removeClass('disabled');
            newsFirst.on('click', firstClickHandler);
            newsFirst.removeClass('disabled');
        } else {
            newsNext.on('click', nextClickHandler);
            newsNext.removeClass('disabled');
            newsLast.on('click', lastClickHandler);
            newsLast.removeClass('disabled');
        }
    }

    function disableButton(dir) {
        if (dir === 'prev') {
            newsPrev.off('click');
            newsPrev.addClass('disabled');
            newsFirst.off('click');
            newsFirst.addClass('disabled');
        } else {
            newsNext.off('click');
            newsNext.addClass('disabled');
            newsLast.off('click');
            newsLast.addClass('disabled');
        }
    }

    $.getJSON("/backend/blogfeed.php", function (data) {
        articles = data.items;
        pageCount = Math.ceil(articles.length / ARTICLE_CNT);
        populateArticles(currentPage);

        newsFirst = $('#news-first');
        newsLast = $('#news-last');
        newsPrev = $('#news-prev');
        newsNext = $('#news-next');

        enableButton('prev');
        disableButton('next');
    });
    $(window).resize(resizeArticles);
});
