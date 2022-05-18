// 360兼容模式
function cm360() {
  var ms_ie = false,
    ua = window.navigator.userAgent.toLowerCase(),
    old_ie = ua.indexOf('MSIE'),
    new_ie = ua.indexOf('trident/');
  old_ie > -1 || (new_ie > -1 && (ms_ie = true));
  window.navigator.appName.indexOf('Microsoft') != -1 && (me_ie = true);

  return ms_ie;
}

// IE判断
function browserJudge() {
  var userAgent = navigator.userAgent;
  // 是否是IE<11浏览器
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  // 是否是IE11
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;

  // 是否是IE10
  var isIE10 = false;
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp['$1']);
    isIE10 = fIEVersion === 10;
  }

  // 如果是IE但是不是10或者11，或者是兼容模式，则提示
  var isErrorBrowser = (isIE && !isIE10 && !isIE11) || cm360();
  if (isErrorBrowser) {
    var str = '抱歉！您浏览的页面无法正常显示';
    var str2 = '推荐使用Chrome，Firefox，Edge，IE10，IE11浏览器，如果您使用的是360、搜狗、QQ等双核浏览器，';
    var str1 = '请切换到极速模式访问(如下图所示)';
    var str3 = './images/broswer.jpg';
    var str4 = './images/logo.png';
    document.write(
      "<div style='position:fixed; left:0; top:0; right: 0; bottom: 0; z-index: 999999; background:#ffffff';><img style='margin:20px 0 0 100px;' src='" +
        str4 +
        "'/><div style='width:900px;margin:0 auto;font-family:Microsoft YaHei'>" +
        "<p style='padding-top:100px;margin:0;text-align:center;margin-bottom:40px;color:#999;font-size:30px;'>" +
        str +
        "<br/></p><p style='color:#999;font-size:20px;margin-left:50px;'>" +
        str2 +
        str1 +
        '</p>' +
        "<div style='text-align:center;' ><img src='" +
        str3 +
        "'/></div>" +
        '</div></div>'
    );
  }
}

browserJudge();

// document.addEventListener(
//   'DOMContentLoaded',
//   function () {
//     browserJudge();
//   },
//   false,
// );
