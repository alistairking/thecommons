/**
 * Created by alistair on 9/7/14.
 */

/* smooth scrolling on anchor jumps */
$(function () {
    /* set the current hash as active */
    $('.tc-sidebar li > a[href="'+location.hash+'"]').parent().addClass("active");

    var body = $('html body');
    var anchorLinks = $('.tc-sidebar a[href*=#]:not([href=#give])');
    anchorLinks.click(function (e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var offset = target.offset().top;
                console.log('offset: ' + offset);
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
});