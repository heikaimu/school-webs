/*
 * @Date: 2022-04-27 12:26:20
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-05-05 16:07:36
 * @FilePath: /school-webs/webs/2022-4-zby-laboratory/js/common.js
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
