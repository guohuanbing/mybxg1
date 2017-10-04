define(['jquery', 'template', 'util', 'form'], function ($, template, util) {
  util.setMenu(location.pathname)
  //绑定提交事件
  $("#courseBtn").click(function () {
    $("#courseForm").ajaxSubmit({
      type: 'post',
      url: '/api/course/create',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        if (data.code == 200) {
          location.href = '/course/basic?cs_id=' + data.result.cs_id;
        }
      }
    })
  })
})