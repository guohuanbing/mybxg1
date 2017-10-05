define(['jquery','template','util','uploadify'], function ($,template,util) {
  //设置导航菜单
  util.setMenu('/course/add');
  var csId = util.qs('cs_id');

  //查询封面信息
  $.ajax({
    type:'get',
    url:'/api/course/picture',
    data:{cs_id:csId},
    dataType:'json',
    success: function (data) {
      console.log(data)
      //解析数据
      var html = template('pictureTpl',data.result);
      $("#pictureInfo").html(html);
      //处理图片上传
      $("#myfile").uploadify({
        width:80,
        height:'auto',
        swf:'/public/assets/uploadify/uploadify.swf',
        uploader:'/api/uploader/cover',
        itemTemplate:'<span></span>',
        fileObjName:'cs_cover_original',
        buttonText:'请选择图片',
        buttonClass:'btn btn-success btn-sm',
        formData:{cs_id:csId},
        onUploadSuccess: function (a,data) {
          //console.log(data)
          var obj = JSON.parse(data)
          $(".preview img").attr('src',obj.result.path)
        }
      })
    }
  })
  
})