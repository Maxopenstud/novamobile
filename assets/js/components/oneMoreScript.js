$(document).ready(function() {
    
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

    $(".faq .manual-title").click(function() {
        $(this).parent().find(".manual-text").slideToggle();
        $(this).toggleClass("open");
    });


    // $(".slick-current").next().find(".blogSlider__title").addClass('rotate-90')
    // $(".slick-current").next().find("img").css('border-radius', "0 44px 44px 0")
    // $(".slick-current").prev().find("img").css('border-radius', "44px 0  0 44px")

    // var swiper = new Swiper(".mySwiper", {
    //     effect: "coverflow",
    //     grabCursor: true,
    //     centeredSlides: true,
    //     loop: true,
    //     slidesPerView: "1",
    //     coverflowEffect: {
    //       rotate: 0,
    //       stretch: 0,
    //       depth: 100,
    //       modifier: 4,
    //       slideShadows: false
    //     },
    //     keyboard: {
    //       enabled: true
    //     },
    //     mousewheel: {
    //       thresholdDelta: 70
    //     },
    //     initialSlide: 0,
    //     on: {
    //       click(event) {
    //         swiper.slideTo(this.clickedIndex);
    //       }
    //     },
    //     breakpoints: {
    //       640: {
    //         slidesPerView: 2
    //       }
    //     }
    //   });
      
    




//     var sliderSelector = '.swiper-container',
// options = {
//     init: false,
//     loop: true,
//     speed: 800,
//     slidesPerView: 1,
//     spaceBetween: 0,
//     centeredSlides : true,
//     effect: 'coverflow',
//     coverflowEffect: {
//         rotate: 50,
//         stretch: 0,
//         depth: 60,
//         modifier: 1,
//         slideShadows : true,
//     },
//     grabCursor: true,
//     parallax: true,
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     breakpoints: {
//         1000: {
//             slidesPerView: 2,
//             spaceBetween: 0
//         },
//         767: {
//             slidesPerView: 2,
//             spaceBetween: -80
//         }        
//         }
// };
// var mySwiper = new Swiper(sliderSelector, options);
// mySwiper.init();
});

