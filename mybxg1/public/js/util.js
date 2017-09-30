define(['jquery'], function ($) {
  return {
    qs: function (key) {
      var param = location.search.substr(1)
      //console.log(param)//tc_id=2
      var tcId = null
      //判断是否存在
      if (param) {
        //分割
        var ps = param.split('&')//如果不止一个参数//tc_id=2  flag=123
        //遍历数组
        $.each(ps, function (i, item) {
          //console.log(item)//tc_id=2 flag=123
          //分割
          var kv = item.split('=')//tc_id 2 flag 123 数组
          if (kv[0] == key) {
            tcId = kv[1]
            return false//终止循环
          }

        })
      }
      return tcId
    }
  }
})