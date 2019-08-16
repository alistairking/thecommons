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
    var anchorLinks = $('.tc-sidebar a[href*=#]:not([href=#give],[href=#signup])');

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

    var panels = $('.tc-panel');
    panels.on('scrollSpy:enter', function () {
        var panelId = $(this).attr('id');
        var panel = panelId ? $('.tc-sidebar li > a[href="#' + panelId + '"]') : null;
        if (panel) {
            setActive(panel[0]);
        }
    });
    panels.scrollSpy();

    $('#map').height($('#mapbox').height());
    $(window).on('resize', function() {
        $('#map').height($('#mapbox').height());
    });

    const map = L.map('map', {
        // zoomControl: false,
        scrollWheelZoom: false
    }).setView([32.678954, -117.100560], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy;<a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGhlY29tbW9ucyIsImEiOiI1N0NTWGNjIn0.TaOENKLg7ELtwKzbi2HqZw'
    }).addTo(map);
    const addrMarker = L.marker([32.678954, -117.100560]).addTo(map);
    addrMarker.bindPopup("<b>Here we are!</b><br/>635 E 7th St<br/>National City CA").openPopup();

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
