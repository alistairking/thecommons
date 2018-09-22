/**
 * Created by alistair on 3/17/15.
 */

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

// (idx == 0 ? '<a href="#">Read More&nbsp;<i class="glyphicon glyphicon-chevron-right"></i></a>' : '') +

var ARTICLE_CNT = 3;

var articles = [];

function expandArticle() {
    var idx = $(this).attr("href").split("#")[1];
    var articleId = "#blog-article-" + idx;
    var $article = $(articleId);
    // is it currently expanded?
    var expanded = $article.hasClass("expanded");

    if (expanded) {
        $article.css("height", null);
        $(articleId + " .content").addClass(idx == 0 ? "short" : "hidden");
    } else {
        $article.css("height", "unset");
        $(articleId + " .content").removeClass(idx == 0 ? "short" : "hidden");
    }

    $article.toggleClass("expanded");
    return false;
}

$(function () {
    $.getJSON("/backend/blogfeed.php", function(data) {
        var blogContent = $('#blog > .blog-content');
        blogContent.html("");
        var numArticles = Math.min(ARTICLE_CNT, data.items.length);
        articles = data.items;

        // TODO: fix linking content text in first article (should there be a link? should it be underlined? how does collapse work?)
        // TODO: figure out how to get the height to work on expand

        for (var idx = 0; idx < numArticles; idx++) {
            var article = articles[idx];
            var date = new Date(Date.parse(article.date_published));
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            var dateStr = MONTHS[monthIndex] + " " + day + ", " + year;
            var rowClass = "all";//idx === 0 ? "first" : "all";
            var contentClass = "short";//idx === 0 ? "short" : "hidden";
            blogContent.append(
                '<div id="blog-article-' + idx + '" class="row blog-article ' + rowClass + '" style="background-color: ' + BG_COLORS[idx] + ';">' +
                '<div>' +
                '<div class="date">' + dateStr + '</div>' +
                '<div class="title"><a href="#' + idx + '">' + article.title + '</a></div>' +
                '<div class="content ' + contentClass + '">' +
                (idx === 0 ? '<a href="#' + idx + '">' : '') +
                article.content_html +
                (idx === 0 ? '</a>' : '') +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }

        $(".blog-article a").on("click", expandArticle);
    });
});
