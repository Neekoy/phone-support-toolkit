<?php
session_start();
if (($_POST['domainname']) != "") {
    $_SESSION['domainname'] = $_POST['domainname'];

    $_SESSION['domainip'] = gethostbyname($_SESSION['domainname']);
}
?>
<html>
<head>

<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="stylesheet.css">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

</head>
<body class="body">
<script type="text/javascript" src="box_constructor.js"></script>
<script type="text/javascript" src="leftmenu.js"></script>

<div class="topmenu">
<div class="container">
	<div class="row">
        <form method="post" action="">
        <div class="col-sm-4 col-sm-offset-4">
            <div id="imaginary_container">
                <div class="input-group stylish-input-group">
                    <input name="domainname" type="text" class="form-control"  placeholder="Domain name...">
                    <span class="input-group-addon">
                        <button type="submit">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            </div>
        </div>
        </form>
	</div>
</div>
</div>

<div class="logo">
<img style='margin-top: 2px; margin-left: 2px;' src="images/logosmall.png" height="80">
</div>

<div id="header"></div>

<div class="leftmenu">
</div>

<?php
echo "<div class='lookupinfo'>";
  echo "<div class='lookuprow'>";
    echo "<div class='lookupnarrow'>";
      echo "Domain name: ";
    echo "</div>";
      echo $_SESSION['domainname'];
  echo "</div>";
  echo "<div class='lookuprow'>";
    echo "<div class='lookupnarrow'>";
      echo "A record: ";
    echo "</div>";
    echo $_SESSION['domainip'];
  echo "</div>";
echo "</div>";

?>

<script>
$(document).ready(function() {
  $(".lookuprow").animate({
//    width: '40%'
  }, 500);
});

</script>

</body>
</html>
