var $ = require('jquery');
var keys = require('./keys.js');

function Calendar(calendarId, key) {
  this.calendarId = calendarId;
  this.key = key;
}

Calendar.prototype.getEvents = function() {
  var REQUEST_URL = 
    'https://www.googleapis.com/calendar/v3/calendars/' 
     + this.calendarId
     + '/events?maxResults=1&orderBy=startTime&singleEvents=true&key='
     + this.key;

  var jqxhr = $.ajax({
    url: REQUEST_URL
    })
    .done(function(data) {
      // success
      console.log(data)
      var summaryText = Calendar.prototype.getEventSummary(data.items);
      var $nextRide = $('#next-ride');
      Calendar.prototype.displaySummary(summaryText, $nextRide);
    })
    .fail(function() {
      // error
    })
    .always(function() {
      // complete
    });
}

Calendar.prototype.getEventSummary = function(eventList) {
  var summary = '';
  if (eventList.length) {
    summary = eventList[0].summary;
  }
  console.log(summary)
  return summary;
}

Calendar.prototype.displaySummary = function(summary, $container) {
  $container.text(summary);
  console.log($container)
}

var KEY = keys.KEYS.CALENDAR;
var bikeCalendar = new Calendar('pedalcore@gmail.com', KEY);
bikeCalendar.getEvents();