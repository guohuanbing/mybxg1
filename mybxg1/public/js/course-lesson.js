define(['jquery','template','util','bootstrap'], function ($, template, util) {
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

      //处理添加课时
      $("#addLesson").click(function () {
        var html = template('modalTpl',{operate:'添加课时'})
        $('#modalInfo').html(html);
        $("#chapterModal").modal();
      })


      //处理课时编辑
      $(".editLesson").click(function () {
        //获取课时ID
        var ctId = $(this).attr('data-ctId')
        $.ajax({
          type:'get',
          url:'/api/course/chapter/edit',
          data:{ct_id:ctId},
          dataType:'json',
          success: function (data) {
            console.log(data)
            data.result.operate = '编辑课时';
            var html = template('modalTpl',data.result)
            $('#modalInfo').html(html);
          }
        })
        $("#chapterModal").modal();
      })
    }
  });
})