window.logs = new Logging(10);

var ready = function() {
  logs.draw_some_latest("table#log", ".row", 10, {
                          date: "%A%t g:i",
                          action: {
                            prefix: "* ",
                            attr: 'action'
                          }
                        });
};
$(document).ready(ready);
