!function(o){"use strict";o(window).on("load",(function(){o(".preloader-wrap").fadeOut(1e3)})),$(".venobox").venobox({spiner:"wave"}),$(".top-btn").click((function(){$("html,body").animate({scrollTop:0},1e3)})),$(window).scroll((function(){$(this).scrollTop()>=900?$(".top-btn").fadeIn():$(".top-btn").fadeOut()}));var t=$("html, body");$(".menu-btn a").on("click",(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var o=$(this.hash);if((o=o.length?o:$("[name="+this.hash.slice(1)+"]")).length)return t.animate({scrollTop:o.offset().top- -50},1500),!1}})),$(window).scroll((function(){$(this).scrollTop()>=100?$(".header").addClass("sticky"):$(".header").removeClass("sticky")}))}(jQuery);