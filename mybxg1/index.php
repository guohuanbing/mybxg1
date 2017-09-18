<?php
  header('content-type:text/html; charset=utf8;');
//  include('./header.html');
//  echo '<div>主页</div>';
//  include('./footer.html');
//  include('./views/main/index.html')

//  var_dump($_SERVER);

//默认目录名称
  $dir = 'main';
//默认文件名称
  $filename = 'index';
  //判断有没有路径
  if(array_key_exists('PATH_INFO',$_SERVER)){
    //路径存在
    //请求路径
      $path = $_SERVER['PATH_INFO'];//  /main/index
    //截取字符串
      $str = substr($path,1);  //  main/index
    //分割开
      $ret = explode('/',$str);
    //分成两个，用count方法判断长度
    if(count($ret) == 2){
    //两层路径
    //覆盖默认路径
    $dir = $ret[0];
    //默认目录
    $filename = $ret[1];
    }else{
    //其他情况统一跳转登陆页面
    $filename = 'login';
    }
  }
  //拼接路径,嵌入子页面
      include('./views/'.$dir.'/'.$filename.'.html');

?>