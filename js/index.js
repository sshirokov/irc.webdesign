window.logs = new Logging(10);  // Define refresh interval

var ready = function() {
  logs.draw_some_latest("table#log", ".row", 5, {date: "g:ia"});
};
$(document).ready(ready);
