$(document).ready(function () {
  getNewQuote();
});

function getNewQuote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function (quoteResponse) {
      const tweetUrl =
      "https://twitter.com/intent/tweet?text=" + quoteResponse.quoteText;
      $("#text").html(
      "<i class='fas fa-quote-left'></i>  " +
      quoteResponse.quoteText +
      "  <i class='fas fa-quote-right'></i>");

      $("#tweet-quote").attr("href", tweetUrl);
      if (quoteResponse.quoteAuthor == "") {
        $("#author").html("Unknown");
      } else {
        $("#author").html(quoteResponse.quoteAuthor);
      }
    },
    error: function (quoteResponse) {
      $("#text").html(
      "Error. There was a problem getting a new quote.");

      console.log(quoteResponse.status);
    } });

}


