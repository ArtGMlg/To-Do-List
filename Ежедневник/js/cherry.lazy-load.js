function getWindowHeight() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }

  return myHeight
}

function appearBox(element, element_top, bottom_of_window) {
  /* If the object is completely visible in the window, fade it it */
  var buffer = element.outerHeight()/2;
  if( bottom_of_window > element_top + buffer) {
    element.css({
      opacity: 1,
      transform: 'scale(1)'
    })    
  }
}

function appearContainer(element, element_top, bottom_of_window) {
  /* If the object is completely visible in the window, fade it it */
  var buffer = element.outerHeight()/4;
  if( bottom_of_window > element_top + buffer) {
    element.removeClass('trigger').stop(true, true).delay(element.data('delay')).animate({
      opacity: 1
    }, element.data('speed'), 'linear');           
  }
}


function showBoxes() {
  setTimeout(function(){
    $('.lazy-load-box').each( function(i){
      var element_offset = $(this).offset(),
          element_top = element_offset.top;
          bottom_of_window = $(window).scrollTop() + getWindowHeight();
      appearBox($(this), element_top, bottom_of_window);
    });
  },400)
  
  setTimeout(function () {
    $('.lazy-load-container').each( function(i){
      var element_offset = $(this).offset(),
          element_top = element_offset.top;
          bottom_of_window = $(window).scrollTop() + getWindowHeight();
      appearContainer($(this), element_top, bottom_of_window);
    });
  }, 400)
  

  /* Every time the window is scrolled ... */
  $(window).scroll( function() {
    /* Check the location of each desired element */
    $('.lazy-load-box').each( function(i){
      var element_offset = $(this).parent().offset(),
          element_top = element_offset.top;
          bottom_of_window = $(window).scrollTop() + getWindowHeight();
      appearBox($(this), element_top, bottom_of_window);
    });

    $('.lazy-load-container').each( function(i){
      var element_offset = $(this).offset(),
          element_top = element_offset.top;
          bottom_of_window = $(window).scrollTop() + getWindowHeight();
      appearContainer($(this), element_top, bottom_of_window);
    });
  });
};