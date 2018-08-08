/**
 * ProxyServer GUI test#1
 * 
 * @author byzz
 */
const http		= require('http')
	, ip				= require('ip')
	, url			 = require('url')
	, httpProxy = require('http-proxy')
	, proxy		 = httpProxy.createProxyServer({})
	, colors		= require('colors/safe');

const HOST_IP = ip.address();
const MIRROR_HOST = '192.168.50.5';
const LISTEN_PORT = 8722;
const VERSION = '1.2';
const REGEX_EXCEPT_DOMAINS = /^(?:(?:(?!adn|ads|static|upload|upload2|kstatic|img|fnt|pds)[\w\d-]+)\.)?inven\.co\.kr$/i;

/**
 * Capture sitename
 * 
 * @param String site 
 * @return String
 */
const captureSite = (site) => {
	let matches = String(site).match(/^https?:\/\/([\w_-]+).inven.co.kr/i);

	if (matches instanceof Array && matches.length > 0) {
		return matches[1];
	} else {
		return 'www';
	}
};

proxy.on('proxyReq', (proxyReq, req, res, options) => {
	let target = url.parse(req.url);

	if (REGEX_EXCEPT_DOMAINS.test(target.host)) {
		proxyReq.setHeader('X-Special-Inven-Header', `iProxy@${VERSION} <${HOST_IP}>`);
		// ipcRenderer.send('proxy', {
		//	 type: 'log',
		//	 params: [` iProxy@${VERSION} ${colors.yellow(req.method)} ${colors.green(captureSite(req.url))} ${proxyReq.path} ${colors.cyan(req.connection.remoteAddress)}`]
		// });
		process.send(` iProxy@${VERSION} ${colors.yellow(req.method)} ${colors.green(captureSite(req.url))} ${proxyReq.path} ${colors.cyan(req.connection.remoteAddress)}`);
	}
});

proxy.on('error', (err, req, res) => {
	if (! res.headersSent) {
		res.writeHead(500);
	}
	
	res.end();
});

http.createServer((req, res) => {
	let target = url.parse(req.url);

	if (REGEX_EXCEPT_DOMAINS.test(target.host)) {
		target.host = MIRROR_HOST;
	}

	proxy.web(req, res, {
		target: target.protocol + '//' + target.host
	});
}).listen(LISTEN_PORT, HOST_IP);

process.on('message', message => {
});