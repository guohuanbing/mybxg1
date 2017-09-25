define(['jquery','cookie'], function ($) {
  $('#loginBtn').on('click', function () {
    $.ajax({
      type:'post',
      url:'/api/login',
      data:$("#loginForm").serialize(),
      dataType:'json',
      success: function (data) {
        console.log(data)
        //登陆成功
        if(data.code == 200){
          $.cookie('loginInfo',JSON.stringify(data.result),{
            path:'/'
          })
          location.href = '/main/index';
        }
      }
    });

    //阻止刷新但是不阻止冒泡
    return false
  })
});