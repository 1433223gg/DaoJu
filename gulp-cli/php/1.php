<?php
    // 允许任何来源
    header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=utf8");

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $pre_phone = $_REQUEST['pre_phone'];
    $phone = $_REQUEST['phone'];
    $ident_num = $_REQUEST['ident_num'];

    // 拼装json
    $arr = array('username'=>$username,'password'=>$password,'pre_phone'=>$pre_phone,'phone'=>$phone,'ident_num'=>$ident_num);
    // 进行json编码
    // echo json_encode($arr,JSON_UNESCAPED_UNICODE); 

    // echo '{"err":0,"msg":"账号或密码错误"}';
    // $prejson = json_encode($arr,JSON_UNESCAPED_UNICODE);

    $Fname = "../data/user_message.json";
    $Json = file_get_contents($Fname);
    $Json = json_decode($Json);
    print_r ($arr);
    print_r ($Json);

    // 创建一个二维数组
    $Jcontents = array();
    // 遍历之前的数据加入数组
    foreach($Json as $value){
        array_push($Jcontents,$value);
    }
    // 将当前数据加入数组
    array_push($Jcontents,$arr);

    // 将二维数组转为json数据
    $Jcontents = json_encode($Jcontents,JSON_UNESCAPED_UNICODE);

    // print_r ($Json);

    //以读写方式打写指定文件，如果文件不存则创建
    if(($JRes=fopen ($Fname,"w+")) === FALSE){
        echo("创建可写文件：".$Fname."失败");
        exit();
    }
    echo ("创建可写文件".$Fname."成功！</br>");
    
    if(!fwrite ($JRes,$Jcontents)){ //将信息写入文件
        echo ("尝试向文件".$Fname."写入".$Jcontents."失败！");
        fclose($JRes);
        exit();
    }
    echo ("尝试向文件".$Fname."写入".$Jcontents."成功！");

    fclose ($JRes);
?>