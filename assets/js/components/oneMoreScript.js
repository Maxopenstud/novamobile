
$(document).ready(function() {
    $(window).scrollTop(0);
    $(".burger").click(function() {
        $(".header__mobile").toggleClass("open")
    })
    
    $(".toggle-option").click(function() {
        if($(this).hasClass("active")) {
            return
        } else {
            $(".toggle-switch").toggleClass("right");
            $(".toggle-option").removeClass("active");
            $(this).addClass("active");
            $(this).parents("[data-tab-target='global']").find(".cards").toggleClass("hidden")
        }
        
    });
    var clickCount = 0
    $("#acc_delete").click(function(e) {
        
        e.preventDefault();
        
        if($('input[type=radio]:checked').length) {
            clickCount++
            $(".modal-title, .modal-desc, .reason-list, .modal-textarea").toggleClass("hide")
            $("#noDel, .modal-steps-item").toggleClass("active")
            $("#noDel").addClass("accDelStep2")
        } else {
            $(".custom-radio").addClass("error")
        }
        if (clickCount == 2) {
            $("#form_acc_delete").submit();
            window.location.href = "accountDeleted.html";
        }
        
    })
    $('.custom-radio').click(function() {
        $('.custom-radio').removeClass("error")
    })  

  $(document).on('click', '.accDelStep2', function() {
    $(".modal-title, .modal-desc, .reason-list, .modal-textarea").toggleClass("hide");
    $(".modal-steps-item").toggleClass("active");
    $("#noDel").removeClass("accDelStep2")
    clickCount = 0
  })

    var checkbox_reverse = $(".account-custom-checkbox").width();
    $(".custom-checkbox-reverse > input").width(checkbox_reverse);

    $("[data-tab]").click(function() {
        let data_tab = $(this).attr("data-tab");
        $("[data-tab-target]").addClass("hidden")
        $("[data-tab-target='" + data_tab + "']").removeClass("hidden")
        $(this).parent().find("[data-tab]").removeClass("active")
        $(this).addClass("active")
    });

    $(".accountTabs__menu-item").click(function(e) {
        e.preventDefault();
    })
    
    $("[data-tab]").click(function() {
        let index = $(this).index();
        let translateValue = index * 100;
        $(".tabs__active-border").css('transform', `translateX(${translateValue}%)`);
    });
    var tabsCount = $(".tabs__border [data-tab]");
    var borderWidth = 100 / tabsCount.length;
    $(".tabs__active-border").width(borderWidth + '%');

    // window.addEventListener('scroll', () => {
    //     const screens = document.querySelectorAll('.device__screen');
    //     const scrollPosition = window.scrollY;
    //     const screenCount = screens.length;
    //     const scrollStep = 200; // Высота прокрутки для смены изображения
    //     const activeIndex = Math.floor(scrollPosition / scrollStep) % screenCount;

    //     screens.forEach((screen, index) => {
    //         screen.classList.toggle('active', index === activeIndex);
    //     });
    // });


    $(".password svg").click(function() {
        var $input = $(this).parent().find('input');
        var currentType = $input.attr("type");
        var newType = currentType === "password" ? "text" : "password";
        $input.attr("type", newType);
        $(this).parent().find('svg').toggleClass("hide");
    });
    

    $(".faq .manual-title").click(function() {
        $(this).parent().find(".manual-text").slideToggle();
        $(this).toggleClass("open");
    });
    function removeCloud() {
        $(".cloud").css("transition", "5s");
        $(".cloud").css("transform", "translateY(-200%)");
        
    };



     //  загрузка изображения объекта
     const $fileInput = $('#fileInput');
     const $uploadedImage = $('#uploadedImage');
 
     $fileInput.on('change', function() {
         const file = this.files[0];
         if (file) {
             const reader = new FileReader();
             reader.onload = function(e) {
                 $uploadedImage.attr('src', e.target.result);
                 $uploadedImage.show();
             };
             reader.readAsDataURL(file);
         }
     });




    function showHeader() {
        $(".header").css("transition", "3s");
        $(".header").css("opacity", "1");
        $(".hero").css("transition", "2s");
        $(".hero").css("transform", "translateY(0)");
    };
    function showContent() {
        // let mainHeight = $(window).height() - 200;
        $(".content").css("transform", "translateY(-50px)")
        // $(".main").css("height", mainHeight)
        $(".footer").css("opacity", "1")
        $(".footer").css("visibility", "visible")
        $(".footer").css("height", "auto")
    };
    function setOverflow() {
        $(".front-page").css("overflow", "auto")
    }
    setTimeout(removeCloud, 300);
    setTimeout(showHeader, 1000);
    setTimeout(showContent, 2000);
    setTimeout(setOverflow, 3000);
    
    $(window).on('scroll', function() {
        var $stepsItems = $('.steps__item');
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var windowCenter = scrollTop + (windowHeight / 2);
    
        if ($stepsItems.length) {
            $stepsItems.each(function() {
                var $element = $(this);
                var elementTop = $element.offset().top;
                var elementHeight = $element.outerHeight();
    
                if (elementTop < windowCenter && (elementTop + elementHeight) > windowCenter) {
                    if ($element.hasClass('steps__item1')) {
                        $(".steps, .device__screens").removeClass('centered bottom');
                    }
                    if ($element.hasClass('steps__item2')) {
                        $(".steps, .device__screens").addClass('centered').removeClass('bottom');
                    }
                    if ($element.hasClass('steps__item3')) {
                        $(".steps, .device__screens").addClass('bottom')
                    }
                }
            });
        }




        
    });

    function updateProgress() {
        var $rangeInput = $('#range');
        var $rangeFill = $('.range-fill');
        var value = (($rangeInput.val() - $rangeInput.attr('min')) / ($rangeInput.attr('max') - $rangeInput.attr('min'))) * 100;
        $rangeFill.css('--value', value);
    }

    $('#range').on('input', updateProgress);
    updateProgress(); // Инициализация при загрузке

    function hideCopied() {
        $(".succes-copy").removeClass('active');
    }
    $('#copy-button').click(function() {
        var $textToCopy = $('#text-to-copy').val();

        // Create a temporary textarea element to hold the text
        var $tempTextarea = $('<textarea>').val($textToCopy).appendTo('body');

        // Select the text in the textarea
        $tempTextarea.select();
        document.execCommand('copy');

        // Remove the textarea from the document
        $tempTextarea.remove();
        $(".succes-copy").addClass('active');
        setTimeout(hideCopied, 500)
    });


    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};
            
            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from:            $(this).data('from'),
                    to:              $(this).data('to'),
                    speed:           $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals:        $(this).data('decimals')
                }, options);
                
                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;
                
                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};
                
                $self.data('countTo', data);
                
                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);
                
                // initialize the element with the starting value
                render(value);
                
                function updateTimer() {
                    value += increment;
                    loopCount++;
                    
                    render(value);
                    
                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }
                    
                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;
                        
                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }
                
                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };
        
        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };
        
        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));
    
    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });
      
      // start all the timers
      $('.timer').each(count);  
      
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });


    const isMacBook = navigator.userAgent.includes('Macintosh');
    if (isMacBook) {

        $(".cascade-slider_arrow, .cascade-slider_nav, .blog-slider .sectionTitle").addClass('mac');
    } 
    
      
    if ($(".email").length) {
        $(".email").inputmask("email");
    }

    $("button[type='submit']").click(function(e) {
        e.preventDefault();
        var isValid = true;

        // Проверяем каждое поле ввода
        $('.form-input').each(function() {
            var $this = $(this);
            if (!$this.val()) {
                $this.addClass('error');
                isValid = false;
            } else {
                $this.removeClass('error');
            }
        });

        // Проверяем поле выбора
        $('select').each(function() {
            var $this = $(this);
            if (!$this.val()) {
                $this.addClass('error');
                isValid = false;
            } else {
                $this.removeClass('error');
            }
        });

        // Проверяем текстовое поле
        $('textarea').each(function() {
            var $this = $(this);
            if (!$this.val()) {
                $this.addClass('error');
                isValid = false;
            } else {
                $this.removeClass('error');
            }
        });

        // Проверка чекбокса согласия
        if (!$('input[name="consent"]').is(':checked')) {
            isValid = false;
        }

        // Если все поля заполнены, отправляем форму
        if (isValid) {
            $('.questions__content').submit();
        }
    });



//     var sliderSelector = '.swiper-container';
// var $sliderElement = $(sliderSelector);

// if ($sliderElement.length) {
//     var options = {
//         init: false,
//         loop: true,
//         speed: 800,
//         slidesPerView: 1,
//         spaceBetween: 0,
//         centeredSlides: true,
//         effect: 'coverflow',
//         coverflowEffect: {
//             rotate: 50,
//             stretch: 0,
//             depth: 60,
//             modifier: 1,
//             slideShadows: true,
//         },
//         grabCursor: true,
//         parallax: true,
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//         breakpoints: {
//             1000: {
//                 slidesPerView: 2,
//                 spaceBetween: 0
//             },
//             767: {
//                 slidesPerView: 2,
//                 spaceBetween: -80
//             }
//         }
//     };

//     var mySwiper = new Swiper(sliderSelector, options);
//     mySwiper.init();
// }


});

