var http = require('http');

/* http.createServer([function])
 * 用于创建服务器对象，返回 http.server 类对象
 * 返回的服务器对象同时是 EventEmitter 类对象，绑定有 request 事件
 * 传入的函数即为 request 事件处理程序
 * 实为以下代码的简写形式
--------------------------------------------
var server = http.createServer();
server.on('request', function(req, res) {});
--------------------------------------------
 */
 /* function(req, res) {}
  * req 是一个 http.IncomingMessage 类对象
  * 对于服务器而言，req 是可读流
------------------------------------------
  * res 是一个 http.ServerResponse 类对象
  * 对于服务器而言，res 是可写流
------------------------------------------
  * res.writeHead(statusCode[, statusMessage][, headers])
  * statusCode 为状态码 (数字)
  * statusMessage 为状态码描述 (字符串)
  * headers 为响应头 (对象)
  */
var server = http.createServer(function(req, res) {
	console.log(req.headers);  // 返回请求头 (对象)
	console.log(req.method);  // 返回请求方法 (字符串)
	console.log(req.url); // 返回 URL (字符串)，仅包含实际请求的 URL，本例中为：'/'

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});  // 设置响应头
	res.write('<html>');
	res.write('<body>');
	res.write('<h1>Hello, World!</h1>');
	res.write('</body>');
	res.write('</html>');  // 设置响应主体
	res.end();  // 表示完成响应头、响应主体的发送
});

/* server.listen([port][, hostname][, backlog][, callback])
 * port 为端口 (数字)
----------------------------------------------
 * hostname 为主机名(或 IP 地址) (字符串)
 * 若不设置 hostname，则其为 localhost，其对应的 IP 地址在电脑 hosts 文件中有定义，对于 windows，一般为 '127.0.0.1'
 * 可设置为 ipconfig 中的本地 ip 地址，就可以用其他设备访问 server 了
----------------------------------------------
 * backlog 为等待连接队列的最大长度 (数字)
 * callback 函数为 listening 事件的事件处理程序
 */
server.listen(8888, '10.182.172.130');  //10.182.172.130
console.log('server started');