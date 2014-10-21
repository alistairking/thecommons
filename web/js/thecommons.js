/**
 * Created by alistair on 9/7/14.
 */

/* smooth scrolling on anchor jumps */
$(function () {
    /* set the current hash as active */
    $('a[href="'+location.hash+'"]').addClass("active");

    var wrapperDiv = $('#page-content-wrapper');
    var anchorLinks = $('a[href*=#]:not([href=#])');
    anchorLinks.click(function (e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var offset = target.offset().top + wrapperDiv.scrollTop();
                wrapperDiv.stop().animate({
                    scrollTop: offset
                }, 300);
                history.pushState({}, '', this.hash);
                anchorLinks.removeClass("active");
                $(this).addClass("active");
                return false;
            }
        }
        return true;
    });
});


var sidebarAll = $("#sidebar-wrapper").find('*');
sidebarAll = sidebarAll.add("#sidebar-wrapper");
var pageContentAll = $("#page-content-wrapper").find('*');
sidebarAll.mouseenter(function (e) {
    e.preventDefault();
    $("#wrapper").removeClass("toggled");
});
pageContentAll.mouseenter(function (e) {
    e.preventDefault();
    $("#wrapper").addClass("toggled");
});