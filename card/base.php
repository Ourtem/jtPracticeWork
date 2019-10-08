<?php
$dsn="mysql:host=localhost;charset=utf8;dbname=s1080102";
$pdo=new PDO($dsn,"s1080102","s1080102");
$score=$_POST['score'];
$name=$_POST['name'];
$date=date("Y/m/d h:i:sa");
$sql="insert into rank(`name`,`score`,`date`) values('$name','$score','$date')";
$row=$pdo->exec($sql);
if($row==true){
    $sql="select * from rank order by score desc limit 5";
    $rows=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    echo"<tr><td colspan='4'><h3>".$name."得到<span style='margin:0;font-size:50px;color:rgb(255, 236, 130);'>".$score."</span>分</h3></td></tr>";
    foreach($rows as $key=>$val){
        $rank=$key+1;
        echo "<tr><td>$rank</td><td>".$val['date']."</td><td>".$val['name']."</td><td>".$val['score']."</td></tr>";
    }
}else{
    echo "Dang! That’s crazy! Oh my gosh! What ?! Whoa! No way! Really?";
}





?>