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

eval("window.onload = function () {\n  $(\".header__burger\").click(function () {\n    $(\".header__menu_mobile\").slideToggle();\n    $(this).find(\"img\").toggleClass(\"hide\");\n  });\n  $(\".header__menu-item\").on(\"click\", function () {\n    $(this).parent().find(\".active\").removeClass(\"active\");\n    $(this).addClass(\"active\");\n  });\n};\n$(window).resize(function () {\n  if ($(window).width() > 768) {}\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/burger.js?");

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

eval("$(document).ready(function () {\n  $(\".burger\").click(function () {\n    $(\".header__mobile\").toggleClass(\"open\");\n  });\n  $(\".toggle-option\").click(function () {\n    $(\".toggle-option\").removeClass(\"active\");\n    $(this).addClass(\"active\");\n  });\n  $(\"[data-tab]\").click(function () {\n    let data_tab = $(this).attr(\"data-tab\");\n    $(\"[data-tab-target]\").addClass(\"hide\");\n    $(\"[data-tab-target='\" + data_tab + \"']\").removeClass(\"hide\");\n    $(this).parent().find(\"[data-tab]\").removeClass(\"active\");\n    $(this).addClass(\"active\");\n  });\n  $(\".faq .manual-title\").click(function () {\n    $(this).parent().find(\".manual-text\").slideToggle();\n    $(this).toggleClass(\"open\");\n  });\n\n  // $(\".slick-current\").next().find(\".blogSlider__title\").addClass('rotate-90')\n  // $(\".slick-current\").next().find(\"img\").css('border-radius', \"0 44px 44px 0\")\n  // $(\".slick-current\").prev().find(\"img\").css('border-radius', \"44px 0  0 44px\")\n\n  // var swiper = new Swiper(\".mySwiper\", {\n  //     effect: \"coverflow\",\n  //     grabCursor: true,\n  //     centeredSlides: true,\n  //     loop: true,\n  //     slidesPerView: \"1\",\n  //     coverflowEffect: {\n  //       rotate: 0,\n  //       stretch: 0,\n  //       depth: 100,\n  //       modifier: 4,\n  //       slideShadows: false\n  //     },\n  //     keyboard: {\n  //       enabled: true\n  //     },\n  //     mousewheel: {\n  //       thresholdDelta: 70\n  //     },\n  //     initialSlide: 0,\n  //     on: {\n  //       click(event) {\n  //         swiper.slideTo(this.clickedIndex);\n  //       }\n  //     },\n  //     breakpoints: {\n  //       640: {\n  //         slidesPerView: 2\n  //       }\n  //     }\n  //   });\n\n  var sliderSelector = '.swiper-container',\n    options = {\n      init: false,\n      loop: true,\n      speed: 800,\n      slidesPerView: 1,\n      spaceBetween: 0,\n      centeredSlides: true,\n      effect: 'coverflow',\n      coverflowEffect: {\n        rotate: 50,\n        stretch: 0,\n        depth: 60,\n        modifier: 1,\n        slideShadows: true\n      },\n      grabCursor: true,\n      parallax: true,\n      pagination: {\n        el: '.swiper-pagination',\n        clickable: true\n      },\n      navigation: {\n        nextEl: '.swiper-button-next',\n        prevEl: '.swiper-button-prev'\n      },\n      breakpoints: {\n        1000: {\n          slidesPerView: 2,\n          spaceBetween: 0\n        },\n        767: {\n          slidesPerView: 2,\n          spaceBetween: -80\n        }\n      }\n    };\n  var mySwiper = new Swiper(sliderSelector, options);\n  mySwiper.init();\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/oneMoreScript.js?");

/***/ }),

/***/ "./assets/js/components/owl.js":
/*!*************************************!*\
  !*** ./assets/js/components/owl.js ***!
  \*************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  // $('.blogSlider').owlCarousel({\n  //     loop:true,\n  //     nav:true,\n  //     mouseDrag:true,\n  //     touchDrag: true,\n  //     pullDrag:false,\n  //     freeDrag:false,\n  //     URLhashListener:false,\n  //     dots:true,\n  //     autoplay:false,\n  //     responsive:{\n  //         0:{\n  //             items:3\n  //         },\n  //         576:{\n  //             items:5\n  //         },\n  //         1400:{\n  //             items:5\n  //         }\n  //     }\n  // });\n\n  $('.blogSlider').slick({\n    centerMode: true,\n    centerPadding: '100px',\n    slidesToShow: 3,\n    dots: true,\n    adaptiveHeight: true,\n    responsive: [{\n      breakpoint: 768,\n      settings: {\n        arrows: false,\n        centerMode: true,\n        centerPadding: '40px',\n        slidesToShow: 3\n      }\n    }, {\n      breakpoint: 480,\n      settings: {\n        arrows: false,\n        centerMode: true,\n        centerPadding: '40px',\n        slidesToShow: 1\n      }\n    }]\n  });\n  $(\".slick-arrow\").text(\"\");\n});\n\n// window.addEventListener('load', function() {\n//     carouselRUN();\n// }, false);\n\n// function carouselRUN() {\n//     var carousel = document.getElementById(\"carousel\");\n//     var scene = document.getElementById(\"scene\");\n//     var carousel_items_Arrey = document.getElementsByClassName(\"carousel_item\");\n//     var carousel_btn = document.getElementById(\"carousel_btn\");\n//     var n = carousel_items_Arrey.length;\n//     var curr_carousel_items_Arrey = 0;\n//     var theta = Math.PI * 2 / n;\n//     var interval = null;\n//     var autoCarousel = carousel.dataset.auto;\n\n//     setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));\n//     window.addEventListener('resize', function() {\n//         clearInterval(interval);\n//         setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));\n//     }, false);\n//     setupNavigation();\n\n//     function setupCarousel(n, width) {\n//         var apothem = width / (2 * Math.tan(Math.PI / n));\n//         scene.style.transformOrigin = `50% 50% ${- apothem}px`;\n\n//         for (i = 1; i < n; i++) {\n//             carousel_items_Arrey[i].style.transformOrigin = `50% 50% ${- apothem}px`;\n//             carousel_items_Arrey[i].style.transform = `rotateY(${i * theta}rad)`;\n//         }\n\n//         if (autoCarousel === \"true\") {\n//             setCarouselInterval();\n//         }\n//     }\n\n//     function setCarouselInterval() {\n//         interval = setInterval(function() {\n//             curr_carousel_items_Arrey++;\n//             scene.style.transform = `rotateY(${(curr_carousel_items_Arrey) * -theta}rad)`;\n//         }, 8000000);\n//     }\n\n//     function setupNavigation() {\n//         carousel_btn.addEventListener('click', function(e) {\n//             e.stopPropagation();\n//             var target = e.target;\n\n//             if (target.classList.contains('next')) {\n//                 curr_carousel_items_Arrey++;\n//             } else if (target.classList.contains('prev')) {\n//                 curr_carousel_items_Arrey--;\n//             }\n//             clearInterval(interval);\n//             scene.style.transform = `rotateY(${curr_carousel_items_Arrey * -theta}rad)`;\n\n//             if (autoCarousel === \"true\") {\n//                 setTimeout(setCarouselInterval(), 3000);\n//             }\n//         }, true);\n//     }\n// }\n\n//# sourceURL=webpack://starterkit/./assets/js/components/owl.js?");

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