/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
Shopify.theme.jsCustomContactForm = {
  init: function ($section) {
  Shopify.theme.jsCustomContactForm = $.extend(this, Shopify.theme.getSectionData($section));
  // Selectors
  const section = $section[0];
  const contactForm = section.querySelector('.custom-contact-form');
  console.log(contactForm,'\n');
  const formData = new FormData(contactForm);
  for (const [key, value] of formData) {
   console.log(`${key}: ${value}\n`);
  }
  // Contact form checkbox validation
  if ($('[data-is-required]').length){
    var $checkboxGroup = $('.contact-form__list .checkbox');
    $checkboxGroup.prop('required', true);

    $('.contact-form__list .checkbox').on('change', function(){
      $checkboxGroup.prop('required', true);
      if ($checkboxGroup.is(":checked")) {
        $checkboxGroup.prop('required', false);
      }
    })
  }
    if(this.webhook_link){
      
      const mechanicWebhookUrl = this.webhook_link;
      
      if (contactForm) {
      
        let submittedToMechanic = false;
      
        contactForm.addEventListener(
          'submit',
          (event) => {
            
            event.preventDefault();
            fetch(
              mechanicWebhookUrl,
              {
                method: 'POST', 
                body: new FormData(contactForm),
              }
            ).then((response) => {
              console.log('Sending data to Mechanic: Success!', response);
            }).catch((error) => {
              console.error('Sending data to Mechanic: Error!', error);
            }).finally(() => {
              contactForm.submit();
            });
          },
        );
      }
    }else{
      $contactForm.on('submit', function(e) {
    
        const $form = $(this);
        const $formBlocks = $('.contact-form__blocks [data-checkbox-required]', $form);
        const $errorMessage = Shopify.translation.contact_form_checkbox_error;
        const $errorMessageContainer = $('.form__error', $form);
    
        let completeForm = true;
    
        for (let i = 0; i < $formBlocks.length; i++ ) {
          const $checkbox = $('input[type=checkbox]:checked', $formBlocks[i]);
          if ($checkbox.length) {
            completeForm = true;
          } else {
            $errorMessageContainer.html($errorMessage);
            completeForm = false;
          }
        }
    
        if (completeForm) {
          return;
        } else {
          event.preventDefault();
        }
      });
    }
  },
  unload: function () {
    const $contactForm = $('.contact-form__form');
    const $submitButton = $contactForm.find(':submit');

    $submitButton.off();

  }
}

/******/ })()
;