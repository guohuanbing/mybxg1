define(['jquery','template','util'], function ($, template, util) {
  //设置导航菜单
  util.setMenu('/course/add');

  //获取csid
  var csId = util.qs('cs_id');

  $.ajax({
    type:'get',
    url:'/api/course/lesson',
    data:{cs_id:csId},
    dataType:'json',
    success: function (data) {
      console.log(data)
      var html = template('lessonTpl',data.result);
      $('#lessonInfo').html(html);
    }
  });
})