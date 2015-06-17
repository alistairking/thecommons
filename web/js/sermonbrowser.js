/**
 * Created by alistair on 3/17/15.
 */

var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

var allSeries = [];
var currentSermonIdx = 0;

var sermonFirst;
var sermonLast;
var sermonPrev;
var sermonNext;

function setSermonSeries(idx) {
    var series = allSeries[idx];

    $('#sermon-title').html(!idx ? 'Current Sermon Series' : 'Sermon Series');

    //$('#sermon-series-title').html(series.title);

    if (series.cover_fg) {
        $('#sermon-series-fg').html(
            '<img class="series-name-img" ' +
            'src="' + series.cover_fg + '"/>'
        );
    } else {
        $('#sermon-series-fg').html('');
    }

    if (series.cover_bg) {
        $('.series-bg').css('background-image',
            'url(' + series.cover_bg + ')');
    } else {
        $('.series-bg').css('background-image', 'none');
    }

    var sermonSeriesSermons = $('#sermon-series-sermons');
    sermonSeriesSermons.html('');

    series.sermons.forEach(function (sermon) {

        var date = new Date(0);
        date.setUTCSeconds(sermon.time);

        var audioStr = sermon.audio ?
        '<audio src="' + sermon.audio + '" preload="metadata" controls></audio>' : '';

        sermonSeriesSermons.append(
            '<div class="sermon">' +
            '<div class="sermon-info">' +
            '<div class="row">' +
            '<div class="title">' +
            '<div class="date">' +
            months[date.getMonth()] + ' ' + date.getDate() +
            '</div>' +
            sermon.title +
                //'<a href="' + sermon.audio + '" target="_blank">' +
                //'<i class="icon-youtube-play" href="'+ sermon.audio + '"></i>' +
                //'</a>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="description">' +
            sermon.desc +
            '</div>' +
            audioStr +
            '</div>' +
            '</div>' +
            '</div>'
        );

    });
}

function firstClickHandler() {
    currentSermonIdx = allSeries.length - 1;
    setSermonSeries(currentSermonIdx);
    disableButton('prev');
    enableButton('next');
}

function lastClickHandler() {
    currentSermonIdx = 0;
    setSermonSeries(currentSermonIdx);
    disableButton('next');
    enableButton('prev');
}

function prevClickHandler() {
    if (currentSermonIdx + 1 < allSeries.length) {
        currentSermonIdx++;
        setSermonSeries(currentSermonIdx);
    }
    // if this is now the oldest, grey out this icon
    if (currentSermonIdx == allSeries.length - 1) {
        disableButton('prev');
    }
    // if this is now not the newest, enable the next icon
    if (currentSermonIdx == 1) {
        enableButton('next');
    }
}

function nextClickHandler() {
    if (currentSermonIdx - 1 >= 0) {
        currentSermonIdx--;
        setSermonSeries(currentSermonIdx);
    }
    // if this is now the newest, grey out this icon
    if (currentSermonIdx == 0) {
        disableButton('next');
    }
    // if this is now not the oldest, enable the prev icon
    if (currentSermonIdx == allSeries.length - 2) {
        enableButton('prev');
    }
}

function enableButton(dir) {
    disableButton(dir);
    if (dir == 'prev') {
        sermonPrev.on('click', prevClickHandler);
        sermonPrev.removeClass('disabled');
        sermonFirst.on('click', firstClickHandler);
        sermonFirst.removeClass('disabled');
    } else {
        sermonNext.on('click', nextClickHandler);
        sermonNext.removeClass('disabled');
        sermonLast.on('click', lastClickHandler);
        sermonLast.removeClass('disabled');
    }
}

function disableButton(dir) {
    if (dir == 'prev') {
        sermonPrev.off('click');
        sermonPrev.addClass('disabled');
        sermonFirst.off('click');
        sermonFirst.addClass('disabled');
    } else {
        sermonNext.off('click');
        sermonNext.addClass('disabled');
        sermonLast.off('click');
        sermonLast.addClass('disabled');
    }
}

$(function () {
    $.getJSON("/sermons/?format=json", function(data) {
        data.series.forEach(function(series) {
            allSeries.push(series);
        });
        // sort all series based on date (newest to oldest)
        allSeries.sort(function(a, b) {
            return b.last_sermon_time - a.last_sermon_time;
        });

        // set the series to the first one
        setSermonSeries(currentSermonIdx);

        sermonFirst = $('#sermon-first');
        sermonLast = $('#sermon-last');
        sermonPrev = $('#sermon-prev');
        sermonNext = $('#sermon-next');

        enableButton('prev');
        disableButton('next');
    });
});
