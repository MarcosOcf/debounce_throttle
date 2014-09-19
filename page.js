///////////////////////////Event Type///////////////////////

$("body").mousemove(function(event) {
  $("body").trigger("mousemovetrigger.event", [event]);
});

/////////////////////////// Engine /////////////////////////

var Engines = {

  noFilter: function(event, opts) {
    opts.callback(event);
  },

  debounce: function(event, opts) {
    clearTimeout(this.timeoutCall);
    this.timeoutCall = setTimeout(function(){
      opts.callback(event);
    }, opts.timeout);
  },

  throttle: function(event, opts) {
    if (this.lastEvent === undefined) {
      this.lastEvent = event;
      return;
    }
    if (event.timeStamp - this.lastEvent.timeStamp > opts.timeout) {
      opts.callback(event);
      this.lastEvent = event;  
    } else {
      Engines.debounce(event, opts);
    }  
  }
}

////////////////////////////  UI  ///////////////////////////

window.UI = function(opts) {
  this.opts = opts;
}

UI.prototype = {

  startDraw: function() {
    var self = this;
    this.opts.context.on(this.opts.eventName, function(e, event) {
      self.process(event);
    });
  },

  stopDraw: function() {
    this.opts.context.off(this.opts.eventName);
  },

  process: function(event) {
    var self = this;
    var engineOpts = ({
      callback: this.opts.callback,
      timeout: this.opts.timeout
    });
    
    this.opts.engine(event, engineOpts);
  }
}

//////////////////////////// function callbck /////////////////////////////

function animateNoFilter(event) {
  $("div.no-filter-results").append($("<span></span>", {"class": "success"}));
  setTimeout(function(){
    $("div.throttle-results").append($("<span></span>", {"class": "throttle-failure"}));
    $("div.debounce-results").append($("<span></span>", {"class": "debounce-failure"}));  
  }, 50);
  setScrollOverflowSize();
}

function setScrollOverflowSize(){
  $("div.no-filter-results").scrollTop(99999);
  $("div.throttle-results").scrollTop(99999);
  $("div.debounce-results").scrollTop(99999);
}

function animateThrottle(event) {
  $("div.throttle-results span").last().remove();
  $("div.throttle-results").append($("<span></span>", {"class": "success"}));
}  

function animateDebounce(event) {
  $("span.debounce-failure").last().remove();
  $("div.debounce-results").append($("<span></span>", {"class": "success"}));    
}
///////////////////////////// main code ///////////////////////

$(function() {

  var ui1 = new UI({
    engine: Engines.throttle,
    eventName: "mousemovetrigger.event",
    callback: animateThrottle,
    context: $("body"),
    timeout: 100
  });
  
 var ui2 = new UI({
    engine: Engines.debounce,
    eventName: "mousemovetrigger.event",
    callback: animateDebounce,
    context: $("body"),
    timeout: 200
  });

 var ui3 = new UI({
    engine: Engines.noFilter,
    eventName: "mousemovetrigger.event",
    callback: animateNoFilter,
    context: $("body")
 })

  ui1.startDraw();
  ui2.startDraw();
  ui3.startDraw();

});
