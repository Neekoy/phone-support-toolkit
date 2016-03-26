$(document).ready(function () {
var active = false;
$(".leftmenu").mouseenter(function () {
  if (active == false) {
  $(this).animate({
    width: "300px"
  }, 200);
  active = true;
  }
});
$(".leftmenu").mouseleave(function () {
  if (active == true) {
  $(this).animate({
    width: "50px"
  }, 200);
  active = false;
  }
});

});
