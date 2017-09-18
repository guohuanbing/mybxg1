<?php
  header('content-type:text/html; charset=utf8;');
//  include('./header.html');
//  echo '<div>主页</div>';
//  include('./footer.html');
//  include('./views/main/index.html')

//  var_dump($_SERVER);
  $path = $_SERVER['PATH_INFO'];
  include('./views'.$path.'.html');

?>