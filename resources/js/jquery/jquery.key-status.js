$(function() {
  window.Keydown = {};
  
  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }
  
  $(document).bind("keydown", function(event) {
    Keydown[keyName(event)] = true;
  });
  
  $(document).bind("keyup", function(event) {
    Keydown[keyName(event)] = false;
  });
});
