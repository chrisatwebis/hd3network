(function ($) {

  Drupal.behaviors.hd3networksSeeMoreSeeLess = {
    attach: function (context, settings) {
      // By using the 'context' variable we make sure that our code only runs on
      // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
      // we don't run the same piece of code for an HTML snippet that we already
      // processed previously. By using .once('foo') all processed elements will
      // get tagged with a 'foo-processed' class, causing all future invocations
      // of this behavior to ignore them.
      $('#block-views-custom-contents-block-1 .views-row .views-field-nothing', context).once('see_more_see_less', function () {
        see_more_see_less($(this));
      });
    }
  };


  function see_more_see_less(selector){
    /**
    * Find a broker - brokerage detail page. product list see more/see less functionality.
    ***/
    selector.each(function(){
      var height = $(this).height()+15;
      var less_height = 55;
      var see_more = Drupal.t("Read More");
      var see_less = Drupal.t("Read Less");
      if(height > less_height){
        $(this).animate( { height:less_height+"px" }, { queue:false, duration:500 });
        $(this).after("<div class='see-more-see-less'><a class='toggle_link' href='#'>"+see_more+"</a></div>");
        $(this).next().toggle(
          function(){
            $(this).prev().animate( { height:height+"px" }, { queue:false, duration:500 });
            $(this).find(".toggle_link").html(see_less);
            $(this).removeClass("see-more");
            $(this).addClass("see-less");
          },
          function(){
            $(this).prev().animate( { height:less_height+"px" }, { queue:false, duration:500 });
            $(this).find(".toggle_link").html(see_more);
            $(this).removeClass("see-less");
            $(this).addClass("see-more");
          }
        );
      }
    });
  }

  $( document ).ready(function() {
      
  });

})(jQuery);


