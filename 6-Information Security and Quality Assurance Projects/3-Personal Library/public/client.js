$( document ).ready(function() {
  var items = [];
  var itemsRaw = [];
  
  $.getJSON('/api/books', function(data) {
    itemsRaw = data;
    $.each(data, function(i, val) {
      items.push('<li class="bookItem" id="' + i + '"><i class="fa fa-book" aria-hidden="true"></i><span class="bookTitle">' + val.title + '</span>' +' - ' + val.commentcount  +' comments' + '</li>');
      return ( i !== 14 );
    });
    if (items.length >= 15) {
      items.push('<p>...and '+ (data.length - 15)+' more!</p>');
    }
    $('<ul/>', {
      'class': 'listWrapper',
      html: items.join('')
      }).appendTo('#display');
  });
  
  var comments = [];
  $('#display').on('click','li.bookItem',function() {
    $("#detailTitle").html('<span class="bookTitleMain">'+itemsRaw[this.id].title+'</span><br><span class="idMain"> (id: '+itemsRaw[this.id]._id+'</span>)');
    $.getJSON('/api/books/'+itemsRaw[this.id]._id, function(data) {
      comments = [];
      $.each(data.comments, function(i, val) {        
        comments.push('<li>' +val+ '</li>');
      });
      comments.push('<br><form id="newCommentForm"><input type="text" class="form-control" id="commentToAdd" name="comment" placeholder="New Comment"></form>');
      comments.push('<div class="bookButtons"><button class="btn btn-info addComment" id="'+ data._id+'">Add Comment</button>');
      comments.push('<button class="btn btn-danger deleteBook" id="'+ data._id+'">Delete this Book</button></div>');
      $('#detailComments').html(comments.join(''));
    });
  });
  
  $('#bookDetail').on('click','button.deleteBook',function() {
    $.ajax({
      url: '/api/books/'+this.id,
      type: 'delete',
      success: function(data) {
        //update list
        $('#detailComments').html('<p style="color: red;">'+data+'<p><p><a href="" id="refresh">Refresh the page</a></p>');        
      }
    });
  });
  
  $('#bookDetail').on('click','#refresh',function() {
    window.location.reload(true);
  });  
  
  $('#bookDetail').on('click','button.addComment',function() {
    var newComment = $('#commentToAdd').val();
    $.ajax({
      url: '/api/books/'+this.id,
      type: 'post',
      dataType: 'json',
      data: $('#newCommentForm').serialize(),
      success: function(data) {
        console.log(data);
        $('#commentMessage').html(data); 
        comments.unshift(newComment); //adds new comment to top of list
        $('#detailComments').html(comments.join(''));
      }
    });
  });
  
  $('#newBook').click(function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/books',
      type: 'post',
      dataType: 'json',
      data: $('#newBookForm').serialize(),
      success: function(data) {
        if (data.message == "No title submitted") {
          $('#message').html(data.message);  
        } else {
          window.location.reload(true);
        }
      }
    });
  });
  
  $('#deleteAllBooks').click(function() {
    $.ajax({
      url: '/api/books',
      type: 'delete',
      //dataType: 'json',
      //data: $('#newBookForm').serialize(),
      success: function(data) {
        //update list 
        $('#deleteMessage').text(data);
        window.location.reload(true);        
      }
    });
  }); 
  
});

