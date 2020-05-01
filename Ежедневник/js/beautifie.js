function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
var response;
var background; 

doCORSRequest({
  method: 'GET',
  url: 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
  data: ''
}, function printResult(result) {
  response = result;
  background = "http://bing.com" + JSON.parse(response).images[0].url;
  $('body').css('background', 'url('+ background +') center/cover fixed');
  $('#loadingScreen').remove();
});

function doCORSRequest(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function() {
    printResult(
      (x.responseText || '')
    );
  };
  x.send(options.data);
}

$('.login-form').css({
  'padding-top': ($(window).height() - $('.login-form').height())/2 - 70 + "px",
  'opacity': '1'
});

