define(['jquery','template','util','validate','form'], function ($,template,util) {
  util.setMenu('/course/add');
  //获取地址栏中的课程ID
  var csId = util.qs('cs_id');
  //找到地址栏中的标记
  var flag = util.qs('flag');
  //console.log(csId)
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
      //console.log(data)
      var html = template('basicTpl',data.result)
      $("#basicInfo").html(html)
      $("#firstType").change(function () {
        var pid = $(this).val();
        $.ajax({
          type:'get',
          url:'/api/category/child',
          data:{cg_id:pid},
          dataType:'json',
          success: function (data) {
            console.log(data)
            var tpl = '<select name="" class="form-control input-sm"><option value="">请选择二级分类...</option>{{each list}} <option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}} </select>';
            var html = template.render(tpl,{list:data.result});
            console.log(html)
            $("#secondType").html(html)
          }
        })
      })

      //处理表单提交
      $("#basicForm").validate({
        sendForm:false,
        valid: function () {
          $(this).ajaxSubmit({
            type:'post',
            url:'/api/course/update/basic',
            data:{cs_id:csId},
            dataType:'json',
            success: function (data) {
              console.log(data)
              location.href = '/course/picture?cs_id='+data.result.cs_id;
            }
          })
        }
      })
    }
  })
})