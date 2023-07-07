/******/ (() => { // webpackBootstrap
  var __webpack_exports__ = {};
  Shopify.theme.jsFeaturedCollection = {
    init: function ($section) {

      // Add settings from schema to current object
      Shopify.theme.jsFeaturedCollection = $.extend(this, Shopify.theme.getSectionData($section));

      let $sliderEl = $section.find('[data-slider]');

      if (this.collection_style == 'slider') {
        this.createSlider($sliderEl);
      }
    },
    createSlider: function ($sliderEl) {

      const slideData = {
        products_per_slide: this.products_per,
        products_available: this.products_available,
        products_limit: this.products_limit,
        show_nav_buttons:this.show_nav_buttons,
        show_arrows:this.show_arrows,
        mobile_items_per_row: this.mobile_items_per_row
      }

      const slider = $sliderEl.flickity({
        lazyLoad: slideData.products_per_slide,
        freeScroll: false,
        contain: true,
        wrapAround: false,
        imagesLoaded: true,
        pageDots: slideData.show_nav_buttons,
        draggable: false,
        prevNextButtons: slideData.products_limit > slideData.products_per_slide ? slideData.show_arrows : false,
        groupCells:true,
        arrowShape: arrowShape,
         responsive: [
          {
            breakpoint: 798,
            settings: {
              lazyload:slideData.mobile_items_per_row,
              wrapAround: false,
              contain: true,
              freeScroll: true,
              draggable: true,
              prevNextButtons: slideData.products_limit > slideData.mobile_items_per_row ? slideData.show_arrows : false,
              pageDots: slideData.show_nav_buttons,
              groupCells: slideData.mobile_items_per_row
            }
          }
        ]
      });
      slider.on('settle.flickity', function () {
        slider.flickity('resize');
      });

    },
    unload: function ($section) {
      let $slider = $section.find('.flickity-enabled');
      $slider.flickity('destroy');
    }
  }


  /******/
})()
  ;