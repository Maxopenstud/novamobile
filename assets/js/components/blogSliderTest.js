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
                $('.cascade-slider-nav-item').removeClass('cur');
                $('.cascade-slider-nav-item').eq(slideCount).addClass('cur');
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
            $('.cascade-slider-nav-item').removeClass('cur');
            $('.cascade-slider-nav-item').eq(slideCount).addClass('cur');

        });

       // Количество слайдов
    var itemCount = $('.cascade-slider_item').length;

    // Установка data-slide-number для каждого элемента
    $('.cascade-slider_item').each(function(i) {
        $(this).attr('data-slide-number', i);
    });

    // Навигация по точкам
    $('.cascade-slider-nav-item').bind('click', function() {
        // Добавление класса активной точке
        $('.cascade-slider-nav-item').removeClass('cur');
        $(this).addClass('cur');

        var index = $(this).index();

        // Смена классов у слайдов
        $('.cascade-slider_item').removeClass('now prev next prev2 next2');
        var slide = $('.cascade-slider_slides').find('[data-slide-number=' + index + ']');
        slide.addClass('now');

        // Проставляем классы для соседних слайдов
        var prevSlide = slide.prev().length ? slide.prev() : $('.cascade-slider_item').last();
        var nextSlide = slide.next().length ? slide.next() : $('.cascade-slider_item').first();

        prevSlide.addClass('prev');
        nextSlide.addClass('next');

        var prev2Slide = prevSlide.prev().length ? prevSlide.prev() : $('.cascade-slider_item').last();
        var next2Slide = nextSlide.next().length ? nextSlide.next() : $('.cascade-slider_item').first();

        prev2Slide.addClass('prev2');
        next2Slide.addClass('next2');
    });

    function changeIndex(nowIndex) {
        var $this = $('#cascade-slider');
        var $item = $this.find('.cascade-slider_item');

        // Очистка всех классов
        $item.removeClass('now next prev next2 prev2');

        // Установка классов для текущего и соседних элементов
        var nowSlide = $item.eq(nowIndex);
        nowSlide.addClass('now');

        var prevSlide = nowSlide.prev().length ? nowSlide.prev() : $item.last();
        var nextSlide = nowSlide.next().length ? nowSlide.next() : $item.first();

        prevSlide.addClass('prev');
        nextSlide.addClass('next');

        var prev2Slide = prevSlide.prev().length ? prevSlide.prev() : $item.last();
        var next2Slide = nextSlide.next().length ? nextSlide.next() : $item.first();

        prev2Slide.addClass('prev2');
        next2Slide.addClass('next2');
    }

    // Начальная инициализация
    changeIndex(0);

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