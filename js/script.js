jQuery(document).ready(function() {
  var $items = jQuery(".p-sc-page");

  var active_item = 1; //active scroll-page
  var count_pages = 0; //count scroll-pages on webpage
  var active_scroll = 0; //scroll value
  var next_prev_page = 0; //move to next or previous page
  var max_scroll; //max scrolling value of scroll-page


  //add number pages
  $items.each(function(index, el) {
    count_pages++;
    jQuery(el).addClass("p-sc-page-" + count_pages);
  });

  //set page height
  jQuery(".p-sc-page").css("min-height", window.innerHeight);

  //set start page
  jQuery(".p-sc-page-" + active_item).addClass("p-sc-active");


  //add events on desktop devices
  jQuery("body").on('mousewheel DOMMouseScroll', function(event){
    var $items = jQuery(".p-sc-page");
    max_scroll = 0;

    //set max scrolling value to actine scroll-page
    $items.each(function(index, el) {
      max_scroll = max_scroll + jQuery(el).height();
      if ( jQuery(el).hasClass("p-sc-active") ) {
        return false;
      }
    });

    dY = event.originalEvent.deltaY * 2;

    //previous OR next scroll page
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
      slide_page("prev", dY);
    }
    else {
      slide_page("next", dY);
    }
  });


  /*
   * --- add events on mobile devices ---
   */
  var Pos1;
  var Pos2;

  jQuery("body").on("touchstart touchend", function(event){
  	max_scroll = 0;

    if ( event.type == "touchstart" ) {
      Pos1 = event.originalEvent.touches[0].pageY;
    }
    else {
      Pos2 = event.originalEvent.changedTouches[0].pageY;
      dY = (Pos1 - Pos2) * 5;

      var $items = jQuery(".p-sc-page");

      //set max scrolling value to actine scroll-page
      $items.each(function(index, el) {
        max_scroll = max_scroll + jQuery(el).height();
        if ( jQuery(el).hasClass("p-sc-active") ) {
          return false;
        }
      });

      //set next page
      if ( dY > 20 ) {
        slide_page("next", dY);
      }
      if ( dY < -20 ) {
        slide_page("prev", dY);
      }
    }
  });


  /*
   * ----- scroll if all scroll-page in window -----
   */
  function move_page(direction){
    $items.removeClass("p-sc-active");

    //next page
    if (direction == "next") {
      if ( count_pages > active_item ) {
        active_item++;
        active_scroll = active_scroll + jQuery(window).height();
      }
    }
    else {
      //previuos page
      if ( active_item > 1 ) {
        active_item--;
        active_scroll = active_scroll - jQuery(window).height();
      }
    }

    //activate page and scroll
    jQuery(".p-sc-page-" + active_item).addClass("p-sc-active");
    jQuery(".scroller-inner").css({ transform: "translateY(-" + active_scroll + "px)" });
  }


  /*
   * --- move page for mobile devices ---
   */
  function slide_page(direction, dY){
    var active_height = jQuery(".p-sc-page-" + active_item).height(); //set value of active window height

    if ( active_height == jQuery(window).height() ) {
      move_page(direction);
    }
    else {
      //max scrolling value for operations
      var scroll_val;

      //scrolling down scroll-page
      if (direction == "next") {
      	scroll_val = max_scroll - jQuery(window).height();

        if ( (active_scroll + dY) < scroll_val ) {
          //save scroll position and move page
          active_scroll = active_scroll + dY;
          jQuery(".scroller-inner").css({ transform: "translateY(-" + active_scroll + "px)" });
        }
        else {
          //stop scrolling and go to the next page
          if ( scroll_val == active_scroll ) {
          	move_page("next");
          }
          else{
            jQuery(".scroller-inner").css({ transform: "translateY(-" + scroll_val + "px)" });

            //save scroll position
            active_scroll = scroll_val;

            if ( next_prev_page > 0 ) {
              next_prev_page = 0;
              move_page("next");
            }
            else {
              next_prev_page = 1;
            }
          }
        }

      }
      else {
      	scroll_val = max_scroll - active_height;

        if ( (active_scroll + dY) > scroll_val ) {
          //save scroll position and move page
          active_scroll = active_scroll + dY;
          jQuery(".scroller-inner").css({ transform: "translateY(-" + active_scroll + "px)" });
        }
        else {
          //stop scrolling and go to the previous page
          if ( scroll_val == active_scroll ) {
          	move_page("prev");
          }
          else{
          	jQuery(".scroller-inner").css({ transform: "translateY(-" + scroll_val + "px)" });
          	active_scroll = scroll_val;

            if ( next_prev_page > 0 ) {
              next_prev_page = 0;
              move_page("prev");
            }
            else {
              next_prev_page = 1;
            }
          }
        }
      }
    }
  }

});
