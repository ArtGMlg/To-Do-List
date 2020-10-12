var express = require('express');
var router = express.Router();
var fs = require('fs');
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
    auth: { user: 'to-do-list-report-email@inbox.ru', pass: 'rEvOOP36odo)' },
    tls: { rejectUnauthorized: false }
  });

  mailTransport.sendMail({
    from: 'to-do-list-report-email@inbox.ru',
    to: 'to-do-list-report-email@inbox.ru',
    subject: req.body.subject,
    html: req.body.text + '<br><hr><i>Отчёт отправлен пользователем: </i> <u>' + req.body.name + '</u> <mark>' + req.body.from + '</mark>'
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).jsonp({});
    }
  });

});

router.post('/send/sendNewEmail', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.contentType('json');
  res.setHeader('Content-Type', 'application/json');

  var data = JSON.parse(fs.readFileSync('data.json'),'utf8');

  var num = Math.floor(100000 + Math.random() * 900000);

  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].email === req.body.email) {
      res.status(500).send(JSON.stringify({success: false, message: 'Данный электронный адрес уже используется!'}));
      return;
    }else if (data.users[i].email === req.body.id) {
      data.users[i].num = num;
      data.users[i].newMail = req.body.email;
      fs.writeFile('data.json', JSON.stringify(data, null, 4), function () {});
      break;
    }
  }
  const mailTransport = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    secure: true,
    port: 465,
    auth: { user: 'to-do-list-account-confirmation@inbox.ru', pass: 'YytPryISm(21' },
    tls: { rejectUnauthorized: false }
  });
  mailTransport.sendMail({
    from: 'Ежедневник <to-do-list-account-confirmation@inbox.ru>',
    to: req.body.email,
    subject: 'Подтверждение электронного адреса',
    html: '<!DOCTYPE html>'+
          '<html lang="ru">'+
          '<head>'+
            '<meta charset="utf-8">'+
            '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
            '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'+
            '<style type="text/css">'+
              '@media screen and (max-width: 820px){'+
                '.table700{'+
                'width: auto;'+
                '}'+
              '}'+
            '</style>'+
          '</head>'+
          '<body>'+
            '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: url(\'https://i.ibb.co/WzQjrxn/bgblur.jpg\') center/cover no-repeat;color: #343a40; min-width: 320px; line-height: normal;font-family: sans-serif;">'+
              '<thead>'+
                '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
              '</thead>'+
              '<tbody>'+
               '<tr>'+
                  '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                  '<td align="center" valign="top">'+
                    '<table cellpadding="0" cellspacing="0" border="0" width="700" class="table700" style="max-width: 700px; min-width: 320px; font-size: 19px;background: #ffffffa6!important;border-radius: 16px;color: #343a40;">'+
                      '<thead>'+
                        '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
                      '</thead>'+
                      '<tbody>'+
                        '<tr>'+
                          '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                          '<td>'+
                            '<table style="color: #343a40;">'+
                              '<tr>'+
                                '<td align="center" valign="top">'+
                                  '<h1 style="color: #343a40;!important">Привет!</h1>'+
                                  '<img src="https://e.unicode-table.com/orig/80/51c215e856236b002432e133a052b1.png">'+
                                  '<hr style="border-color: #4c453a;!important">'+
                                '</td>'+
                              '</tr>'+
                              '<tr>'+
                                '<td align="left">'+
                                  '<p style="color: #343a40;!important">Переезд это всегда непросто, но мы очень рады, что Вы предоставляете нам Ваш актуальный адрес электронной почты. </p>'+
                                  '<div style="display: inline;color: #343a40;!important">Чтобы подтвердить Ваш новый адрес, пожалуйста, введите вот этот код на странице пользователя </div>'+
                                  '<div style="display: inline-block;background-color: #756c37!important;padding: 5px;font-size: 20px;border-radius: 0.6rem;font-weight: bold;color: #f8f9fa!important;">'+ num +'</div>'+
                                  '<p style="color: #343a40;!important">Если это письмо пришло к Вам по ошибке, то просто проигнорируйте его.</p>'+
                                '</td>'+
                              '</tr>'+
                              '<tr>'+
                                '<td align="center">'+
                                  '<div style="color: #6c757d!important;border-top-width: 2px;border-top-style: dashed;border-top-color: #6c757d!important;padding-top: 30px;">Это письмо отправлено автоматически, не нужно на него отвечать.</div>'+
                                '</td>'+
                              '</tr>'+
                            '</table>'+
                          '</td>'+
                          '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                        '</tr>'+
                      '</tbody>'+
                      '<tfoot>'+
                        '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
                      '</tfoot>'+
                    '</table>'+
                  '</td>'+
                  '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                '</tr>'+
              '</tbody>'+
              '<tfoot>'+
                '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
              '</tfoot>'+
            '</table>'+
          '</body>'+
          '</html>'
  }, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      res.send(JSON.stringify({success: true}));
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
    from: 'Ежедневник <to-do-list-account-confirmation@inbox.ru>',
    to: req.body.email,
    subject: 'Подтверждение e-mail адреса.',
    html: '<!DOCTYPE html>'+
          '<html lang="ru">'+
          '<head>'+
            '<meta charset="utf-8">'+
            '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
            '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'+
            '<style type="text/css">'+
              '@media screen and (max-width: 820px){'+
                '.table700{'+
                'width: auto;'+
                '}'+
              '}'+
            '</style>'+
          '</head>'+
          '<body>'+
            '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: url(\'https://i.ibb.co/WzQjrxn/bgblur.jpg\') center/cover no-repeat;color: #343a40; min-width: 320px; line-height: normal;font-family: sans-serif;">'+
              '<thead>'+
                '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
              '</thead>'+
              '<tbody>'+
               '<tr>'+
                  '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                  '<td align="center" valign="top">'+
                    '<table cellpadding="0" cellspacing="0" border="0" width="700" class="table700" style="max-width: 700px; min-width: 320px; font-size: 19px;background: #ffffffa6;border-radius: 16px;color: #343a40;">'+
                      '<thead>'+
                        '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
                      '</thead>'+
                      '<tbody>'+
                        '<tr>'+
                          '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                          '<td>'+
                            '<table style="color: #343a40;">'+
                              '<tr>'+
                                '<td align="center" valign="top">'+
                                  '<h1 style="color: #343a40;">Привет!</h1>'+
                                  '<h3 style="color: #343a40;">Мы рады, что Вы теперь с нами!</h3>'+
                                  '<img src="https://e.unicode-table.com/orig/9d/06b3d41f3626ac01b0123ed450e97a.png">'+
                                  '<hr style="border-color: #4c453a;">'+
                                '</td>'+
                              '</tr>'+
                              '<tr>'+
                                '<td align="left">'+
                                  '<p style="color: #343a40;">Но для начала Вам нужно подтвердить свой e-mail адрес.</p>'+
                                  '<div style="display: inline;color: #343a40;">Для этого введите вот этот код </div>'+
                                  '<div id="code" style="display: inline-block;background-color: #e3ae3a;padding: 5px;font-size: 20px;border-radius: 0.6rem;font-weight: bold;color: #f8f9fa;">'+ req.body.num +'</div>'+
                                  '<div style="display: inline;color: #343a40;"> на странице регистрации, чтобы мы могли убедиться в том, что этот почтовый адрес принадлежит именно Вам.</div>'+
                                  '<p>Если это сообщение пришло к Вам по ошибке и Вы не регистрировались на нашем сайте, то просто проигнорируйте это письмо.</p>'+
                                '</td>'+
                              '</tr>'+
                              '<tr>'+
                                '<td align="center">'+
                                  '<div style="color: #6c757d;border-top-width: 2px;border-top-style: dashed;border-top-color: #6c757d;padding-top: 30px;">Это письмо отправлено автоматически, не нужно на него отвечать.</div>'+
                                '</td>'+
                              '</tr>'+
                            '</table>'+
                          '</td>'+
                          '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                        '</tr>'+
                      '</tbody>'+
                      '<tfoot>'+
                        '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
                      '</tfoot>'+
                    '</table>'+
                  '</td>'+
                  '<td style="width: 3rem; max-width: 3rem; min-width: 3rem;"></td>'+
                '</tr>'+
              '</tbody>'+
              '<tfoot>'+
                '<tr style="height: 3rem; max-height: 3rem; min-height: 3rem;"></tr>'+
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