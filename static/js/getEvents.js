var REQUEST_URL = 'https://www.googleapis.com/calendar/v3/calendars/pedalcore%40gmail.com/events?maxResults=1&orderBy=startTime&singleEvents=true&key=' + KEY;

var KEY = 'KEY_GOES_HERE';


var jqxhr = $.ajax({
  url: REQUEST_URL
  })
  .done(function(data) {
      // success
      console.log(data)
  })
  .fail(function() {
    // error
  })
  .always(function() {
    // complete
  });

