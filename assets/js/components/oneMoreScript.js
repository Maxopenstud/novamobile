
$(document).ready(function() {
    $(window).scrollTop(0);
    $(".burger").click(function() {
        $(".header__mobile").toggleClass("open")
    })
    
    $(".toggle-option").click(function() {
        
        
    });
    $(".toggle-option").click(function() {
        if($(this).hasClass("active")) {
            return
        } else {
            $(".toggle-switch").toggleClass("right");
            $(".toggle-option").removeClass("active");
            $(this).addClass("active");
        }
        
    });

    $("[data-tab]").click(function() {
        let data_tab = $(this).attr("data-tab");
        $("[data-tab-target]").addClass("hidden")
        $("[data-tab-target='" + data_tab + "']").removeClass("hidden")
        $(this).parent().find("[data-tab]").removeClass("active")
        $(this).addClass("active")
    });

    $("[data-tab='local']").click(function() {
        $(".tabs__border").removeClass("center right")
        $(".tabs__border").addClass("left")
    })
    $("[data-tab='regional']").click(function() {
        $(".tabs__border").removeClass("left right")
        $(".tabs__border").addClass("center")
    })
    $("[data-tab='global']").click(function() {
        $(".tabs__border").removeClass("left center")
        $(".tabs__border").addClass("right")
    })
    

    


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
    function showHeader() {
        $(".header").css("transition", "3s");
        $(".header").css("opacity", "1");
        $(".hero").css("transition", "2s");
        $(".hero").css("transform", "translateY(0)");
    };
    function showContent() {
        $(".content").css("transform", "translateY(-100px)")
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
        var $element = $('.front-page .steps__item2');
        var $element2 = $('.front-page .steps__item3');
    
        if ($element.length && $element2.length) {
            var elementTop = $element.offset().top;
            var elementTop2 = $element2.offset().top;
            var elementHeight = $element.outerHeight();
            var elementHeight2 = $element2.outerHeight();
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
    
            // Определяем центр экрана
            var windowCenter = scrollTop + (windowHeight / 2);
    
            // Проверяем, находится ли элемент в середине экрана
            if (elementTop < windowCenter && (elementTop + elementHeight) > windowCenter) {
                $(".steps").addClass('centered');
            } else {
                $(".steps").removeClass('centered');
            }
            if (elementTop2 < windowCenter && (elementTop2 + elementHeight2) > windowCenter) {
                $(".steps").addClass('bottom');
            } else {
                $(".steps").removeClass('bottom');
            }
        }
    });
    
      
    
    $(".email").inputmask("email");

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



    var sliderSelector = '.swiper-container';
var $sliderElement = $(sliderSelector);

if ($sliderElement.length) {
    var options = {
        init: false,
        loop: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 60,
            modifier: 1,
            slideShadows: true,
        },
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1000: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            767: {
                slidesPerView: 2,
                spaceBetween: -80
            }
        }
    };

    var mySwiper = new Swiper(sliderSelector, options);
    mySwiper.init();
}


});

