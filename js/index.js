window.logs = new Logging(10);

var ready = function() {
  logs.draw_some_latest("table#log", ".row", 10, {
                          date: "At %h:%m",
                          action: {
                            prefix: "* ",
                            attr: 'action'
                          }
                        });
};
$(document).ready(ready);
