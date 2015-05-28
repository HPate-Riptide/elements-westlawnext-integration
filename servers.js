/**
 * Created by jhorlin.dearmas on 5/21/2015.
 */
var env = require('node-env-file'),
    path = require('path');
env(path.join(__dirname,'.env'))
require('./elements');
require('./westlawnext');