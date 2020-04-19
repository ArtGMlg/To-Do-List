function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

$('body').css('background', 'url("./img/'+ randomInteger(1, 11) + '.jpg") center/cover fixed');

$('.login-form').css({
  'padding-top': ($(window).height() - $('.login-form').height())/2 - 70 + "px",
  'opacity': '1'
});

