<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="header">
	<h1>Julpiano - en introduktion till cocktailpiano</h1>
</div>

<div style="overflow:auto">
  <div class="main">
    <h2>Tack f&ouml;r din best&auml;llning</h2>
    <p>
<?php
$bestId = rand(15234,89766);
if($_REQUEST['namn'] == "" || $_REQUEST['adress'] == "" || $_REQUEST['postnr'] == "" || $_REQUEST['postort'] == "" || $_REQUEST['email'] == "") {
  echo "Du m&aring;ste fylla i alla f&auml;lt. <br /><br /><a href=\"javascript:history.back()\">G&aring; tillbaka</a>";
}else{
  echo "Betala genom att swisha 195kr till 0767602393 och med meddelande: ".$bestId;
  $to      = 'johan.bouzi@gmail.com';
  $subject = 'Order from Julboken';
  $message = "Ny order: ".$bestId."

Namn: ".$_REQUEST['namn']."
Adress: ".$_REQUEST['adress']."
Postnr: ".$_REQUEST['postnr']."
Postort: ".$_REQUEST['postort']."
E-mail: ".$_REQUEST['email']."

End of Message";
  $headers = 'From: johan@cocktailpiano.se' . "\r\n" .
    'Reply-To: johan@cocktailpiano.se' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  if($_REQUEST['phone'] == "") {
    mail($to, $subject, $message, $headers);
  }
}
?>
    </p>
  </div>

</div>

</body>
</html>

