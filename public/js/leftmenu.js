$(document).ready(function () {

var active = false;
var showdnsinfo = false;

$(".leftmenu").mouseenter(function () {

  if (active == false) {
  active = true;
  $(this).animate({
    width: "300px"
  }, 200);
  $(".leftmenu-vertical").fadeOut(100);
  $(".leftmenu-item").fadeIn();
  }

});

$(".leftmenu").mouseleave(function () {
  if (active == true) {
  active = false;
  $(this).animate({
    width: "50px"
  }, 200);
  
  $(".leftmenu-vertical").fadeIn();
  $(".leftmenu-item").fadeOut(100);

  }

});



$("div.leftmenu-item-text").mouseenter(function () {

  $(this).css('background-color', 'rgba(255, 255, 255, 0.3)')
  $(this).next().css('background-color', 'rgba(255, 255, 255, 0.3)')

});

$("div.leftmenu-item-text").mouseleave(function () {

  $(this).css('background-color', 'rgba(255, 255, 255, 0.1)')
  $(this).next().css('background-color', 'rgba(255, 255, 255, 0.1)')

});



$(".leftmenu-item-text").click(function () {
  
  if ( $(this).next().find('.glyphicon').hasClass('glyphicon-remove') ) {
    $(this).next().find('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok');
  }

  else {
    $(this).next().find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove');
  }

});

});

