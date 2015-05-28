/**
 * Created by jhorlin.dearmas on 5/21/2015.
 */
(function (require, process) {
    "use strict";
    var express = require('express'),
        url = require('url'),
        cookieParser = require('cookie-parser'),
        fs = require('fs'),
        path = require('path'),
        host = process.env.WESTLAWNEXT_HOST,
        parsedHost = url.parse(host),
        port = parsedHost.port,
        concat = require('concat-stream'),
        noCache = require('connect-nocache')(),
        app = express();

    function getBody(req, res, next) {
        req.pipe(concat(function (data) {
            req.body = data.toString();
            next();
        }));
    }

    app.listen(port, function () {
        console.log('westlawnext listening on port %s', port);
    })

    app.use(function (req, res, next) {
        if (req.headers.referer) {
            var parsed = url.parse(req.headers.referer);
            res.header('Access-Control-Allow-Origin', [req.protocol, parsed.host].join('://'));
            res.header('Access-Control-Allow-Credentials', true);
        }
        next();
    })

    app.use(cookieParser());

    app.get('/cookies/:name', function (req, res) {
        res.status(200).send(req.cookies[req.params.name]);
    })

    app.post('/cookies/:name', getBody, noCache ,function (req, res) {
        res.cookie(req.params.name, req.body);
        res.status(201).end();
    })

    app.get('/', function (req, res) {
        res.send('westlawnexxt');
    });

    app.use('/scripts',express.static(path.join(__dirname, 'scripts/shared')));

    app.get('/html/index', function(req, res, next){
        fs.readFile(path.join(__dirname, 'html/westlawnext/index.html'), function(err, file){
            if(err){
                return next(err);
            }
            res.set('Content-Type', 'text/html');
            res.status(200).send(file.toString().replace(':originDomain', process.env.ELEMENTS_HOST));
        });
    });
}(require, process));

