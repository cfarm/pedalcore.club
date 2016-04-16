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
     + '/events?orderBy=startTime&singleEvents=true&key='
     + this.key;

  var jqxhr = $.ajax({
    url: REQUEST_URL
    })
    .done(function(data) {
      // success
      console.log(data)
      var summaryText = Calendar.prototype.getNextEvent(data.items);
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

// date or dateTime is RFC3339 format
Calendar.prototype.getFutureDates = function(eventDate) {

  var today = new Date();
  var currentYear = today.getFullYear();
 // add 1 so we can compare to google calendar format which starts at 1
  var currentMonth = today.getMonth() + 1;
  var eventString = eventDate.toString();
  var month = eventString.slice(5, 7);
  var year = eventString.slice(0,4);
  var dateList = [];

  function dateIsInTheFuture() {
    isFutureDate = true;
    dateList.push(eventDate);
  }

  if (year > currentYear) {
    dateIsInTheFuture();
  } else if (month == currentMonth) {
    var currentDate = today.getDate();
    var date = eventString.slice(8, 10);
    if (date >= currentDate) {
      dateIsInTheFuture();
    }
  } else if (month > currentMonth) {
    dateIsInTheFuture()
  } else {
    isFutureDate = false;
  }

  var sortedDateList = function() {
    var numberList = [];
    for (var i = 0; i < dateList.length; i++) {
      var item = dateList[i];
      if (typeof item === String) {
        item = new Number(item);
      }
      numberList.push(item);
    }
    numberList.sort();
    return numberList;
  }

  return {
    isFutureDate: isFutureDate,
    sortedDateList: sortedDateList()
  }

}

Calendar.prototype.getNextEvent = function(eventList) {
  var nextEvent = null;
  var upcomingEvents = [];
  if (eventList.length) {
    $(eventList).each(function() {
      // if upcoming
      var eventDate = this.start.dateTime || this.start.date;
      if (eventDate.length && Calendar.prototype.getFutureDates(eventDate)) {
        // if this.start.dateTime.length && this.start.dateTime > today
        console.log(Calendar.prototype.getFutureDates(eventDate));
        upcomingEvents.push(this);
      }
    });
  }
  console.log(upcomingEvents);
  // sort upcomingEvents by date
  nextEvent = upcomingEvents[0];
  console.log(nextEvent);
  return nextEvent.summary;
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