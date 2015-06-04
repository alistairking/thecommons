/**
 * Created by alistair on 3/17/15.
 */

var current_series_id = '209compelled';

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

$(function () {
    $.getJSON("/sermons/?format=json", function(data) {
        data.series.forEach(function(series) {
            if(series.id == current_series_id) {
                $('#sermon-title').html('Current Sermon Series');

                $('#sermon-series-title').html(series.title);

		$('#sermon-series-fg').append(
		    '<img class="series-name-img" ' +
			'src="' + series.cover_fg + '"/>'
		);

		$('.series-bg').css('background-image',
				    'url(' + series.cover_bg + ')');

                series.sermons.forEach(function(sermon) {

                    var date = new Date(0);
                    date.setUTCSeconds(sermon.time);

                    $('#sermon-browser').append(
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
                        '<audio src="' + sermon.audio + '" preload="metadata" controls></audio>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );

                });
            }
        });
    });
});
