define(['jquery', 'template', 'util', 'datepicker', 'language', 'validate', 'form'], function ($, template, util) {
  var tcId = util.qs('tc_id')
  console.log(tcId)
  if (tcId) {
    //编辑操作
    $.ajax({
      type: 'get',
      url: '/api/teacher/edit',
      data: {
        tc_id: tcId
      },
      dataType: 'json',
      success: function (data) {
        console.log(data)
        data.result.operate = '编辑讲师';
        var html = template('teacherTpl', data.result);
        $('#teacherInfo').html(html);
        submitForm('/api/teacher/update');
      }

    })
  } else {
    //添加操作
    var html = template('teacherTpl', {operate: '添加讲师'});
    $('#teacherInfo').html(html);
    submitForm('/api/teacher/add');
  }

  //插件实现表单提交功能
  function submitForm(url) {
    $("#teacherForm").validate({
      //阻止跳转
      sendForm: false,
      valid: function () {
        console.log('success')
        $(this).ajaxSubmit({
          url: url,
          dataType: 'json',
          success: function (data) {
            if (data.code == 200) {
              location.href = '/teacher/list';
            }
          }
        })
      },
      description: {
        tcName: {
          required: '用户名不能为空'
        },
        tcPass: {
          required: '密码不能为空',
          pattern: '必须为六位数字'
        },
        tcJoinDate: {
          required: '日期不能为空'
        }
      }

    })
  }


//  //提交表单函数
//  function submitForm(url){
//    $('#teacherBtn').click(function () {
//      $.ajax({
//        type:'post',
//        url:url,
//        data:$('#teacherForm').serialize(),
//        dataType:'json',
//        success: function (data) {
//          if(data.code == 200){
//            location.href = '/teacher/list';
//          }
//        }
//      })
//    })
//  };
});
