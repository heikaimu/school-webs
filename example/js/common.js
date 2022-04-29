/*
 * @Date: 2022-04-27 12:26:20
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-29 11:22:14
 * @FilePath: /school-webs/example/js/common.js
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
  var userAgent = navigator.userAgent;
  // 是否是IE<11浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
  // 是否是IE11
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  // 是否是兼容模式
  var compatibilityMode = window.navigator.userAgent.indexOf('compatible') !== -1;
  // 是否是IE10
  var isIE10 = false;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    isIE10 = fIEVersion === 10;
  }

  // 如果是IE但是不是10或者11，或者是兼容模式，则提示
  var isErrorBrowser = (isIE && !isIE10 && !isIE11) || compatibilityMode;
  if (isErrorBrowser) {
    var str = "抱歉！您浏览的页面无法正常显示";
    var str2 = "推荐使用Chrome，Firefox，Edge，IE10，IE11浏览器，如果您使用的是360、搜狗、QQ等双核浏览器，";
    var str1 = "请切换到极速模式访问(如下图所示)";
    var str3 = "./images/broswer.jpg";
    var str4 = "./images/logo.png";
    document.write("<div><img style='margin:20px 0 0 100px;' src='" + str4 + "'/><div style='width:900px;margin:0 auto;font-family:Microsoft YaHei'>" +
      "<p style='padding-top:100px;margin:0;text-align:center;margin-bottom:40px;color:#999;font-size:30px;'>" + str + "<br/></p><p style='color:#999;font-size:20px;margin-left:50px;'>" + str2 + str1 + "</p>" +
      "<div style='text-align:center;' ><img src='" + str3 + "'/></div>" + "</div></div>");
    // document.execCommand("Stop");
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
