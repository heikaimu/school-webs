/*
 * @Date: 2022-04-08 17:12:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-08 17:22:52
 * @FilePath: /school-webs/webs/schools/yzb-web/js/theme.js
 */
(function (doc, win) {
  'use strict';
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = window.innerWidth || docEl.clientWidth;
      $('html').css({ 'font-size': 16 * (clientWidth / 1920) >= 6 ? 16 * (clientWidth / 1920) : 6 + 'px' });
    };
  recalc();
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function footerScroll() {
  if ($(document).height() - $(document).scrollTop() <= window.innerHeight + window.innerHeight / 2) {
    let scroll_bottom = $(document).height() - $(document).scrollTop() - window.innerHeight;
    let half_height = window.innerHeight / 2;
    $('.footer-content').css({
      opacity: Math.floor(((half_height - scroll_bottom) / half_height) * 100) / 100,
      transform: `translateY(${scroll_bottom / 10}px)`,
    });
  }
}

// 导航
!(function () {
  $('.web-header').each(function () {
    var header = $(this);
    var search = $(this).find('.search-bar');
    var searchOpenSwitch = $(this).find('.search-bar-show');
    var searchCloseSwitch = $(this).find('.search-bar-close');
    var navSwitch = $(this).find('.web-nav-switch');
    var nav = $(this).find('.web-nav');
    var mobileBlank = $(this).find('.mobile-blank');

    nav.lavaLamp({ fx: 'swing', speed: 500 });

    searchOpenSwitch.click(function () {
      search.slideDown();
    });

    searchCloseSwitch.click(function () {
      search.slideUp();
    });

    header.mouseleave(function () {
      search.slideUp();
    });

    navSwitch.click(function () {
      if (navSwitch.hasClass('active')) {
        navSwitch.stop().removeClass('active');
        nav.removeClass('active');
        $('html').css({ 'overflow-y': 'auto' });
      } else {
        navSwitch.addClass('active');
        mobileBlank.fadeIn();
        nav.addClass('active');
        $('html').css({ 'overflow-y': 'hidden' });
      }
    });

    mobileBlank.click(function () {
      mobileBlank.fadeOut();
      navSwitch.stop().removeClass('active');
      nav.removeClass('active');
      $('html').css({ 'overflow-y': 'auto' });
    });
  });
})();
