define(['jquery','template','util'], function ($,template,util) {
  util.setMenu('/course/add');
  //获取地址栏中的课程ID
  var csId = util.qs('cs_id');
  //找到地址栏中的标记
  var flag = util.qs('flag');
  console.log(csId)
  $.ajax({
    type:'get',
    url:'/api/course/basic',
    data:{cs_id : csId},
    dataType:'json',
    success: function (data) {
      //判断有没有标记，如果有是编辑课程
      if(flag){
        data.result.operate = '编辑课程'
      }else{
        //如果没有，是 添加课程
        data.result.operate = '添加课程'
      }
      console.log(data)
      var html = template('basicTpl',data.result)
      $("#basicInfo").html(html)
    }
  })
})