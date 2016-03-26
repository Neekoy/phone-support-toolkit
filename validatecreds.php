<?php

//if (session_status() == PHP_SESSION_NONE) {

//    echo "session started";
//}
//else {
//  session_destroy();
//  session_start();
//  echo "session restarted";
//}

if (isset ($_POST['username']) && !empty($_POST['password'])) {

}
else {
  $_SESSION['errorez'] = "Incorrect usenrame or password";
  header('Location:http://tools.codelogs.net/login.php');
}
?>
