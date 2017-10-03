define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'], function ($,template,CKEDITOR) {
  $.ajax({
    type:'get',
    url:'/api/teacher/profile',
    dataType:'json',
    success: function (data) {
      //console.log(data)
      var html = template('settingsTpl',data.result)
      $("#settingsInfo").html(html)

      //头像上传处理插件
      $("#upfile").uploadify({
        //处理参数
        width:120,
        height:120,
        buttonText:'',
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/avatar',
        fileObjName:'tc_avatar',
        onUploadSuccess: function (a,b) {
          var obj = JSON.parse(b);
          $(".preview img").attr('src',obj.result.path);
        }
      });

      //省市区三级联动插件
      $("#pcd").region({
        url:'/public/assets/jquery-region/region.json'
      })


      //处理富文本
      CKEDITOR.replace('editor')

      //处理表单提交
      $("#settingsForm").validate({
        sendForm:false,
        valid: function () {
          var hometown = '';
          var p = $("#p").find("option:selected").text();
          var c = $("#c").find("option:selected").text();
          var d = $("#d").find("option:selected").text();
          hometown += p + '|' + c + '|' + d;
          console.log(hometown)

          //更新富文本
          for(var instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
          }
          $(this).ajaxSubmit({
            type:'post',
            url:'/api/teacher/modify',
            dataType:'json',
            data:{tc_hometown : hometown},
            success: function (data) {
              console.log(data)
              if(data.code = 200){
                location.reload();
              }
            }
          })
        }
      })
    }
  });
});
