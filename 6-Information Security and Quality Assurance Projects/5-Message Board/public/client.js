$(function () {

  /*
   delete a thread function is called from two different URLs
   /b/:board and /b/:board/:thread
   Prepping 'url' for each
  */
  var referringPath = window.location.pathname; // get referring path
  var withoutTrailingSlash = referringPath.replace(/\/$/, ""); // remove possible trailing forward slash
  var numberOfSlashes = (withoutTrailingSlash).match(/\//ig) ? (withoutTrailingSlash).match(/\//ig).length : 0; // number of forward slashes (if check for inDec page)
  var currentBoard = withoutTrailingSlash.slice(3);
  var url;

  if (numberOfSlashes === 2) {
    url = "/api/threads/" + currentBoard;
  } else {
    currentBoard = currentBoard.split('/');
    url = "/api/threads/" + currentBoard[0];
  }

  // add new board
  $('#newBoardForm').submit(function (e) {
    $.ajax({
      url: '/newboard',
      type: 'post',
      data: $('#newBoardForm').serialize(),
      success: function (data) {
        //$('#newprojname').text(JSON.stringify(data));
        console.log(data);
        if (data.hasOwnProperty('message')) {
          $('#newboardname').html(data.message);
        } else {
          $('#newboardname').html("<strong>You have added a new board:</strong> " + data.board_title);
          window.location.reload(true);
        }
      }
    });
    e.preventDefault();
  });


  // add new thread
  $('#newThread').submit(function (e) {
    $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        window.location.reload(true);
      },
      error: function (data) {
        console.log("FRONT - newThread ", data);
      }
    });
    e.preventDefault();
  });



  // add new reply
  $('#newReply').submit(function (e) {
    $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        window.location.reload(true);
      },
      error: function (data) {
        console.log("FRONT - newReply ", data);
      }
    });
    e.preventDefault();
  });



  // delete a thread
  $('#boardDisplay').on('submit', '#deleteThread', function (e) {
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        if (data == "incorrect password") {
          alert(data);
          $(":input, #deleteThread")
            .not(":hidden, :submit")
            .val("");
        } else if (data == "success") {
          alert(data);
          if (numberOfSlashes == 2) {
            location.href = "/b/" + currentBoard;
          } else {
            location.href = "/b/" + currentBoard[0];
          }
        }
      }
    });
    e.preventDefault();
  });



  // delete a reply
  $('#boardDisplay').on('submit', '#deleteReply', function (e) {
    $.ajax({
      type: "DELETE",
      url: "/api/replies/" + currentBoard,
      data: $(this).serialize(),
      success: function (data) {
        if (data == "incorrect password") {
          alert(data);
          $(":input, #deleteReply")
            .not(":hidden, :submit")
            .val("");
        } else if (data == "success") {
          alert(data);
          window.location.reload(true);
        }
      }
    });
    e.preventDefault();
  });



  // report a thread
  $('#boardDisplay').on('submit', '#reportThread', function (e) {
    var url = "/api/threads/" + currentBoard;
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data)
      }
    });
    e.preventDefault();
  });



  // report a reply
  $('#boardDisplay').on('submit', '#reportReply', function (e) {
    var url = "/api/replies/" + currentBoard;
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data)
      }
    });
    e.preventDefault();
  });


  // open project reqs
  $("#dialog1").dialog({
    top: 100,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 100
    },
    hide: {
      effect: "blind",
      duration: 100
    },
    width: "90%",
    maxWidth: "768px"
  });

  $("#opener").on("click", function () {
    $("#dialog1").dialog("open");
  });

  // open project tests
  $("#dialog2").dialog({
    top: 100,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 100
    },
    hide: {
      effect: "blind",
      duration: 100
    },
    width: "90%",
    maxWidth: "768px"
  });

  $("#openTests").on("click", function () {
    $("#dialog2").dialog("open");
  });
}); // end function ()