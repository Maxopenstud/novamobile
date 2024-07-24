/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/components/burger.js":
/*!****************************************!*\
  !*** ./assets/js/components/burger.js ***!
  \****************************************/
/***/ (() => {

eval("// window.onload = function() {\n//     $(\".header__burger\").click(function() {\n//         $(\".header__menu_mobile\").slideToggle();\n//         $(this).find(\"img\").toggleClass(\"hide\");\n//     });\n//     $(\".header__menu-item\").on(\"click\", function() {\n//         $(this).parent().find(\".active\").removeClass(\"active\");\n//         $(this).addClass(\"active\");\n//     });\n// };\n\n// $( window ).resize(function() {\n//     if ($(window).width() > 768) {\n\n//     }\n// });\n\n//# sourceURL=webpack://starterkit/./assets/js/components/burger.js?");

/***/ }),

/***/ "./assets/js/components/modal.js":
/*!***************************************!*\
  !*** ./assets/js/components/modal.js ***!
  \***************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://starterkit/./assets/js/components/modal.js?");

/***/ }),

/***/ "./assets/js/components/oneMoreScript.js":
/*!***********************************************!*\
  !*** ./assets/js/components/oneMoreScript.js ***!
  \***********************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  $(window).scrollTop(0);\n  $(\".burger\").click(function () {\n    $(\".header__mobile\").toggleClass(\"open\");\n  });\n  $(\".toggle-option\").click(function () {\n    $(\".toggle-option\").removeClass(\"active\");\n    $(this).addClass(\"active\");\n  });\n  $(\"[data-tab]\").click(function () {\n    let data_tab = $(this).attr(\"data-tab\");\n    $(\"[data-tab-target]\").addClass(\"hide\");\n    $(\"[data-tab-target='\" + data_tab + \"']\").removeClass(\"hide\");\n    $(this).parent().find(\"[data-tab]\").removeClass(\"active\");\n    $(this).addClass(\"active\");\n  });\n  $(\".password svg\").click(function () {\n    var $input = $(this).parent().find('input');\n    var currentType = $input.attr(\"type\");\n    var newType = currentType === \"password\" ? \"text\" : \"password\";\n    $input.attr(\"type\", newType);\n    $(this).parent().find('svg').toggleClass(\"hide\");\n  });\n  $(\".faq .manual-title\").click(function () {\n    $(this).parent().find(\".manual-text\").slideToggle();\n    $(this).toggleClass(\"open\");\n  });\n  function removeCloud() {\n    $(\".cloud\").css(\"transition\", \"5s\");\n    $(\".cloud\").css(\"transform\", \"translateY(-200%)\");\n  }\n  ;\n  function showHeader() {\n    $(\".header\").css(\"transition\", \"3s\");\n    $(\".header\").css(\"opacity\", \"1\");\n    $(\".hero\").css(\"transition\", \"2s\");\n    $(\".hero\").css(\"transform\", \"translateY(0)\");\n  }\n  ;\n  function showContent() {\n    $(\".content\").css(\"transform\", \"translateY(-100px)\");\n    $(\".footer\").css(\"opacity\", \"1\");\n    $(\".footer\").css(\"visibility\", \"visible\");\n    $(\".footer\").css(\"height\", \"auto\");\n  }\n  ;\n  function setOverflow() {\n    $(\".front-page\").css(\"overflow\", \"auto\");\n  }\n  setTimeout(removeCloud, 300);\n  setTimeout(showHeader, 1000);\n  setTimeout(showContent, 2000);\n  setTimeout(setOverflow, 3000);\n  $(window).on('scroll', function () {\n    var $element = $('.steps__item2');\n    var $element2 = $('.steps__item3');\n    var elementTop = $element.offset().top;\n    var elementTop2 = $element2.offset().top;\n    var elementHeight = $element.outerHeight();\n    var elementHeight2 = $element2.outerHeight();\n    var windowHeight = $(window).height();\n    var scrollTop = $(window).scrollTop();\n\n    // Определяем центр экрана\n    var windowCenter = scrollTop + windowHeight / 2;\n\n    // Проверяем, находится ли элемент в середине экрана\n    if (elementTop < windowCenter && elementTop + elementHeight > windowCenter) {\n      $(\".steps\").addClass('centered');\n    } else {\n      // $element.removeClass('centered');\n    }\n    if (elementTop2 < windowCenter && elementTop2 + elementHeight2 > windowCenter) {\n      $(\".steps\").addClass('bottom');\n    } else {\n      // $element.removeClass('centered');\n    }\n  });\n  var sliderSelector = '.swiper-container',\n    options = {\n      init: false,\n      loop: true,\n      speed: 800,\n      slidesPerView: 1,\n      spaceBetween: 0,\n      centeredSlides: true,\n      effect: 'coverflow',\n      coverflowEffect: {\n        rotate: 50,\n        stretch: 0,\n        depth: 60,\n        modifier: 1,\n        slideShadows: true\n      },\n      grabCursor: true,\n      parallax: true,\n      pagination: {\n        el: '.swiper-pagination',\n        clickable: true\n      },\n      navigation: {\n        nextEl: '.swiper-button-next',\n        prevEl: '.swiper-button-prev'\n      },\n      breakpoints: {\n        1000: {\n          slidesPerView: 2,\n          spaceBetween: 0\n        },\n        767: {\n          slidesPerView: 2,\n          spaceBetween: -80\n        }\n      }\n    };\n  var mySwiper = new Swiper(sliderSelector, options);\n  mySwiper.init();\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/oneMoreScript.js?");

/***/ }),

/***/ "./assets/js/components/owl.js":
/*!*************************************!*\
  !*** ./assets/js/components/owl.js ***!
  \*************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  $('.loginSlider').owlCarousel({\n    loop: true,\n    nav: true,\n    items: 1,\n    mouseDrag: true,\n    touchDrag: true,\n    pullDrag: false,\n    freeDrag: false,\n    URLhashListener: false,\n    dots: true,\n    autoplay: false\n  });\n  $('.blogSlider').slick({\n    centerMode: true,\n    centerPadding: '100px',\n    slidesToShow: 3,\n    dots: true,\n    adaptiveHeight: true,\n    responsive: [{\n      breakpoint: 768,\n      settings: {\n        arrows: false,\n        centerMode: true,\n        centerPadding: '40px',\n        slidesToShow: 3\n      }\n    }, {\n      breakpoint: 480,\n      settings: {\n        arrows: false,\n        centerMode: true,\n        centerPadding: '40px',\n        slidesToShow: 1\n      }\n    }]\n  });\n  $(\".slick-arrow\").text(\"\");\n});\n(function ($) {\n  $.fn.cascadeSlider = function (opt) {\n    var $this = this,\n      itemClass = opt.itemClass || 'cascade-slider_item',\n      arrowClass = opt.arrowClass || 'cascade-slider_arrow',\n      $item = $this.find('.' + itemClass),\n      $arrow = $this.find('.' + arrowClass),\n      $dots = $('.cascade-slider_nav .cascade-slider_dot'),\n      // Вибір точок відповідного контейнера\n      itemCount = $item.length;\n    var defaultIndex = 0;\n    changeIndex(defaultIndex);\n\n    // dots\n    $('.cascade-slider_dot').bind('click', function () {\n      // add class to current dot on click\n      $('.cascade-slider_dot').removeClass('cur');\n      $(this).addClass('cur');\n      var index = $(this).index();\n      console.log(index);\n      $('.cascade-slider_item').removeClass('now prev next');\n      var slide = $('.cascade-slider_slides').find('[data-slide-number=' + index + ']');\n      slide.prev().addClass('prev');\n      slide.addClass('now');\n      slide.next().addClass('next');\n      if (slide.next().length == 0) {\n        $('.cascade-slider_item:first-child').addClass('next');\n      }\n      if (slide.prev().length == 0) {\n        $('.cascade-slider_item:last-child').addClass('prev');\n      }\n    });\n    $arrow.on('click', function () {\n      var action = $(this).data('action'),\n        nowIndex = $item.index($this.find('.now'));\n      console.log(nowIndex);\n      if (action == 'next') {\n        if (nowIndex == itemCount - 1) {\n          changeIndex(0);\n        } else {\n          changeIndex(nowIndex + 1);\n        }\n      } else if (action == 'prev') {\n        if (nowIndex == 0) {\n          changeIndex(itemCount - 1);\n        } else {\n          changeIndex(nowIndex - 1);\n        }\n      }\n    });\n\n    // add data attributes\n    for (var i = 0; i < itemCount; i++) {\n      $('.cascade-slider_item').each(function (i) {\n        $(this).attr('data-slide-number', [i]);\n      });\n    }\n    function changeIndex(nowIndex) {\n      // clern all class\n      $this.find('.now').removeClass('now');\n      $this.find('.next').removeClass('next');\n      $this.find('.prev').removeClass('prev');\n      if (nowIndex == itemCount - 1) {\n        $item.eq(0).addClass('next');\n      }\n      if (nowIndex == 0) {\n        $item.eq(itemCount - 1).addClass('prev');\n      }\n      $item.each(function (index) {\n        if (index == nowIndex) {\n          $item.eq(index).addClass('now');\n        }\n        if (index == nowIndex + 1) {\n          $item.eq(index).addClass('next');\n        }\n        if (index == nowIndex - 1) {\n          $item.eq(index).addClass('prev');\n        }\n      });\n\n      // Видаляємо клас cur у всіх точках\n      $dots.removeClass('cur');\n      // Додаємо клас cur відповідній точці\n      console.log($dots.eq(nowIndex));\n      $dots.eq(nowIndex).addClass('cur');\n    }\n  };\n})(jQuery);\n$('#cascade-slider').cascadeSlider({\n  itemClass: 'cascade-slider_item',\n  arrowClass: 'cascade-slider_arrow'\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/owl.js?");

/***/ }),

/***/ "./assets/js/index.js":
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const modal = __webpack_require__(/*! ./components/modal.js */ \"./assets/js/components/modal.js\");\nconst owl = __webpack_require__(/*! ./components/owl.js */ \"./assets/js/components/owl.js\");\nconst burger = __webpack_require__(/*! ./components/burger.js */ \"./assets/js/components/burger.js\");\nconst oneMoreScript = __webpack_require__(/*! ./components/oneMoreScript.js */ \"./assets/js/components/oneMoreScript.js\");\n//const uiSlider = require('./components/uiSlider.js');\n\n//# sourceURL=webpack://starterkit/./assets/js/index.js?");

/***/ }),

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://starterkit/./assets/scss/app.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./assets/js/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/scss/app.scss");
/******/ 	
/******/ })()
;