$( "body" ).mousemove(function(event) {
  $("body").trigger("meumousemove.event", [event]);
});

function debounce(event, callback) {
  var self = this;
  clearTimeout(this.timeout);
  this.event = event;
  this.timeout = setTimeout(function(){
    callback(event);
  }, 500);
}

function compareEventsPosition (firstEvent, secondEvent) {
  if (firstEvent.pageX == secondEvent.pageX && firstEvent.pageY == secondEvent.pageY){
    
    return true;
  } else {
    return false;
  }
}


function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

window.UI = function(engine, container) {
  this.engine = engine;
  this.container = container;
  this.context = $("body");
}


UI.prototype = {
  listenerEventName: "meumousemove.event",

  startDraw: function() {
    var self = this;
    this.context.on(this.listenerEventName, function(e, event) {
      
      self.process(event);
    });
  },

  stopDraw: function() {
    this.context.off(this.listenerEventName);
  },

  process: function(event) {
    var self = this;
    this.engine(event, function(event) {
      console.log('blah');
      // self.container.text("x = " + event.pageX + " y = " + event.pageY)
    });
  }
}

function main() {

  var ui2 = new UI(debounce,$("span.debounce"));
  ui2.startDraw();

  // var ui1 = new UI(throttle, $("span.throttle"));
  // ui1.startDraw();

}

$(function() {
  main();  
});




function throttle(event, render) {
  if (this.firstEvent === undefined) {
    this.firstEvent = event;
    return;
  }

  if (this.firstEvent.pageX == event.pageX && this.firstEvent.pageY == event.pageY) {

    render(event);
    
  }else{

  }

  return
}







