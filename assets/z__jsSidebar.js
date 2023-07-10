/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
Shopify.theme.jsSidebar = {
  init: function() {

    const facetedFilterForm = document.querySelector('[data-faceted-filter-form]')
    if (facetedFilterForm) {
      facetedFilterForm.addEventListener('change', e => {
        if (e.target.type == 'number') return;
        Options(facetedFilterForm);
      });
    }
   function Options(facetedFilterForm){
     const url = window.location.origin + window.location.pathname;
     const filterItem = $(".faceted-filter-group-display__list-item-input:checked");
     $('.faceted-filter-group-display__list-item-input:not(:checked)').removeClass("active");
     let collectionUrl = $(facetedFilterForm).data('collection-url');
     var productsContainer = $('.collection__main');
     var facetedForm = $(facetedFilterForm);
     let search = window.location.search;
     var activeTags = {};
     let newUrl = url;
      filterItem.each(function (index) {
        const tag = $(this).attr('name');
        if (url.indexOf(tag) == -1) {
          $(this).addClass('active');
          activeTags[tag] = this.value;
          newUrl += (index == 0) ? '?'+tag+'='+this.value : '&'+tag+'='+this.value;
        }
        
      });
     console.log(newUrl);
     Shopify.theme.jsSidebar.loadProducts(newUrl,productsContainer,$(".sidebar-section"))
     
     return false; 
   }
    const openSidebarBlocks = document.querySelectorAll('[data-sidebar-block__toggle="open"]');

    openSidebarBlocks.forEach(function(block){
      Shopify.theme.jsSidebar.openSidebarBlock($(block));
    })


    $('[data-has-toggle-option]').on('click', '[data-sidebar-block__toggle="closed"]', function (e) {

      e.preventDefault();
      Shopify.theme.jsSidebar.openSidebarBlock($(this));
    });

    $('[data-has-toggle-option]').on('click', '[data-sidebar-block__toggle="open"]', function(e) {

      e.preventDefault();
      Shopify.theme.jsSidebar.closeSidebarBlock($(this));
    });

    if ($('[data-product-sidebar]').length) {
      $('.section--has-sidebar-option').addClass('has-sidebar-enabled');
      $('.section--has-sidebar-option').removeClass('has-sidebar-disabled');
    } else {
      $('.section--has-sidebar-option').removeClass('has-sidebar-enabled');
      $('.section--has-sidebar-option').addClass('has-sidebar-disabled');

    }

  },
  updateStatusCount : function() {
    $(".sidebar_filter_block").each(function(){
      var inputs = $(this).find(".faceted-filter-group-display__list-item-input:checked");
      var countContainer = $(this).find("[data-has-toggle-option] .faceted-filter-group-summary__active-count");
      if(inputs && inputs.length > 0){
          countContainer.addClass("active");
          countContainer.text("("+(inputs.length)+")").css("display","initial");
      }else {
        countContainer.removeClass("active");
      }
    });
  },
  loadProducts : function (url,productsContainer,sidebarForm) {
    productsContainer.addClass("ajax-loading")
    $.get({
        url: url,
        success: function (data) {
          var newProductsWrapper = $(data).find(".collection__main");
          var newProductsHtml = newProductsWrapper.html();
          var newPaginationHtml = $(data).find(".paginate").parent().html();
          var sidebarFormHtml = $(data).find(".sidebar-section").html();
          sidebarForm.html(sidebarFormHtml)
          productsContainer.html(newProductsHtml);
          $('.paginate').parent().html(newPaginationHtml);
          Shopify.theme.jsSidebar.init();
          history.pushState({
              page: url
          }, null, url);
          $('.collection__main').removeClass('ajax-loading');
        }
    })
  },
  openSidebarBlock: function ($toggleBtn) {

    const $parentBlock = $toggleBtn.closest('.sidebar__block');
    const $toggleIcon = $toggleBtn.find('.icon');

    $toggleBtn.attr('data-sidebar-block__toggle', 'open');

    $parentBlock.addClass('is-active');
    $parentBlock.attr('aria-expanded', true);
    $parentBlock.find('[data-sidebar-block__content--collapsible]').slideDown();
  },
  closeSidebarBlock: function ($toggleBtn) {

    const $parentBlock = $toggleBtn.closest('.sidebar__block');
    const $toggleIcon = $toggleBtn.find('.icon');

    $toggleBtn.attr('data-sidebar-block__toggle', 'closed');

    $parentBlock.removeClass('is-active');
    $parentBlock.attr('aria-expanded', false);
    $parentBlock.find('[data-sidebar-block__content--collapsible]').slideUp();
  },
  unload: function() {
    const $toggleBtn = $('[data-sidebar-block__toggle]');
    $toggleBtn.off();
  }
}

/******/ })()
;