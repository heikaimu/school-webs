/*
 * @Date: 2022-04-08 17:12:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-27 12:31:04
 * @FilePath: /school-webs/webs/2022-4-zby-xiamen/js/theme.js
 */

$(function () {
  isIE();
  backTop();
  new WOW().init();

  customSelector();
  mobileNav();
  sideBarNav();
  mainNavToggle();
});

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
    $('#mobileNav').addClass("active");
    $('html').css({ 'overflow-y': 'hidden' });
  });
  $('#mobileClose').click(function () {
    $('#mobileNav').removeClass("active");
    $('html').css({ 'overflow-y': 'auto' });
  });
  $('#mobileWxMenu').click(function () {
    $('#mobileWxImage').addClass('active');
  });
  $('#mobileWxImage').click(function () {
    $(this).removeClass('active');
  });
}

// 侧边导航
function sideBarNav() {
  $("#sideBarNav").find("li").each(function () {
    if ($(this).hasClass('active')) {
      $(this).find('.third-nav').show();
    }

    $(this).on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active').find('.third-nav').slideUp();
      } else {
        $(this).addClass('active').find('.third-nav').slideDown();
        $(this).siblings('li').removeClass('active').find('.third-nav').slideUp();
      }
    })
  })
}

// 主导航栏目
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
