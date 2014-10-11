/**
 * Created by alistair on 9/7/14.
 */

var map;
var qbLatLong = new google.maps.LatLng(32.748934, -117.128582);

function initialize() {
    var mapOptions = {
        center: qbLatLong,
        zoom: 15,
        zoomControl: true,
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: qbLatLong,
        map: map,
        title: 'The Commons'
    });
    /*
    var infoContent = '<address><strong>The Commons</strong><br>'
        +'Queen Bee\'s Arts & Cultural Center<br>'
        +'3925 Ohio St<br>'
        +'San Diego 92104'
        +'</address>';

    var infowindow = new google.maps.InfoWindow({
        content: infoContent,
        position: qbLatLong
    });

    infowindow.open(map);
    */
}
google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, 'resize', function () {
    map.setCenter(qbLatLong);
});

/* smooth scrolling on anchor jumps */
$(function () {
    var wrapperDiv = $('#page-content-wrapper');
    $('a[href*=#]:not([href=#])').click(function (e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            var offset = target.offset().top + wrapperDiv.scrollTop();
            if (target.length) {
                wrapperDiv.stop().animate({
                    scrollTop: offset
                }, 100);
                history.pushState({}, '', this.hash);
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