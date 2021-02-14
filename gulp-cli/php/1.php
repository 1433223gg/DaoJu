<?php
    // 允许任何来源
    header("Access-Control-Allow-Origin:*");
    // header("Content-type:text/html;charset=utf8");

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $pre_phone = $_REQUEST['pre_phone'];
    $phone = $_REQUEST['phone'];
    $ident_num = $_REQUEST['ident_num'];

    echo '{"err":0,"msg":"账号或密码错误"}';

    // $Fname = "user_message.json";
    // if()

?>