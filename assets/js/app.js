var DECENTTHEMES = DECENTTHEMES || {};

(function($){

  // Beautiful functions stack by Aminul Islam <aminul@decentthemes.com>
  // Lead Web Developer @DECENTTHEMES

  // USE STRICT
  "use strict";

  DECENTTHEMES.initialize = {

    init: function(){
      DECENTTHEMES.initialize.defaults();
      DECENTTHEMES.initialize.filterableButton();
      DECENTTHEMES.initialize.menu();
      DECENTTHEMES.initialize.swiperSlider();
      DECENTTHEMES.initialize.sectionSwitch();
      DECENTTHEMES.initialize.sectionCustomize();
      // DECENTTHEMES.initialize.isotopeInit();
      DECENTTHEMES.initialize.gmap3();
      DECENTTHEMES.initialize.countdown();
    },
    defaults: function() {
      $(window).load(function () {
        $(".loader").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        window.sr = ScrollReveal();
        sr.reveal('.sr-animated', { duration: 1000, viewOffset: { top: 100 }});
      });
    },
    filterableButton: function() {
      $('[data-filters]').each( function( i, buttonGroup ) {
        var buttonGroup = $( buttonGroup );
        buttonGroup.on( 'click', '.dt-btn', function(e) {
          buttonGroup.find('.active').removeClass('active');
          $( this ).addClass('active');
          e.preventDefault();
        });
      });
    },
    menu: function() {
      var $trigger = '#dt-menu-trigger';
      var $submenu = '.menu-item-has-children';

      // Menu Trigger
      $($trigger).on('click', function() {
        $(this).toggleClass('open');
        $('body').toggleClass('dt-menu-open');
      });

      // Sub Menu Trigger
      $($submenu).each( function() {
        var $this = $(this);
        $this.find('a').on('click', function() {
          $($submenu).toggleClass('submenu-active', false);
          $this.toggleClass('submenu-active');
        });
      });
    },
    swiperSlider: function() {
      $('[data-carousel="swiper"]').each( function() {

        var $this        = $(this),
            $container   = $this.find('[data-swiper="container"]'),
            $asControl   = $this.find('[data-swiper="ascontrol"]');

        // Configuration
        var conf = function(element) {
          var obj = {
            slidesPerView: element.data('items'),
            centeredSlides: element.data('center'),
            loop: element.data('loop'),
            initialSlide: element.data('initial'),
            effect: element.data('effect'),
            spaceBetween: element.data('space'),
            autoplay: element.data('autoplay'),
            direction: element.data('direction'),
            paginationClickable: true,
            breakpoints: element.data('breakpoints'),
            slideToClickedSlide: element.data('click-to-slide'),
            loopedSlides: element.data('looped'),
            fade: {
              crossFade: element.data('crossfade')
            }
          };
          return obj;
        }

        // Primary Configuration
        var $primaryConf = conf($container);
        // Pagination and Nav Settings
        $primaryConf.prevButton = $this.find('[data-swiper="prev"]');
        $primaryConf.nextButton = $this.find('[data-swiper="next"]');
        $primaryConf.pagination = $this.find('[data-swiper="pagination"]');

        // As Control Configuration\
        var $ctrlConf = conf($asControl);

        // Animate Function
        function animateSwiper(selector, slider) {
          var makeAnimated = function animated() {
            selector.find('.swiper-slide-active [data-animate]').each(function(){
              var anim      = $(this).data('animate'),
                  delay     = $(this).data('delay'),
                  duration  = $(this).data('duration');

              $(this).addClass(anim + ' animated')
              .css({
                webkitAnimationDelay: delay,
                animationDelay: delay,
                webkitAnimationDuration: duration,
                animationDuration: duration
              })
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass(anim + ' animated');
              });
            });
          };
          makeAnimated();
          // Make animated when slide change
          slider.on('SlideChangeStart', function() {
            selector.find('[data-animate]').each(function(){
              var anim = $(this).data('animate');
              $(this).removeClass(anim + ' animated');
            });
          });
          slider.on('SlideChangeEnd', makeAnimated);
        };

        if ($container.length) {
          // Run Swiper
          var $swiper = new Swiper( $container, $primaryConf);
          // Make Animated Layer
          animateSwiper($this, $swiper);

          if ($asControl.length) {
            var $control = new Swiper( $asControl, $ctrlConf);
            $swiper.params.control = $control;
            $control.params.control = $swiper;
          }

        } else {
          console.log('Swiper container is not defined!');
        };

      });
    },
    sectionSwitch: function() {
      $('[data-type="section-switch"]').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    },
    sectionCustomize: function() {
      // Section Background Color
      $('[data-bg-color]').each(function() {

        var value = $(this).data('bg-color');

        $(this).css({
          backgroundColor: value,
        });
      });

      // Section Background Image
      $('[data-bg-image]').each(function() {

        var img = $(this).data('bg-image');

        $(this).css({
          backgroundImage: 'url(' + img + ')',
        });
      });


      // Elements Padding
      function elementPadding(attr) {

        $(attr).each(function() {

          if ( attr === '[data-padding]' ) {
            var data = {
              padding: $(this).data('padding')
            }
          } else if ( attr === '[data-padding-top]' ) {
            var data = {
              paddingTop: $(this).data('padding-top')
            }
          } else if ( attr === '[data-padding-right]' ) {
            var data = {
              paddingRight: $(this).data('padding-right')
            }
          } else if ( attr === '[data-padding-bottom]' ) {
            var data = {
              paddingBottom: $(this).data('padding-bottom')
            }
          } else if ( attr === '[data-padding-left]' ) {
            var data = {
              paddingLeft: $(this).data('padding-left')
            }
          }

          $(this).css(data);
        });
      }
      elementPadding('[data-padding]');
      elementPadding('[data-padding-top]');
      elementPadding('[data-padding-right]');
      elementPadding('[data-padding-bottom]');
      elementPadding('[data-padding-left]');

      // Elements margin
      function elementMargin(attr) {

        $(attr).each(function() {

          if ( attr === '[data-margin]' ) {
            var data = {
              margin: $(this).data('margin')
            }
          } else if ( attr === '[data-margin-top]' ) {
            var data = {
              marginTop: $(this).data('margin-top')
            }
          } else if ( attr === '[data-margin-right]' ) {
            var data = {
              marginRight: $(this).data('margin-right')
            }
          } else if ( attr === '[data-margin-bottom]' ) {
            var data = {
              marginBottom: $(this).data('margin-bottom')
            }
          } else if ( attr === '[data-margin-left]' ) {
            var data = {
              marginLeft: $(this).data('margin-left')
            }
          }

          $(this).css(data);
        });
      }
      elementMargin('[data-margin]');
      elementMargin('[data-margin-top]');
      elementMargin('[data-margin-right]');
      elementMargin('[data-margin-bottom]');
      elementMargin('[data-margin-left]');
    },
    isotopeInit: function() {
      $('[data-area="isotope"]').each( function() {

        var container = $(this).find('[data-area="isotope-container"]');
        var filters   = $(this).find('[data-filters]');

        // Isotope Container
        var portfolio =  container.isotope({
          itemSelector: '.dt-grid-item',
          masonry: {
            columnWidth: 1
          }
        });
        // Re-Init after ready
        setTimeout( function(){ container.isotope('layout'); }, 500 );

        // Filtering items
        filters.on( 'click', '.dt-btn', function() {
          var filterValue = $( this ).attr('data-filter');
          portfolio.isotope({ filter: filterValue });
        });

      });
    },
    gmap3: function() {
      function isMobile() {
        return ('ontouchstart' in document.documentElement);
      }

      function gmap3Prepare(element, position, marker, height) {
        if ( typeof google == 'undefined' ) return;

        if (isMobile()) {
          options.draggable = false;
        }

        $(element)
          .gmap3({
            center: position,
            zoom: 15
          })
          .marker({
            position: position,
            icon: marker
          });
        $(element).css("height", height);
      }
      // Create The Map
      $('.gmap3-area').each( function() {
        var elm   = $(this);
        var mark  = $(this).data('img');
        var pos   = [elm.data('lat'), elm.data('lng')];
        var hei   = $(this).data('height');
        gmap3Prepare(elm, pos, mark, hei);
      });
    },
    countdown: function() {
      $('[data-countdown]').each(function() {
       var $this = $(this), finalDate = $(this).data('countdown');
       $this.countdown(finalDate, function(event) {
         $this.html(event.strftime(''
         + '<div><span>%-D</span> day%!d</div> '
         + '<div><span>%H</span> hour</div>'
         + '<div><span>%M</span> minute</div>'));
       });
     });
    },
  };

  DECENTTHEMES.documentOnReady = {
    init: function(){
      DECENTTHEMES.initialize.init();
    },

  };

  DECENTTHEMES.documentOnResize = {
    init: function(){
      // DECENTTHEMES.initialize.init();
    },

  };

  DECENTTHEMES.documentOnLoad = {
    init: function(){
      DECENTTHEMES.initialize.isotopeInit();
    },

  };

  DECENTTHEMES.documentOnScroll = {
    init: function(){
      // DECENTTHEMES.initialize.init();
    },

  };

  // Initialize Functions
  $(document).ready( DECENTTHEMES.documentOnReady.init );
  $(window).on( 'load', DECENTTHEMES.documentOnLoad.init );
  $(window).on( 'resize', DECENTTHEMES.documentOnResize.init );
  $(document).on( 'scroll', DECENTTHEMES.documentOnScroll.init );

})(jQuery);