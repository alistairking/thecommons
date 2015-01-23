/**
 * Created by alistair on 9/7/14.
 */

/* smooth scrolling on anchor jumps */
$(function () {
    /* set the current hash as active */
    var currentPage = location.hash ? location.hash : '#home';
    $('.tc-sidebar li > a[href="'+currentPage+'"]').parent().addClass("active");

    var sidebar = $('.tc-sidebar');

    var body = $('html body');
    var anchorLinks = $('.tc-sidebar a[href*=#]:not([href=#give])');
    anchorLinks.click(function (e) {
        e.preventDefault();
        sidebar.toggleClass('tc-sidebar-hidden');

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var offset = target.offset().top - $('.tc-topbar').height() + 1;
                body.stop().animate({
                    scrollTop: offset
                }, 300);
                history.pushState({}, '', this.hash);
                anchorLinks.parent().removeClass("active");
                $(this).parent().addClass("active");
                return false;
            }
        }
        return true;
    });

    $('.tc-sidebar-toggle').click(function(e) {
        sidebar.toggleClass('tc-sidebar-hidden');
    });

    $('.container-fluid').click(function(e) {
        sidebar.addClass('tc-sidebar-hidden');
    });
});