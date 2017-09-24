var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	switch(pathname) {
		case '/' :
			fs.readFile('./views/index.html', function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(data.toString());
				}
				res.end();
			});
			break;

		case '/public/js/custom.js' :
		  fs.readFile('./public/js/custom.js', function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/javascript'});
				} else {
					res.writeHead(200, {'Content-Type': 'text/javascript'});
					res.write(data.toString());
				}
				res.end();
			});
			break;
		case '/public/js/jquery-3.2.1.js' :
		  fs.readFile('./public/js/jquery-3.2.1.js', function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/javascript'});
				} else {
					res.writeHead(200, {'Content-Type': 'text/javascript'});
					res.write(data.toString());
				}
				res.end();
			});
			break;
		case '/public/js/bootstrap-3.3.7.js' :
		  fs.readFile('./public/js/bootstrap-3.3.7.js', function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/javascript'});
				} else {
					res.writeHead(200, {'Content-Type': 'text/javascript'});
					res.write(data.toString());
				}
				res.end();
			});
			break;
		case '/public/css/bootstrap-3.3.7.css' :
		  fs.readFile('./public/css/bootstrap-3.3.7.css', function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/css'});
				} else {
					res.writeHead(200, {'Content-Type': 'text/css'});
					res.write(data.toString());
				}
				res.end();
			});
			break;

/* req 是可读流，有 data，end 事件
 * data 事件处理程序接收的 chunk 是一个数据片段，一般为 Buffer 类型
 * Buffer.concat(body) 用于合并由一段段 chunk (Buffer 类型)构成的 body 数组
 * Buffer.concat() 返回 Buffer 类型
 * Buffer.concat().toString() 将 Buffer 类型转化为 string
---------------------------------------------------------
 * 最终的 body 即为 string 形式的 request 主体
 */
		case '/lib/provinceData.json' :
		  var body = [];
		  req.on('data', function(chunk) {
		  	body.push(chunk);
		  });
		  req.on('end', function() {
		  	body = Buffer.concat(body).toString();		  	
		  	var searchIndex = body.split('=')[1];
		  	console.log(searchIndex);

		  	fs.readFile('./lib/provinceData.json', function(err, data) {
					if (err) {
						res.writeHead(404, {'Content-Type': 'text/plain'});
					} else {
						res.writeHead(200, {'Content-Type': 'text/plain'});
						var json = data.toString();
						json = JSON.parse(json).filter(function(item) {
							if (searchIndex.charCodeAt() < 65 || searchIndex.charCodeAt() > 122) {
								searchIndex = querystring.unescape(searchIndex);
								return (item.name.indexOf(searchIndex) === 0);
							} else {
								var re = new RegExp(searchIndex, 'i');
								var match = re.exec(item.id);
								if (match === null) {
									return false;
								}
								return (match.index === 0);
							}
						});
						res.write(JSON.stringify(json));
					}
					res.end();
			  });
			});
			break;

    default :
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('not found');
	};
});

server.listen(8888, '192.168.1.89');

// var data = {};
			// if (index.charCodeAt() >= 65 && index.charCodeAt() >=122) {
			// 	data.id = index;
			// } else {
			// 	data.name = index;
			// }