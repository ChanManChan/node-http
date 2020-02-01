const http = require('http');
const todos = [
  { id: 1, text: 'Todo One' },
  { id: 2, text: 'Todo Two' },
  { id: 3, text: 'Todo Three' }
];
const server = http.createServer((req, res) => {
  // const { headers, url, method } = req;
  // console.log(req);
  // console.log(req.method);
  // console.log(headers, url, method);
  // res.statusCode = 404;
  // res.setHeader('Content-Type', 'text/html');
  // res.setHeader('Content-Type', 'application/json');
  // below lets you know what kind of server it is like nginX or express
  // res.setHeader('X-Powered-By', 'Node.js');
  // res.write('<h1>Hello</h1>');
  // res.write('<h2>Hello Again</h2>');
  // res.writeHead(200, {
  //   'Content-Type': 'application/json',
  //   'X-Powered-By': 'Node.js'
  // });
  // console.log(req.headers.authorization);
  // Receiving req.body data within the our server, below code
  const { method, url } = req;
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null
      };

      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);
        if (!id || !text) {
          status = 400;
          response.error = 'Please add ID and text';
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }
      // console.log(body);
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
      });
      res.end(JSON.stringify(response));
    });
  // res.end(
  //   JSON.stringify({
  //     success: true,
  //     data: todos,
  //     error: null
  //   })
  // );
});
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
