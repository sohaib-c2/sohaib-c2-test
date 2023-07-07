/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
Shopify.theme.jsSlideshowClassic = {
    
	init: function($section) {
    const slideshowObject = this;
    // Add settings from schema to current object
    Shopify.theme.jsSlideshowClassic = $.extend(this, Shopify.theme.getSectionData($section));
      // Selectors
    const $slideshowClassicEl = $section.find('[data-slideshow-classic]').removeClass('is-hidden');
    //IF dots are hidden then dont run the code to align arrows with dots 
     if(this.show_nav_buttons){
        $slideshowClassicEl.on( 'ready.flickity', function() {
           slideshowObject.changeDots();
        });
       
        $(window).on( 'resize', function() {
          setTimeout( slideshowObject.changeDots(),200);  
        });
     }
    const $slideshowClassic = $slideshowClassicEl.flickity({
      wrapAround: true,
      adaptiveHeight: true,
      prevNextButtons: this.number_of_slides > 1 ? this.show_arrows : false,
      pageDots: this.number_of_slides > 1 ? this.show_nav_buttons : false,
      draggable: true,
      imagesLoaded: true,
      fade: this.image_transition == 'fade' ? true : false,
      autoPlay: this.image_slideshow_speed * 1000,
      arrowShape: arrowShape
    });
     
    // Resize flickity when the slider is settled
    $slideshowClassicEl.on( 'settle.flickity', function() {
      $slideshowClassicEl.flickity('resize');      
    })
    
  },
  blockSelect: function($section, blockId) {
    const $slider = $section.find('[data-image-slideshow]');
    const $sliderIndex = $('#shopify-section-' + blockId).data('slide-index');
    //console.log("Do i run? ")
    $slider.flickity('select', $sliderIndex, true, true);

  },
  changeDots: function (el) {
     // Get the width of the Flickity dots and align the arrows with them
      const main_slider = document.querySelector(this.section_id);
      //console.log(this.section_id);
      const flickityDots = main_slider.querySelector('.flickity-page-dots');
      //var flickityDotsWidth = window.getComputedStyle(flickityDots).getPropertyValue('width').match(/\d+/);
      var alldots = flickityDots.querySelectorAll(".dot");
      var dotswidth = 20.0;
      for(var i=0; i<alldots.length ; i++){
        dotswidth += (parseFloat(window.getComputedStyle(alldots[i]).getPropertyValue('width')) + 16)
      }
      flickityDots.style.setProperty('--flickitydotswidth', dotswidth);
      main_slider.querySelector(".flickity-button.previous").style.left = 'calc(50% - '+dotswidth+'px + 8px)';
      main_slider.querySelector(".flickity-button.next").style.right = 'calc(50% - '+dotswidth+'px + 8px)';
  },
	unload: function($section) {

	}
}

/******/ })()
;