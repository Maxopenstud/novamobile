
$(document).ready(function() {
    $(window).scrollTop(0);
    $(".burger").click(function() {
        $(".header__mobile").toggleClass("open")
    })
    
    $(".toggle-option").click(function() {
        $(".toggle-option").removeClass("active");
        $(this).addClass("active");
    });

    $("[data-tab]").click(function() {
        let data_tab = $(this).attr("data-tab");
        $("[data-tab-target]").addClass("hide")
        $("[data-tab-target='" + data_tab + "']").removeClass("hide")
        $(this).parent().find("[data-tab]").removeClass("active")
        $(this).addClass("active")
    });

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
        var $element = $('.steps__item2');
        var $element2 = $('.steps__item3');
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
            // $element.removeClass('centered');
        }
        if (elementTop2 < windowCenter && (elementTop2 + elementHeight2) > windowCenter) {
            $(".steps").addClass('bottom');
        } else {
            // $element.removeClass('centered');
        }
    });
      
    




    var sliderSelector = '.swiper-container',
options = {
    init: false,
    loop: true,
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides : true,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 60,
        modifier: 1,
        slideShadows : true,
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
});

