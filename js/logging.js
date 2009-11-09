//From: http://dansnetwork.com/2008/11/01/javascript-iso8601rfc3339-date-parser/
Date.prototype.setISO8601 = function(dString){

  var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;

  if (dString.toString().match(new RegExp(regexp))) {
    var d = dString.match(new RegExp(regexp));
    var offset = 0;

    this.setUTCDate(1);
    this.setUTCFullYear(parseInt(d[1],10));
    this.setUTCMonth(parseInt(d[3],10) - 1);
    this.setUTCDate(parseInt(d[5],10));
    this.setUTCHours(parseInt(d[7],10));
    this.setUTCMinutes(parseInt(d[9],10));
    this.setUTCSeconds(parseInt(d[11],10));
    if (d[12])
      this.setUTCMilliseconds(parseFloat(d[12]) * 1000);
    else
      this.setUTCMilliseconds(0);
    if (d[13] != 'Z') {
      offset = (d[15] * 60) + parseInt(d[17],10);
      offset *= ((d[14] == '-') ? -1 : 1);
      this.setTime(this.getTime() - offset * 60 * 1000);
    }
  }
  else {
    this.setTime(Date.parse(dString));
  }
  return this;
};

function __trace_prefix(prefix, args) {
  if(window.console === undefined) return undefined;
  else return window.console.log.apply(window.console, $.merge([prefix], args));
}


function Logging(interval) {
  this.feed_url = 'http://api.webeddit.com/logs/webdesign/latest.json?callback=?';
  this.latest_feed = [];
  this.updated_at = null;
  this.interval = interval;
  this.painters = [];


  this.trace = function() {
    __trace_prefix("Logger::Debug:", arguments);
    //if(window.console === undefined) return undefined;
    //else return window.console.log.apply(window.console, $.merge(["Logging()::Debug: "], arguments));
  };

  this._tick = function() {
    this.trace("Tick");
    this.fetch_feed(this.draw);
  };

  this.fetch_feed = function() {
    var us = this;
    var notify = arguments;
    $.getJSON(this.feed_url,
              function(data, status) {
                us.latest_feed = data.reduce(function(acc, l) {
                                               //Parse date into something not a string-y
                                               l.channel_log.created_at = (new Date()).setISO8601(l.channel_log.created_at);
                                               return acc.concat(l.channel_log);
                                             }, []);
                us.updated_at = new Date();
                us.trace("Calling fetch notifications.");
                $.each(notify, function() {this.apply(us);});
              });
    this.trace("Logs fetched.");
  };

  this.draw = function() {
    this.trace("Painting");
  };

  this.draw_some_latest = function(parent, row, count, options) {
    parent = $(parent);
    var date_format = options.date || "%h:%m:%s";
    var default_action = {
      prefix: "* ",
      attr: 'action'
    };
    var action = options.action || default_action;
    action.prefix = action.prefix || default_action.prefix;
    action.attr = action.attr || default_action.attr;
    this.trace("Registering painter:", parent, "=" + count + "=>", row, date_format, action);
    try {
      this.painters.concat(new Painter(this, parent, row, count, {date: date_format, row: action}));
    }
    catch(e) {
      this.trace("Error building painter:", e);
    }
  };

  var that = this;
  this._timer = setInterval(function() { that._tick.apply(that); },
                            this.interval * 1000);
  this._tick();

  return this;
}

function Painter(logs, parent, row, count, formats) {
  this.trace = function() {
    __trace_prefix("Painter:Debug:", arguments);
  };

  this.trace("Painter Created.");

  return this;
}