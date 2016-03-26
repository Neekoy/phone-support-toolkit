<?php session_start(); ?>

<html>
<head>

<link href='https://fonts.googleapis.com/css?family=Syncopate:400,700' rel='stylesheet' type='text/css'>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="stylesheet.css">

<link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.019/css/hack-extended.min.css">

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
        <form method="post" action="searchdomain.php">
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
<div class='textwrapper'>
<div class='logofont'>PARAGON</div>
<div class='logosmallfont col-sm-4 col-sm-offset-4'>toolkitty</div>
</div>
</div>

<div class="leftmenu">
</div>


<div id="header"></div>

</body>
</html>
