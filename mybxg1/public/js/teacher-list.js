define(['jquery','template','util','bootstrap','state'], function ($, template,util) {
  util.setMenu(location.pathname);

  $.ajax({
    type: 'get',
    url: '/api/teacher',
    dataType: 'json',
    success: function (data) {
      console.log(data)
      var html = template('teacherTpl', {list: data.result});
      $("#teacherInfo").html(html)

      //启用注销功能
      $(".eod").on('click', function () {
        var that = $(this)
        var td = $(this).closest('td')
        var tcId = td.attr('data-tcId')
        var tcStatus = td.attr('data-status')
        console.log(tcStatus)
        //发送请求，调用接口
        $.ajax({
          type: 'post',
          url: '/api/teacher/handle',
          data: {tc_id: tcId, tc_status: tcStatus},
          dataType: 'json',
          success: function (data) {
            console.log(data)
            if (data.code == 200) {
              td.attr('data-status', data.result.tc_status)
              if (data.result.tc_status == 0) {
                that.text('启用')
              } else {
                that.text('注销')
              }
            }
          }

        })
      })

      //查看教师信息
      $('.preview').on('click', function () {
        var td = $(this).closest('td')
        var tcId = td.attr('data-tcId')
        $.ajax({
          type:'get',
          url:'/api/teacher/view',
          data:{tc_id:tcId},
          dataType:'json',
          success: function (data) {
            console.log(data)
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html)
            $('#teacherModal').modal();
          }
        })
      })

    }
  });



})
