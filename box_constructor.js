$(document).ready(function() {
    class box {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    }
    boxOne = new box(100, 100);
//    var $div = $("<div>", {id: "box", class: "box", width:boxOne.width, height:boxOne.height});
//    $("#header").append($div);
    console.log(boxOne.height);

    $(function() {
      $("#box").draggable();
    });
});
