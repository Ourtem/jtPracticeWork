<?php
$dsn="mysql:host=localhost;charset=utf8;dbname=s1080102";
$pdo=new PDO($dsn,"s1080102","s1080102");

$title=(!empty($_POST['title']))?$_POST['title']:"1";
switch($title){
    case '1':
    $title=[];
    $str=[];
    $tmp=[];
    $sql="SELECT `年齡層` ,count(*) AS '計算' FROM `data` group BY `年齡層`ORDER by `年齡層`";
    $row=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    // print_r($row);
    foreach ($row as $key=>$val){
     $title[]=$val['年齡層'];
     $str[]=$val['計算'];
    }
    $sendPie=json_encode([$title,$str,'年齡層統計',1]);
    echo $sendPie;
    
    break;
    case '2':
    $title=[];
    $str=[];
    $tmp=[];
    $sql="SELECT `性別` ,count(*) AS '計算' FROM `data` group BY `性別`ORDER by `計算` DESC";
    $row=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    // print_r($row);
    foreach ($row as $key=>$val){
     $title[]=$val['性別'];
     $str[]=$val['計算'];
    }
    $sendPie=json_encode([$title,$str,'性別統計',2]);
    echo $sendPie;
    
    break;
    case '3':
    $title=[];
    $str=[];
    $color=[];
    $sql="SELECT `居住縣市` ,count(*) AS '計算' FROM `data` group BY `居住縣市`ORDER by `計算` DESC";
    $row=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    // print_r($row);
    foreach ($row as $key=>$val){
     $title[]=$val['居住縣市'];
     $str[]=$val['計算'];
    if($val['計算']==0){
        $tmp='#FFFBD2';
    }else if($val['計算']<6){
        $tmp='#F9D075';
    }else if($val['計算']<51){
        $tmp='#FF7D50';
    }else if($val['計算']<501){
        $tmp='#E81F1F';
    }else{
        $tmp='#840000';
    }
    $color[]=$tmp;
    }
    $sendPie=json_encode([$title,$str,'居住縣市統計',3,$color]);
    echo $sendPie;

    break;
    case '4':
    $title=[];
    $str=[];
    $tmp=[];
    $sql="SELECT `感染國家` ,count(*) AS '計算' FROM `data` group BY `感染國家`ORDER by `計算` DESC";
    $row=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    // print_r($row);
    foreach ($row as $key=>$val){
     $title[]=$val['感染國家'];
     $str[]=$val['計算'];
    }
    $sendPie=json_encode([$title,$str,'感染國家統計',4]);
    echo $sendPie;
    
    break;
    case '5':
    $title=[];
    $str=[];
    $tmp=[];
    $sql="SELECT `血清型` ,count(*) AS '計算' FROM `data` group BY `血清型`ORDER by `計算` DESC";
    $row=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    // print_r($row);
    foreach ($row as $key=>$val){
     $title[]=$val['血清型'];
     $str[]=$val['計算'];
    }
    $sendPie=json_encode([$title,$str,'血清型統計',5]);
    echo $sendPie;
    break;
}

?>