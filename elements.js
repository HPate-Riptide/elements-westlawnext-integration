/**
 * Created by jhorlin.dearmas on 5/21/2015.
 */
(function(require, process){
    'use strict';
    var express = require('express'),
        path = require('path'),
        url = require('url'),
        host = process.env.ELEMENTS_HOST,
        parsedHost = url.parse(host),
        port = parsedHost.port,
        fs = require('fs'),
        app = express();
    app.listen(port, function(){
        console.log('elements listening on %s', port);
    });

    app.get('/scripts/cookie.js', function(req, res, next){
        fs.readFile(path.join(__dirname, 'scripts/elements/cookie.js'), function(err, file){
           if(err){
              return next(err);
           }
            res.set('Content-Type', 'application/javascript');
            res.status(200).send(file.toString().replace(':crossDomain', process.env.WESTLAWNEXT_HOST).replace(':originDomain', host));
        });
    })
    app.use('/scripts',express.static(path.join(__dirname, 'scripts/elements')));
    app.use('/scripts',express.static(path.join(__dirname, 'scripts/shared')));
    app.get('/html/index', function(req, res, next){
        fs.readFile(path.join(__dirname, 'html/elements/index.html'), function(err, file){
            if(err){
                return next(err);
            }
            res.set('Content-Type', 'text/html');
            res.status(200).send(file.toString().replace(':crossDomain', process.env.WESTLAWNEXT_HOST));
        });
    })
   // app.use('/html',express.static(path.join(__dirname, 'html/elements')));
}(require, process));




