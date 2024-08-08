(function($) {
    $.fn.cascadeSlider = function(opt) {
        var $this = this,
            itemClass = opt.itemClass || 'cascade-slider_item',
            arrowClass = opt.arrowClass || 'cascade-slider_arrow',
            $item = $this.find('.' + itemClass),
            $arrow = $this.find('.' + arrowClass),
            itemCount = $item.length;
        items = opt.itemCount;

        // Additional option for autoplay
        autoplayDelay = opt.delay;
        if (autoplayDelay == null || autoplayDelay == 0) {
            autoplayDelay = 3;
        }
        pohClass = '.cascade-slider_item, .cascade-slider_arrow, .cascade-slider_dot';
        if (opt.autoplay == true) {
            autoPlay();
            if (opt.pauseOnHover == true) {
                $this.find(pohClass).on('mouseenter', function() {
                    clearInterval(effectInterval);
                }).on('mouseleave', function() {
                    autoPlay();
                })
            }
        }

        function autoPlay() {
            effectInterval = setInterval(function() {
                var action = 'next',
                    nowIndex = $item.index($this.find('.now'));

                if (action == 'next') {
                    if (nowIndex == itemCount - 1) {
                        changeIndex(0);
                    } else {
                        changeIndex(nowIndex + 1);
                    }
                } else if (action == 'prev') {
                    if (nowIndex == 0) {
                        changeIndex(itemCount - 1);
                    } else {
                        changeIndex(nowIndex - 1);
                    }
                }
                var slideCount = $('.cascade-slider_item.now').attr('data-slide-number');
                $('.cascade-slider_dot').removeClass('cur');
                $('.cascade-slider_dot').eq(slideCount).addClass('cur');
            }, autoplayDelay * 1000);
        }
        // END of Additional option for autoplay

        var defaultIndex = 0;

        changeIndex(defaultIndex);

        $arrow.on('click', function() {
            var action = $(this).data('action'),
                nowIndex = $item.index($this.find('.now'));

            if (action == 'next') {
                if (nowIndex == itemCount - 1) {
                    changeIndex(0);
                } else {
                    changeIndex(nowIndex + 1);
                }
            } else if (action == 'prev') {
                if (nowIndex == 0) {
                    changeIndex(itemCount - 1);
                } else {
                    changeIndex(nowIndex - 1);
                }
            }
            var slideCount = $('.cascade-slider_item.now').attr('data-slide-number');
            $('.cascade-slider_dot').removeClass('cur');
            $('.cascade-slider_dot').eq(slideCount).addClass('cur');

        });

        // add data attributes
        for (var i = 0; i < itemCount; i++) {
            $('.cascade-slider_item').each(function(i) {
                $(this).attr('data-slide-number', [i]);
            });
        }

        // dots
        $('.cascade-slider_dot').bind('click', function() {
            // add class to current dot on click
            $('.cascade-slider_dot').removeClass('cur');
            $(this).addClass('cur');

            var index = $(this).index();

            $('.cascade-slider_item').removeClass('now prev next');
            var slide = $('.cascade-slider_slides').find('[data-slide-number=' + index + ']');
            slide.prev().addClass('prev');
            slide.addClass('now');
            slide.next().addClass('next');

            if (slide.next().length == 0) {
                $('.cascade-slider_item:first-child').addClass('next');
            }

            if (slide.prev().length == 0) {
                $('.cascade-slider_item:last-child').addClass('prev');
            }
        });

        function changeIndex(nowIndex) {
            // clern all class
            $this.find('.now').removeClass('now');
            $this.find('.next').removeClass('next');
            $this.find('.prev').removeClass('prev');
            $this.find('.next2').removeClass('next2');
            $this.find('.prev2').removeClass('prev2');

            if (nowIndex == itemCount - 1) {
                $item.eq(0).addClass('next');
            }
            if (nowIndex == 0) {
                $item.eq(itemCount - 1).addClass('prev');
            }

            $item.each(function(index) {
                if (index == nowIndex) {
                    $item.eq(index).addClass('now');
                }
                if (index == nowIndex + 1) {
                    $item.eq(index).addClass('next');
                }
                if (index == nowIndex - 1) {
                    $item.eq(index).addClass('prev');
                }
            });

            if (items == 5) {
                otherIndex();
            }

        }

        function otherIndex() {
            var slideItemsCount = $this.find('.cascade-slider_item').length - 1;
            var nextSlide = $this.find('.next').index()
            var prevSlide = $this.find('.prev').index()

            if (nextSlide + 1 <= slideItemsCount) {
                $this.find('.cascade-slider_item').eq(nextSlide + 1).addClass('next2');
            } else if (nextSlide + 1 > slideItemsCount) {
                $this.find('.cascade-slider_item').eq(0).addClass('next2');
            }
            if (prevSlide - 1 <= slideItemsCount) {
                $this.find('.cascade-slider_item').eq(prevSlide - 1).addClass('prev2');
            } else if (prevSlide - 1 > slideItemsCount) {
                $this.find('.cascade-slider_item').eq(slideItemsCount).addClass('prev2');
            }

        }

    };
})(jQuery);



$('#cascade-slider').cascadeSlider({
    itemClass: 'cascade-slider_item',
    arrowClass: 'cascade-slider_arrow',
    autoplay: false, // additional feature - autoplay next images
    delay: 1, // additional feature - adding delay of autoplay feature
    pauseOnHover: true, // additional feature - will pause the autoplay function when hovering images
    itemCount: 5 // Set 5 or 3 for total count of images to be shown
});


$(document).ready(function() {
    
    // var slideCount = $(".cascade-slider_item");
    // for(i=0; i < slideCount.length; i++) {
    //     $(".cascade-slider-nav").append("<div class='cascade-slider-nav-item cascade-slider_dot'></div>")
    // }
    $(".cascade-slider-nav-item").first().addClass("active")


    // Получаем элемент .cascade-slider-nav-item, который идет первым
    // Находим первый элемент с классом .cascade-slider-nav
    var firstNavItem = $(".cascade-slider-nav");
    var firstNavItemWidth = $(".cascade-slider-nav").width();

    // Получаем позицию первого элемента относительно документа
    var position = firstNavItem.offset();
    console.log(position);
    
    // Определяем позицию левого края элемента
    var leftPosition = position.left;

    // Определяем позицию правого края элемента
    var rightPosition = $(window).width() - (leftPosition + firstNavItem.outerWidth());

    // Смещаем элемент .cascade-slider_arrow-left на 20 пикселей левее
    // if($(window).width() < 768) {
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (leftPosition - 60) + "px"
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (rightPosition - 60) + "px"
    //     });
    // } else if($(window).width() > 767 && $(window).width() < 1100){
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (leftPosition - 100) + "px"
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (rightPosition - 100) + "px"
    //     });
    // } else if($(window).width() > 1099 && $(window).width() < 1400) {
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (leftPosition - 200) + "px"
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (rightPosition - 200) + "px"
    //     });
    // } else if($(window).width() > 1399 && $(window).width() < 1500) {
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (leftPosition - 300) + "px"
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (rightPosition - 300) + "px"
    //     });
    // } else if($(window).width() > 1499 && $(window).width() < 1700) {
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (leftPosition - 370) + "px"
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (rightPosition - 370) + "px"
    //     });
    // } else if($(window).width() > 1699 && $(window).width() < 1920) {
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (leftPosition - 450) + "px"
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (rightPosition - 450) + "px"
    //     });
    // } else if($(window).width() > 1919){
    //     $(".cascade-slider_arrow-left").css({
    //         "left": (-200) + "px",
    //         "right": (0) + "px",
    //     });
    //     $(".cascade-slider_arrow-right").css({
    //         "right": (-200) + "px",
    //         "left": (0) + "px"
    //     });
    // }



    $(".cascade-slider_arrow").click(function() {
        let index = $(".cascade-slider_item.now").index();
        $(".cascade-slider-nav-item").removeClass("active")
        $(".cascade-slider-nav-item").eq(index).addClass("active")
    })
    $(".cascade-slider-nav-item").click(function() {
        $(".cascade-slider-nav-item").removeClass("active");
        $(this).addClass("active")
        let index = $(this).index();
    })
})