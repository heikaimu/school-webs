/*
 * @Date: 2022-04-27 12:26:20
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-27 12:29:26
 * @FilePath: /school-webs/webs/2022-4-zby-xiamen/js/common.js
 */
// 弹窗
function layer(title, message, callbackFn) {
  var str = '<div class="layer" id="customLayer"><div class="layer__blank"></div><div class="layer__content"><div class="layer-top"><p class="text">' + title + '</p></div><div class="layer-bottom"><p class="text">' + message + '</p><div class="confirm"><p class="confirm-button" id="layerConfirm">确定</p></div></div></div></div>'
  var $layer = $(str);
  $("body").append($layer);
  $layer.find('#layerConfirm').on('click', function () {
    $layer.remove();
    callbackFn();
  });
}

// IE判断
function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    layer('浏览器兼容提示', '请选择使用Edge浏览器、Chrome浏览器、360浏览器极速模式、QQ浏览器极速模式浏览网站，以获得最好的体验',
      function () {
        window.close();
      }
    )
  }
}

// 页面刷新回到顶部，回到顶部按钮
function backTop() {
  $('body,html').animate({
    scrollTop: 0
  }, 300);

  $("#backTopMenu").backTop({
    offset: 500,
    duration: 300
  });
}
