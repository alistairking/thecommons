/**
 * Created by alistair on 9/7/14.
 */

/* smooth scrolling on anchor jumps */
$(function () {
    /* set the current hash as active */
    //var currentPage = location.hash ? location.hash : '#home';
    //$('.tc-sidebar li > a[href="'+currentPage+'"]').parent().addClass("active");

    var sidebar = $('.tc-sidebar');

    var body = $('html body');
    var anchorLinks = $('.tc-sidebar a[href*=#]:not([href=#give])');

    function setActive(link) {
        history.pushState({}, '', link.hash);
        anchorLinks.parent().removeClass("active");
        $(link).parent().addClass("active");
    }

    function scrollTo(target, link) {
        var offset = target.offset().top - $('.tc-topbar').height();// + 1;
        body.stop().animate({
            scrollTop: offset
        }, 300);
        setActive(link);
    }

    anchorLinks.click(function (e) {
        e.preventDefault();
        sidebar.toggleClass('tc-sidebar-hidden');

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                scrollTo(target, this);
                return false;
            }
        }
        return true;
    });

    var currentPage = location.hash ? location.hash : '#home';
    setActive($('.tc-sidebar li > a[href="' + currentPage + '"]'));

    $('.tc-sidebar-toggle').click(function(e) {
        sidebar.toggleClass('tc-sidebar-hidden');
    });

    $('.container-fluid').click(function(e) {
        sidebar.addClass('tc-sidebar-hidden');
    });

    $('#amor-signup-btn').click(function(e) {
        var alertDiv = $('#amor-form-alert');

        var nameFirst = $('#amor-nameFirst').val();
        var nameLast = $('#amor-nameLast').val();
        var email = $('#amor-email').val();
        var phone = $('#amor-phone').val();

        var errorStr = "Missing information for: ";
        var errors = [];
        if(!nameFirst) {
            errors.push("First Name");
        }
        if (!nameLast) {
            errors.push("Last Name");
        }
        if (!email) {
            errors.push("Email Address");
        }
        if (!phone) {
            errors.push("Phone Number");
        }
        if(errors.length) {
            alertDiv.css('visibility', 'visible');
            alertDiv.html(errorStr + errors.join(", "));
        } else {
            alertDiv.css('visibility', 'visible');

            alertDiv.html("Saving Details...");

            $.post("/backend/amor-signup.php",
                {
                    'amor-signup': true,
                    'amor-nameFirst': nameFirst,
                    'amor-nameLast': nameLast,
                    'amor-email': email,
                    'amor-phone': phone
                },
                function (result) {
                    if (!result['success']) {
                        alertDiv.css('visibility', 'visible');
                        alertDiv.html("Failed to save sign up details. Please try again.");
                        return;
                    }

                    $('#amor-nameFirst').val('');
                    $('#amor-nameLast').val('');
                    $('#amor-email').val('');
                    $('#amor-phone').val('');

                    alertDiv.html("Done. You can now sign up another person.");
                });
        }
    });
});