/*
 * @Description: 数字滚动到指定的值
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2020-05-29 14:00:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-27 10:30:39
 */
(function ($) {
  // 数字滚动
  $.fn.runNumber = function (duration) {
    duration = duration ? duration : 2000;
    var step = 100;
    var el = $(this);
    var runNum = 0;
    var num = el.text();
    num = Number(num);
    var stepTime = duration / Math.floor(num / 100);

    el.text(0);

    if (isNaN(num)) {
      return;
    }

    const timer = setInterval(function () {
      runNum += step;
      if (runNum >= num) {
        runNum = num;
        clearInterval(timer);
      }
      el.text(runNum);
    }, stepTime);
  }

// 导航特效
//   <nav class="web-nav">
//   <ul class="nav-list">
//     <li class="nav-item active"><a href="./index.html">首页</a></li>
//     <li class="nav-item"><a href="./list-jpsd.html">佳片速递</a></li>
//     <li class="nav-item"><a href="./list-gcjc.html">国潮剧场</a></li>
//     <li class="nav-item"><a href="./list-jdyy.html">经典影院</a></li>
//   </ul>
// </nav>
  $.fn.lavaLamp = function (o) {
    o = $.extend({
      fx: "linear",
      speed: 500,
      li: 'li',
      click: function () { }
    }, o || {});
    return this.each(function () {
      var b = $(this),
        noop = function () { },
        $line = $('<div class="line"></div>').appendTo(b),
        $li = $(o.li, this),
        curr = $("li.active", this)[0] || $($li[0]).addClass("active")[0];
      $li.not(".line").hover(function () {
        move(this)
      }, noop);
      $(this).hover(noop, function () {
        move(curr)
      });
      $li.click(function (e) {
        setCurr(this);
        return o.click.apply(this, [e, this])
      });
      setCurr(curr);

      function setCurr(a) {
        $line.css({
          "left": a.offsetLeft + "px",
          "width": a.offsetWidth + "px"
        });
        curr = a
      }

      function move(a) {
        $line.each(function () {
          $(this).dequeue()
        }).animate({
          width: a.offsetWidth,
          left: a.offsetLeft
        }, o.speed, o.fx)
      }
    })
  }

  // tab切换
  $.fn.tabSwitch = function () {
    this.each(function () {
      var tabTitle = $(this).children(".js-tab-title");
      var tabList = $(this).children(".js-tab-list");
      var showStyle = {
        visibility: 'visible',
        position: 'relative',
        left: 'auto',
        top: 'auto',
        zIndex: 1,
        opacity: 1
      }
      var hideStyle = {
        visibility: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -9,
        opacity: 0
      }
      tabTitle.children("li").eq(0).addClass("active");
      tabList.children("li").eq(0).css(showStyle).siblings("li").css(hideStyle);

      tabTitle.children("li").hover(function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        tabList.children("li").eq($(this).index()).css(showStyle).siblings("li").css(hideStyle);
      })
    })
  }

  // 滚动到当前元素位置
  $.fn.scrollInto = function (params) {
    var offsetDistance = 0;
    var duration = 500;

    if (params) {
      offsetDistance = params.offsetDistance || offsetDistance;
      duration = params.duration || duration;
    }

    var scrollDistance = $(this).offset().top + offsetDistance + 'px';

    $("html,body").animate({
      scrollTop: scrollDistance
    }, duration);
  }

  // 回到顶部
  $.fn.backTop = function (params) {
    const menu = $(this);
    const offset = params.offset || 500;
    const duration = params.duration || 300;

    // 显示隐藏
    $(window).scroll(function(){
      if ($(this).scrollTop() > offset) {
        menu.addClass('show');
      } else {
        menu.removeClass('show');
      }
    });

    // 点击事件
    menu.on('click', function(event) {
      event.preventDefault();
      $('body,html').animate(
        {
          scrollTop: 0,
        },
        duration,
      );
    })
  }
}(jQuery));
