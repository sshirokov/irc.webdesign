window.logs = new Logging(10); // Define refresh interval

var ready = function() {
  //Params: path to container,
  //        relative path from container to what a row looks like
  //        number of rows to draw
  //        options object
  logs.draw_some_latest("table#log", ".row", 30, {
                          date: "%A%t g:i", //How to format a date, according to php.net/date
                          action: {
                            prefix: "* ",   //What to put in front of a nick performing a /me
                            attr: 'action'  //Class to give the row of the /me
                          }
                        });
};
$(document).ready(ready);
