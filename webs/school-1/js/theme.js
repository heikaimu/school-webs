/*
 * @Date: 2022-04-08 17:12:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-11 14:09:48
 * @FilePath: /yzb-web/js/theme.js
 */

// footer滚动效果
function footerScroll() {
  if ($(document).height() - $(document).scrollTop() <= window.innerHeight + window.innerHeight / 2) {
    let scrollBottom = $(document).height() - $(document).scrollTop() - window.innerHeight;
    let halfHeight = window.innerHeight / 2;
    $('.footer-content').css({
      opacity: Math.floor(((halfHeight - scrollBottom) / halfHeight) * 100) / 100,
      transform: `translateY(${scrollBottom / 10}px)`,
    });
  }
}

// 移动端导航
function headerToggle() {
  $('.web-header').each(function () {
    var navSwitch = $(this).find('.web-nav-switch');
    var nav = $(this).find('.web-nav');
    var mobileBlank = $(this).find('.mobile-blank');

    nav.lavaLamp({ fx: 'swing', speed: 500 });

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
}

// 导航固定
function headerFixed() {
  const scrollTop = $(document).scrollTop();
  const tipHeight = $(".tip-img").height();
  const headerHeight = $(".web-header").height();
  if (scrollTop >= tipHeight) {
    $(".web-header").css({ position: 'fixed', zIndex: 99997, top: -tipHeight - 1 + 'px' });
    $('body').css({ paddingTop: `${headerHeight}px` })
  } else {
    $(".web-header").css({ position: 'relative', top: 0 });
    $('body').css({ paddingTop: `${0}px` })
  }
}

// 回到顶部
function backTop() {
  $('body,html').animate({
    scrollTop: 0,
  }, 300);
}

// 导航
$(function () {
  headerToggle();
  backTop();
  footerScroll();
})


// 窗口滚动
window.addEventListener('scroll', function () {
  footerScroll();
  headerFixed();
});
