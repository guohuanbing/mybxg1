define(['jquery', 'template', 'util', 'uploadify', 'jcrop','form'], function ($, template, util) {
  //设置导航菜单
  util.setMenu('/course/add');
  var csId = util.qs('cs_id');

  //查询封面信息
  $.ajax({
    type: 'get',
    url: '/api/course/picture',
    data: {cs_id: csId},
    dataType: 'json',
    success: function (data) {
      console.log(data)
      //解析数据
      var html = template('pictureTpl', data.result);
      $("#pictureInfo").html(html);
      //处理图片上传
      $("#myfile").uploadify({
        width: 80,
        height: 'auto',
        itemTemplate: '<span></span>',
        buttonText: '请选择图片',
        buttonClass: 'btn btn-success btn-sm',
        swf: '/public/assets/uploadify/uploadify.swf',
        uploader: '/api/uploader/cover',
        fileObjName: 'cs_cover_original',
        formData: {cs_id: csId},
        onUploadSuccess: function (a, data) {
          //console.log(data)
          var obj = JSON.parse(data)
          $(".preview img").attr('src', obj.result.path)
          location.render
        }
      });
      var img = $(".preview img");
      //图片裁切
      $("#cropBtn").click(function () {
        var flag = $(this).attr('data-flag');
        if (flag) {
          //提交页面
          $("#cropForm").ajaxSubmit({
            type:'post',
            url:'/api/course/update/picture',
            data:{cs_id:csId},
            dataType:'json',
            success: function (data) {
              //console.log(data)
              if(data.code ==200){
                location.href = '/course/lesson?cs_id='+data.result.cs_id;
              }
            }
          })
        } else {
          //第一次点击
          $(this).text('保存图片').attr('data-flag', true);
          cropImage();
        }
      });

      function cropImage() {
        img.Jcrop({
          aspectRatio: 2,
        }, function () {
          //缩略图
          this.initComponent('Thumbnailer', {width: 240, height: 120,mythumb:'.thumb'});

          var width = this.ui.stage.width;
          var height = this.ui.stage.height;

          //计算选中区域的数据
          var x = 0;
          var y = (height - width/2)/2;
          var w = width;
          var h = width/2;

          //创建选区
          this.newSelection();
          this.setSelect([x,y,w,h]);
        });

      }


      //监控选区的变化
      img.parent().on('cropstart cropmove cropend', function (a,b,c) {
        var aInput = $("#cropForm").find('input');
        console.log(c)
        aInput.eq(0).val(c.x)
        aInput.eq(1).val(c.y)
        aInput.eq(2).val(c.w)
        aInput.eq(3).val(c.h)
      });

    }
  });

})