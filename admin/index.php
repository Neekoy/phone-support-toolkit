<?php
$name = "lala";
$elementName = "Name...";
?>

<html>
<head>

<link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.019/css/hack-extended.min.css">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<link rel="stylesheet" type="text/css" href="admincss.css">

</head>
<body>


<div class='editorUI' style="padding: 5px;">
<form method="post" action="element_constructor.php">

<div class="menu-explanation">Element name:</div>
<div class="input-group" style="width: 100%;">
  <input type="text" class="form-control" placeholder="Name" aria-describedby="basic-addon2">
</div>

<div class="menu-explanation">Size:</div>
<div class="input-group">
  <input type="text" class="form-control eleheight" placeholder="320" aria-describedby="basic-addon2">
  <span class="input-group-addon">x</span>
  <input type="text" class="form-control elewidth" placeholder="200" aria-describedby="basic-addon2">
</div>

<div class="menu-explanation">Orientation:</div>
<select class="form-control col-sm-2 col-sm-offset-0">
  <option>Left</option>
  <option>Center</option>
  <option>Right</option>
</select>

<div class="menu-explanation">Hint:</div>
<textarea class="span6" rows="3" placeholder="Example: Check if the domain has an A record." style="width: 100%; "required></textarea>

<div class="menu-explanation">How to:</div>
<textarea class="span6" rows="5" placeholder="Example: You can check that by typing 'dig a domain.com' in your terminal. You need to change 'domain.com' to the actual domain of the customer." style="width: 100%; "required></textarea>

</form>
</div>

<div class="test">
  <div class="testTop">There is no spoon. And some other words. Want to check if
  </div>
  <div class="testBot">Some more content because I need to check how this works too. Lala lala. Stuff and things and content much.
  </div>
</div>

<script>
    var $expanded = 0;
    $(".editorUI").draggable({
      containment: "window"
    });
    $(".test").draggable({
      containment: "window"
    });
    $(".test").resizable({
      stop: function( event, ui ) {
      eleheight = $(".test").height();
      elewidth = $(".test").width();
      $(".eleheight").val(eleheight);
      $(".elewidth").val(elewidth);
      }
    });
    $(".testTop").click(function() {
      if ($expanded == 0) {
        $(".testBot").animate({
          height: $(".testBot").get(0).scrollHeight+20
        }, 200);
        $expanded = 1;
        $(".testBot").css({"color": "black", "padding": "10px"});
      }
    });
</script>

</body>
</html>
