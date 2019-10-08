<?php
$dsn="mysql:host=localhost;charset=utf8;dbname=s1080102";
$pdo=new PDO($dsn,"s1080102","s1080102");

$curl = curl_init();

curl_setopt($curl,CURLOPT_USERAGENT,"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");

curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_URL,"https://od.cdc.gov.tw/eic/Dengue_Daily_last12m.json");

$result= curl_exec($curl);
curl_close($curl);

$json = json_decode($result,true);

// 找資料庫有沒有最後一筆公開資料
$last= $json[(count($json)-1)]['發病日'];
$sql="SELECT count(*) FROM `data` WHERE `發病日` = '$last'";
$chkUpdata=$pdo->query($sql)->fetchColumn();

$first=$json[0]['發病日'];
$sql="SELECT `發病日` FROM `data` WHERE `id`='1'";
$id1=$pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
if($first!=($id1['發病日'])){
    $nofirst=true;
}

// 沒有的話，格式化資料庫，再新增資料
if(!empty($result)){
    if($nofirst=true || $chkUpdata==0){
        $sql="TRUNCATE TABLE `data`";
        $pdo->exec($sql);
    updata();
    }
};

// 將資料印到datatable
$sql="SELECT * FROM `data`";
$row=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
$send=json_encode($row);
echo $send;



function updata(){
    global $json;
    global $pdo;
    for($i=0;$i<count($json);$i++){
        if(($json[$i]['年齡層'])=='5-9'){
            $age='05-09';
        }else if(strlen($json[$i]['年齡層'])<2){
            $age="0".$json[$i]['年齡層'];
        }else{
            $age=$json[$i]['年齡層'];
        }
    
        $city=($json[$i]['居住縣市']=="None")?"無資料":$json[$i]['居住縣市'];
        $country=($json[$i]['感染國家']=="None")?"無資料":$json[$i]['感染國家'];
        $blood=($json[$i]['血清型']=="None")?"無資料":$json[$i]['血清型'];
    
    
        $sql="insert into data(`發病日`,`通報日`,`性別`,`年齡層`,`居住縣市`,`感染國家`,`血清型`) values('". $json[$i]['發病日'] ."','". $json[$i]['通報日'] ."','". $json[$i]['性別'] ."','". $age ."','". $city ."','". $country ."','". $blood ."')";
        $pdo->exec($sql);
    } 
}


?>