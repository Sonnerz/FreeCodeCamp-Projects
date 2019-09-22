
$(function() {
  $("#testForm2").submit(function(e) {
    $.ajax({
      url: "/api/stock-prices",
      type: "get",
      data: $("#testForm2").serialize(),
      success: function(data) {
        $("#jsonResult2").text(JSON.stringify(data));
      }
    });
    e.preventDefault();
  });


  $("#testForm").submit(function(e) {
    $.ajax({
      url: "/api/stock-prices",
      type: "get",
      data: $("#testForm").serialize(),
      success: function(data) {
        $("#jsonResult").text(JSON.stringify(data));
      }
    });
    e.preventDefault();
  });


 $( "#dialog" ).dialog({
      top:100,
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 100
      },
      hide: {
        effect: "blind",
        duration: 100
      }
    });

    $("#opener").on( "click", function() {
      $("#dialog").dialog("open");
    });


});





 