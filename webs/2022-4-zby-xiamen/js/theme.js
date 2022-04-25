/*
 * @Date: 2022-04-08 17:12:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-25 17:05:09
 * @FilePath: /school-webs/webs/2022-4-zby-xiamen/js/theme.js
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
  const tipHeight = $('.tip-img').height();
  const headerHeight = $('.web-header').height();
  if (scrollTop >= tipHeight) {
    $('.web-header').css({ position: 'fixed', zIndex: 99997, top: -tipHeight - 1 + 'px' });
    $('body').css({ paddingTop: `${headerHeight}px` });
  } else {
    $('.web-header').css({ position: 'relative', top: 0 });
    $('body').css({ paddingTop: `${0}px` });
  }
}

// 回到顶部
function backTop() {
  $('body,html').animate(
    {
      scrollTop: 0,
    },
    300,
  );
}

// select
function customSelector() {
  $('.custom-selector').each(function () {
    const selector = $(this);
    const placeholder = $(this).find('.placeholder');
    const options = $(this).find('.options');
    placeholder.click(function () {
      $('.custom-selector .options').hide();
      options.show();
    });
  });

  $('body').bind('click', function (e) {
    if (['placeholder'].includes(e.target.className)) {
      return;
    }

    $('.custom-selector .options').hide();
  });
}

function mobileNav() {
  $('#mobileOpen').click(function () {
    $('#mobileNav').fadeIn();
  });
  $('#mobileClose').click(function () {
    $('#mobileNav').fadeOut();
  });
  $('#mobileWxMenu').click(function () {
    $('#mobileWxImage').addClass('active');
  });
  $('#mobileWxImage').click(function () {
    $(this).removeClass('active');
  });
}

function sideBarNav() {
  $("#sideBarNav").find("li").each(function () {
    $(this).on('click', function () {
      $(this).toggleClass('active');
    })
  })
}

function mainNavToggle() {

  // 判断当前分辨率
  const wWidth = $('body').width();
  // PC效果
  if (wWidth > 990) {
    $("#mainNav").find(".nav-one-item").each(function () {
      const navOne = $(this);
      const navTwoBox = $(this).find('.nav-two');
      if (navTwoBox.length) {
        navOne.hover(function () {
          navTwoBox.show();
        }, function () {
          navTwoBox.hide();
        })

        navTwoBox.find('.nav-two-item').each(function () {
          const navTwo = $(this);
          const navThree = $(this).find('.nav-three')

          if (navThree.length) {
            navTwo.hover(function () {
              navThree.show();
            }, function () {
              navThree.hide();
            })
          }
        })

      }
    })
  } else {
    // 移动端效果
    $("#mainNav").find(".nav-one-item").each(function () {
      const navTwoOpenButton = $(this).find('.nav-two-open');
      const navTwoBox = $(this).find('.nav-two');
      if (navTwoBox.length) {
        navTwoOpenButton.click(function () {
          if (navTwoBox.css('display') === 'none') {
            navTwoBox.slideDown();
            navTwoOpenButton.removeClass('icon-plus').addClass('icon-reduce1');
          } else {
            navTwoBox.slideUp();
            navTwoOpenButton.addClass('icon-plus').removeClass('icon-reduce1');
          }
        })


        navTwoBox.find('.nav-two-item').each(function () {
          const navTwoOpenButton = $(this).find('.nav-three-open');
          const navThree = $(this).find('.nav-three')

          if (navThree.length) {
            navTwoOpenButton.click(function () {
              if (navThree.css('display') === 'none') {
                navThree.slideDown();
                navTwoOpenButton.removeClass('icon-plus').addClass('icon-reduce1');
              } else {
                navThree.slideUp();
                navTwoOpenButton.addClass('icon-plus').removeClass('icon-reduce1');
              }
            })
          }
        })

      }
    })
  }
}

// 导航
$(function () {
  headerToggle();
  backTop();
  footerScroll();
  customSelector();
  mobileNav();
  sideBarNav();
  mainNavToggle();
});

// 窗口滚动
window.addEventListener('scroll', function () {
  footerScroll();
  // headerFixed();
});
