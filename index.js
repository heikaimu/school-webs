const fs = require('fs');

fs.readdir('./webs', function (err, buffer) {

  fs.writeFile('./webs/index.html', template(buffer), {}, (err) => {
    if (err) throw err;
    console.log('保存成功');
  })
});

function template(links) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      a {
        font-size: 16px;
        color: #333333;
        text-decoration: none;
        line-height: 1.6;
      }

      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    ${links.map(name => {
      const url = 'https://school-webs.netlify.app/' + name + '/index.html';
      return '<a href="' + url + '">' + name + '</a>'
    }).join('</br>')}
  </body>
  </html>
  `
}
