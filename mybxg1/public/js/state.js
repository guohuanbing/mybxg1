define(['jquery'], function ($) {
  $(document).ajaxStart(function () {
    //显示遮挡曾
    $('.overlay').show();
  });

  $(document).ajaxStop(function () {
    //显示遮挡曾
    setTimeout(function () {
      $('.overlay').hide();
    },500)
  });
});