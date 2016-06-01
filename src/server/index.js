require("babel-polyfill");
require('babel-register');

// teaches node.js to load css files
//require('css-modules-require-hook/preset');
require('ignore-styles');
require('./server');
