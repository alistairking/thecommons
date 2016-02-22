function updateStatus(btn, status) {
    btn.html(status);
}

function getLastSunday() {
    var t = new Date();
    t.setDate(t.getDate() - t.getDay());
    t.setHours(10);
    t.setMinutes(30);
    return t;
}

function populateSeries(control) {
    // populate the list of series
    $.getJSON("/sermons/?format=json", function (data) {
        data.series.forEach(function (series) {
            allSeries.push(series);
        });
        // sort all series based on date (newest to oldest)
        allSeries.sort(function (a, b) {
            return b.last_sermon_time - a.last_sermon_time;
        });

        allSeries.forEach(function (series) {
            control.append('<option value="' + series.id + '">' + series.title + '</option>');
        });

        $('#loading-series').remove();
        control.prop('disabled', false);
    });
}

function handleAddSermon(addSermonBtn) {
    updateStatus(addSermonBtn, 'Saving Sermon...');

    // get the various values
    // series
    var seriesId = $('#sermon-series').val();
    // title
    var title = $('#sermon-title').val();
    // author
    var author = $('#sermon-author').val();
    // date
    var date = $('#sermon-date').data("DateTimePicker").date().utc().valueOf() / 1000;
    // description
    var desc = $('#sermon-desc').val();

    // now do error checking
    var error;
    if (!title) {
        error = 'Missing Title';
    } else if (!author) {
        error = 'Missing Author';
    } else if (!desc || desc == defaultDesc) {
        error = 'Missing or incomplete description';
    }

    if (error) {
        updateStatus(addSermonBtn, 'Add Sermon');
        return error;
    }

    // now save the sermon
    var formData = new FormData();
    formData.append('seriesId', seriesId);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('date', date);
    formData.append('desc', desc);

    jQuery.ajax('/sermons/admin/add.php', {
        processData: false,
        contentType: false,
        data: formData,
        success: function(resp) {
            // nothing to do
            alert('Done!');
        },
        error: function() {
            error = 'Failed to add Sermon';
        }
    });

    updateStatus(addSermonBtn, 'Add Sermon');
    return error;
}

var allSeries = [];

var defaultDesc = "Sermon by Jon Nichols. Scripture Reading ";
var defaultAuthor = "Jon Nichols";

$(function () {
    var addSermonBtn = $('#add-sermon');
    var sermonSeries = $('#sermon-series');

    $('#sermon-date').datetimepicker({
        defaultDate: getLastSunday(),
        daysOfWeekDisabled: [1, 2, 3, 4, 5, 6]
    });

    // set some defaults
    // this is here so we can programatically check that they were updated
    // (if need be)
    $('#sermon-author').attr('value', defaultAuthor);
    $('#sermon-desc').text(defaultDesc);

    populateSeries(sermonSeries);

    addSermonBtn.click(function (e) {
        var error;
        if((error = handleAddSermon(addSermonBtn))) {
            alert(error)
        }
        return false;
    });
});