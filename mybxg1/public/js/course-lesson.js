define(['jquery', 'template', 'util', 'bootstrap', 'form'], function ($, template, util) {
  //设置导航菜单
  util.setMenu('/course/add');

  //获取csid
  var csId = util.qs('cs_id');

  $.ajax({
    type: 'get',
    url: '/api/course/lesson',
    data: {cs_id: csId},
    dataType: 'json',
    success: function (data) {
      console.log(data)
      var html = template('lessonTpl', data.result);
      $('#lessonInfo').html(html);

      //处理添加课时
      $("#addLesson").click(function () {
        var html = template('modalTpl', {operate: '添加课时'})
        $('#modalInfo').html(html);
        $("#chapterModal").modal();

        //处理表单提交
        $('#addOreditBtn').click(function () {
          $('#lessonForm').ajaxSubmit({
            type: 'post',
            url: '/api/course/chapter/add',
            dataType: 'json',
            data: {ct_cs_id: csId},
            success: function (data) {
              //console.log(data)
              if (data.code == 200) {
                location.reload();
              }
            }
          });
        })
      })

      //处理课时编辑
      $(".editLesson").click(function () {
        //获取课时ID
        var ctId = $(this).attr('data-ctId')
        $.ajax({
          type: 'get',
          url: '/api/course/chapter/edit',
          data: {ct_id: ctId},
          dataType: 'json',
          success: function (data) {
            console.log(data)
            data.result.operate = '编辑课时';
            var html = template('modalTpl', data.result)
            $('#modalInfo').html(html);
            $("#chapterModal").modal();

            //处理表单提交
            $('#addOreditBtn').click(function () {
              $('#lessonForm').ajaxSubmit({
                type: 'post',
                url: '/api/course/chapter/modify',
                dataType: 'json',
                data: {ct_cs_id: csId,ct_id:ctId},
                success: function (data) {
                  //console.log(data)
                  if (data.code == 200) {
                    location.reload();
                  }
                }
              });
            });
          }
        })
      })

    }
  });
})