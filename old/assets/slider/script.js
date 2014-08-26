jQuery(document).ready(function($) {
  
  $captions = $('.captions');

  $('.flexslider').flexslider({
      animation: "fade",
      controlNav: true,
      useCSS: false,
      touch: true,
      slideshowSpeed: 7000, 
      pauseOnHover: true, 
      start: function() {
          $activecaption = $('.flex-active-slide .flex-caption');
          $captions.html($activecaption.text());        
      },
      after: function() {
          $activecaption = $('.flex-active-slide .flex-caption');
          $captions.html($activecaption.text());
      }
  });

});

