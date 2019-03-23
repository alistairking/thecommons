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
        if (!link) {
            return;
        }
        history.pushState({}, '', link.hash);
        anchorLinks.parent().removeClass("active");
        $(link).parent().addClass("active");
    }

    function scrollTo(target, link) {
        var offset = target.offset().top - $('.tc-topbar').height();// + 1;
        $('html, body').stop().animate({
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
    setActive($('.tc-sidebar li > a[href="' + currentPage + '"]')[0]);
    scrollTo($(currentPage)); // force scrolling to include topnav on mobile

    // show the landing alert modal
    //$('#landing-alert').modal('show');

    if ($(currentPage).hasClass('modal')) {
        $('.modal').modal('hide');
        $(currentPage).modal('show');
    }

    $(window).on('hashchange', function () {
        var currentPage = location.hash;
        if ($(currentPage).hasClass('modal')) {
            $('.modal').modal('hide');
            $(currentPage).modal('show');
        }
    });

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
                        alertDiv.html("Failed to save details. Please try again.");
                        return;
                    }

                    $('#amor-nameFirst').val('');
                    $('#amor-nameLast').val('');
                    $('#amor-email').val('');
                    $('#amor-phone').val('');

                    alertDiv.html("Done. You can now register another person.");
                });
        }
    });

    $('#event-a-signup-btn').click(function (e) {
        var alertDiv = $('#event-a-form-alert');

        var event = 'baptism';
        var nameFirst = $('#event-a-nameFirst').val();
        var nameLast = $('#event-a-nameLast').val();
        var email = $('#event-a-email').val();
        var phone = '[not-requested]';

        var errorStr = "Missing information for: ";
        var errors = [];
        if (!nameFirst) {
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
        if (errors.length) {
            alertDiv.css('visibility', 'visible');
            alertDiv.html(errorStr + errors.join(", "));
        } else {
            alertDiv.css('visibility', 'visible');

            alertDiv.html("Please wait...");

            $.post("/backend/signup.php",
                {
                    'tc-signup': true,
                    'event': event,
                    'nameFirst': nameFirst,
                    'nameLast': nameLast,
                    'email': email,
                    'phone': phone
                },
                function (result) {
                    if (!result['success']) {
                        alertDiv.css('visibility', 'visible');
                        alertDiv.html("Failed to save details. Please try again.");
                        return;
                    }

                    $('#event-a-nameFirst').val('');
                    $('#event-a-nameLast').val('');

                    alertDiv.html("Thanks! You can now register another person.");

                    // send them on to paypal
                    //window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EMPSADLEZRJ8N"
                });
        }
    });

    $('#event-b-signup-btn').click(function (e) {
        var alertDiv = $('#event-b-form-alert');

        var event = 'camping';
        var nameFirst = $('#event-b-nameFirst').val();
        var nameLast = $('#event-b-nameLast').val();
        var email = '[not-requested]';
        var phone = '[not-requested]';

        var errorStr = "Missing information for: ";
        var errors = [];
        if (!nameFirst) {
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
        if (errors.length) {
            alertDiv.css('visibility', 'visible');
            alertDiv.html(errorStr + errors.join(", "));
        } else {
            alertDiv.css('visibility', 'visible');

            alertDiv.html("Please wait...");

            $.post("/backend/signup.php",
                {
                    'tc-signup': true,
                    'event': event,
                    'nameFirst': nameFirst,
                    'nameLast': nameLast,
                    'email': email,
                    'phone': phone
                },
                function (result) {
                    if (!result['success']) {
                        alertDiv.css('visibility', 'visible');
                        alertDiv.html("Failed to save details. Please try again.");
                        return;
                    }

                    $('#event-b-nameFirst').val('');
                    $('#event-b-nameLast').val('');

                    alertDiv.html("Thanks! You can now register another person.");

                    // send them on to paypal
                    //window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EMPSADLEZRJ8N"
                });
        }
    });

    var panels = $('.tc-panel');
    panels.on('scrollSpy:enter', function () {
        var panelId = $(this).attr('id');
        var panel = panelId ? $('.tc-sidebar li > a[href="#' + panelId + '"]') : null;
        if (panel) {
            setActive(panel[0]);
        }
    });
    panels.scrollSpy();

    $('#calendar-embed').fullCalendar({
        googleCalendarApiKey: 'AIzaSyBfp9UvUaDnUkhGNl5Nr2ZFDvZr2iSFWm8',
        events: {
            googleCalendarId: '79sheetadm35fug7l39s4linag@group.calendar.google.com'
        },
        height: 'parent',
        header: {
            left: 'title',
            center: '',
            right: 'prev,next'
        }
    });
});
