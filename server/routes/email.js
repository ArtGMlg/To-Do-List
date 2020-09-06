var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  const mailTransport = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    secure: true,
    port: 465,
    auth: { user: 'to-do-list-report-email@inbox.ru', pass: 'YekuYiPiU)11' },
    tls: { rejectUnauthorized: false }
  });

  console.log(req.body.name);

  mailTransport.sendMail({
    from: 'to-do-list-report-email@inbox.ru',
    to: 'to-do-list-report-email@inbox.ru',
    subject: req.body.subject,
    html: req.body.text + '<br><hr><i>Отчёт отправлен пользователем: </i> <u>' + req.body.name + '</u> <mark>' + req.body.from + '</mark>'
  }, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      res.end();
    }
  });

});

router.post('/send/confirmMail', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  const mailTransport = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    secure: true,
    port: 465,
    auth: { user: 'to-do-list-account-confirmation@inbox.ru', pass: 'YytPryISm(21' },
    tls: { rejectUnauthorized: false }
  });

  mailTransport.sendMail({
    from: 'to-do-list-account-confirmation@inbox.ru',
    to: req.body.email,
    subject: 'Подтверждение e-mail адреса.',
    html: '<!DOCTYPE html>'+
          '<html lang="ru">'+
          '<head>'+
            '<meta charset="utf-8">'+
            '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
            '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'+
            '<style type="text/css">'+
              '@import url(\'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap\');'+
              '.table700{'+
                'font-family: \'Ubuntu\', sans-serif;'+
              '}'+
              '@media screen and (max-width: 790px){'+
                '.table700{'+
                  'width: auto;'+
                '}'+
                'img{'+
                  'width: 70%!important'+
                '}'+
              '}'+
            '</style>'+
          '</head>'+
          '<body>'+
            '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: wheat;color: #4c453a; min-width: 320px; line-height: normal;border-radius: 1rem;">'+
              '<thead>'+
                '<tr style="height: 2rem; max-height: 2rem; min-height: 2rem;"></tr>'+
              '</thead>'+
              '<tbody>'+
                '<tr>'+
                  '<td style="width: 2rem; max-width: 2rem; min-width: 2rem;"></td>'+
                  '<td align="center" valign="top">'+
                    '<table cellpadding="0" cellspacing="0" border="0" width="700" class="table700" style="max-width: 700px; min-width: 320px; font-size: 1.1em;">'+
                      '<tr>'+
                        '<td align="center" valign="top">'+
                          '<h1>Привет!</h1>'+
                          '<h3>Мы рады, что Вы теперь с нами!</h3>'+
                          '<img style="width: 50%" src="https://i.ibb.co/y8BJ2q2/10-Smiling-Face-Blushing.webp">'+
                          '<hr style="border-color: #4c453a;">'+
                        '</td>'+
                      '</tr>'+
                      '<tr>'+
                        '<td align="left">'+
                          '<p>Но для начала Вам нужно подтвердить свой e-mail адрес.</p>'+
                          '<div style="display: inline;">Для этого введите вот этот код </div>'+
                          '<div style="display: inline-block;background-color: #597ca8;padding: 5px;font-size: 20px;border-radius: 0.6rem;font-weight: bold;color: wheat;">'+ req.body.num +'</div>'+
                          '<div style="display: inline;"> на странице регистрации, чтобы мы могли убедиться в том, что этот почтовый адрес принадлежит именно Вам.</div>'+
                          '<p>Если это сообщение пришло к Вам по ошибке, и Вы не регистрировались на нашем сайте, то просто проигнорируйте это письмо.</p>'+
                        '</td>'+
                      '</tr>'+
                      '<tr>'+
                        '<td align="center">'+
                          '<div style="color: #9b8d71;border-top-width: 2px;border-top-style: dashed;border-top-color: #9b8d71;padding-top: 30px;">Это письмо отправлено автоматически, не нужно на него отвечать.</div>'+
                        '</td>'+
                      '</tr>'+
                    '</table>'+
                  '</td>'+
                  '<td style="width: 2rem; max-width: 2rem; min-width: 2rem;"></td>'+
                '</tr>'+
              '</tbody>'+
              '<tfoot>'+
                '<tr style="height: 2rem; max-height: 2rem; min-height: 2rem;"></tr>'+
              '</tfoot>'+
            '</table>'+
          '</body>'+
          '</html>'
  }, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      res.end();
    }
  });

});

module.exports = router;