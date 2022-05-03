/*
 * @Date: 2022-04-08 17:12:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-29 15:58:27
 * @FilePath: /school-webs/webs/2022-4-zby-laboratory/js/theme.js
 */

$(function () {
  isIE();
  backTop();
  new WOW().init();

  customSelector();
  mobileNav();
  sideBarNav();
  mobileSearch();
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
  $('[data-nav-open]').click(function () {
    $('[data-nav-wrapper]').addClass('active');
    $('html').css({ 'overflow-y': 'hidden' });
  });
  $('[data-nav-close]').click(function () {
    $('[data-nav-wrapper]').removeClass('active');
    $('html').css({ 'overflow-y': 'auto' });
  });
  $('[data-nav-wrapper]').on('click', function () {
    $('[data-nav-wrapper]').removeClass('active');
    $('html').css({ 'overflow-y': 'auto' });
  });
  $('[data-nav]').on('click', function (e) {
    e.stopPropagation();
  });
}

function mobileSearch() {
  $('[data-search-open]').on('click', function () {
    $('[data-search]').slideDown();
  });

  $('[data-search-close]').on('click', function () {
    $('[data-search]').slideUp();
  });
}

// 侧边导航
function sideBarNav() {
  $('#sideBarNav')
    .find('li')
    .each(function () {
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
      });
    });
}

// 主导航栏目
function mainNavToggle() {
  // 判断当前分辨率
  const wWidth = $('body').width();
  // PC效果
  if (wWidth > 990) {
    $('[data-nav]')
      .find('[data-nav-lv1]')
      .each(function () {
        const navOne = $(this);
        const navTwoBox = $(this).find('[data-nav-lv2-wrapper]');
        if (navTwoBox.length) {
          navOne.hover(
            function () {
              navTwoBox.show();
              navOne.find('[data-nav-lv1-text]').addClass('active');
            },
            function () {
              navTwoBox.hide();
              navOne.find('[data-nav-lv1-text]').removeClass('active');
            },
          );

          navTwoBox.find('[data-nav-lv2]').each(function () {
            const navTwo = $(this);
            const navThree = $(this).find('[data-nav-lv3-wrapper]');

            if (navThree.length) {
              navTwo.hover(
                function () {
                  navThree.show();
                },
                function () {
                  navThree.hide();
                },
              );
            }
          });
        }
      });
  } else {
    // 移动端效果
    $('[data-nav]')
      .find('[data-nav-lv1]')
      .each(function () {
        const navTwoOpenButton = $(this).find('[data-nav-lv2-open]');
        const navTwoBox = $(this).find('[data-nav-lv2-wrapper]');
        if (navTwoBox.length) {
          navTwoOpenButton.click(function () {
            if (navTwoBox.css('display') === 'none') {
              navTwoBox.slideDown();
              navTwoOpenButton.removeClass('icon-plus').addClass('icon-reduce1');
            } else {
              navTwoBox.slideUp();
              navTwoOpenButton.addClass('icon-plus').removeClass('icon-reduce1');
            }
          });

          navTwoBox.find('[data-nav-lv2]').each(function () {
            const navTwoOpenButton = $(this).find('[data-nav-lv3-open]');
            const navThree = $(this).find('.nav-three');

            if (navThree.length) {
              navTwoOpenButton.click(function () {
                if (navThree.css('display') === 'none') {
                  navThree.slideDown();
                  navTwoOpenButton.removeClass('icon-plus').addClass('icon-reduce1');
                } else {
                  navThree.slideUp();
                  navTwoOpenButton.addClass('icon-plus').removeClass('icon-reduce1');
                }
              });
            }
          });
        }
      });
  }
}
