function Logging(interval) {
  this.feed_url = 'http://api.webeddit.com/logs/webdesign/latest.json?callback=?';
  this.latest_feed = [];
  this.updated_at = null;
  this.interval = interval;

  this.trace = function() {
    if(window.console === undefined) return undefined;
    else return window.console.log.apply(window.console, $.merge(["Logging()::Debug: "], arguments));
  };

  this._tick = function() {
    this.trace("Tick");
    this.fetch_feed();
  };

  this.fetch_feed = function() {
    us = this;
    $.getJSON(this.feed_url,
              function(data, status) {
                us.latest_feed = data.reduce(function(acc, l) { return acc.concat(l.channel_log); }, []);
              });
    this.trace("Logs fetched.");
  };

  this._timer = setInterval(this._tick, this.interval * 1000);
  this._tick();

  return this;
}