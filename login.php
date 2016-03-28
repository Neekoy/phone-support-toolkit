<?php
if (isset ($_POST['loginbut'])) {
  require("admin/config.php");

  $conn = mysqli_connect($host, $username, $password, $database);

  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }

  $username=$_POST['username'];
  $password=$_POST['password'];

  $username = stripslashes($username);
  $password = stripslashes($password);
  $username = mysqli_real_escape_string($conn, $_POST['username']);
  $password = mysqli_real_escape_string($conn, $_POST['password']);

  $userq = "SELECT * FROM `st_users` WHERE username='$username'";
  $user = $conn->query($userq);

  if (mysqli_fetch_array($user) == null) {
    $phperror = "WrongUser";
  }
  else {

  $passq="SELECT `password` FROM `st_users` WHERE username='$username'";
  $pass=$conn->query($passq);

  $pass = array_values(mysqli_fetch_array($pass))[0];

  if ($pass == md5($password)) {
//    session_save_path("/var/sites/t/tools.codelogs.net/sessions");
    session_start();
    $_SESSION['username'] = $_POST['username'];
    header("Location: index.php");
    exit();
  }
  else {
    $phperror = "WrongPass";
  }

  }

  $conn->close();

}
?>
<html>
<head>

<link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.019/css/hack-extended.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="login.css">

<link href='https://fonts.googleapis.com/css?family=Syncopate:400,700' rel='stylesheet' type='text/css'>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

</head>
<body class="body">

<form method="post" action="">
<div class="container">
  <div style="height: 250px;">
    <div class="logo col-sm-4 col-sm-offset-4">PARAGON</div>
    <div class="logosmall col-sm-4 col-sm-offset-4">toolk|ttY</div>
    <div class="errors col-sm-6 col-sm-offset-3">
    </div>
  </div>
  <div class="form-group col-sm-4 col-sm-offset-4">
    <label for="usr">Username:</label>
    <input name="username" type="text" class="form-control" id="usr">
  </div>
  <div class="form-group col-sm-4 col-sm-offset-4">
    <label for="pwd">Password:</label>
    <input name="password" type="password" class="form-control" id="pwd">
  </div>
  <div class="col-sm-4 col-sm-offset-4" style="margin-top: 10px;">
    <button name="loginbut" type="submit" class="btn btn-primary btn-block">Log in</button>
    <button type="submit" class="btn btn-default btn-block">Forgotten password</button>
  </div>
</div>
</form>


<script>
  var error = "<?php echo $phperror; ?>";
  if (error == "WrongUser") {
    $(".errors").append('<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Invalid username.</strong> The user that you entered doesn\'t exist in our database.</div>');
  }
  else if (error == "WrongPass") {
    $(".errors").append('<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Wrong password.</strong> The password you entered is incorrect.</div>');
  };
</script>

</body>
</html>
