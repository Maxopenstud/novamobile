$(document).ready(function() {
// $('.blogSlider').owlCarousel({
//     loop:true,
//     nav:true,
//     mouseDrag:true,
//     touchDrag: true,
//     pullDrag:false,
//     freeDrag:false,
//     URLhashListener:false,
//     dots:true,
//     autoplay:false,
//     responsive:{
//         0:{
//             items:3
//         },
//         576:{
//             items:5
//         },
//         1400:{
//             items:5
//         }
//     }
// });



$('.blogSlider').slick({
    centerMode: true,
    centerPadding: '100px',
    slidesToShow: 3,
    dots: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
  $(".slick-arrow").text("");
});

// window.addEventListener('load', function() {
//     carouselRUN();
// }, false);

// function carouselRUN() {
//     var carousel = document.getElementById("carousel");
//     var scene = document.getElementById("scene");
//     var carousel_items_Arrey = document.getElementsByClassName("carousel_item");
//     var carousel_btn = document.getElementById("carousel_btn");
//     var n = carousel_items_Arrey.length;
//     var curr_carousel_items_Arrey = 0;
//     var theta = Math.PI * 2 / n;
//     var interval = null;
//     var autoCarousel = carousel.dataset.auto;

//     setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
//     window.addEventListener('resize', function() {
//         clearInterval(interval);
//         setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
//     }, false);
//     setupNavigation();


//     function setupCarousel(n, width) {
//         var apothem = width / (2 * Math.tan(Math.PI / n));
//         scene.style.transformOrigin = `50% 50% ${- apothem}px`;

//         for (i = 1; i < n; i++) {
//             carousel_items_Arrey[i].style.transformOrigin = `50% 50% ${- apothem}px`;
//             carousel_items_Arrey[i].style.transform = `rotateY(${i * theta}rad)`;
//         }

//         if (autoCarousel === "true") {
//             setCarouselInterval();
//         }
//     }

//     function setCarouselInterval() {
//         interval = setInterval(function() {
//             curr_carousel_items_Arrey++;
//             scene.style.transform = `rotateY(${(curr_carousel_items_Arrey) * -theta}rad)`;
//         }, 8000000);
//     }

//     function setupNavigation() {
//         carousel_btn.addEventListener('click', function(e) {
//             e.stopPropagation();
//             var target = e.target;

//             if (target.classList.contains('next')) {
//                 curr_carousel_items_Arrey++;
//             } else if (target.classList.contains('prev')) {
//                 curr_carousel_items_Arrey--;
//             }
//             clearInterval(interval);
//             scene.style.transform = `rotateY(${curr_carousel_items_Arrey * -theta}rad)`;

//             if (autoCarousel === "true") {
//                 setTimeout(setCarouselInterval(), 3000);
//             }
//         }, true);
//     }
// }