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
      $("html").css({ 'font-size': 16 * (clientWidth / 1920) >= 6 ? 16 * (clientWidth / 1920) : 6 + 'px' })
    };
  recalc();
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


