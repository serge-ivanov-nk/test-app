import express from "express";
import webpack from "webpack";
import path from 'path';
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.config.dev";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import jwt from 'jsonwebtoken';
import { PageNotFound, ResourceNotFound, InternalError } from "./utils/error";
import api from "./api";

// because we are already using helmet

const isDeveloping = process.env.NODE_ENV == 'development';
const port = process.env.PORT || 5000;
const server = global.server = express();

// Security
server.disable('x-powered-by');
server.set('port', port);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(hpp());
server.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'"],
  imgSrc: ["'self'"],
  connectSrc: ["'self'", 'ws:'],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  frameSrc: ["'none'"],
}));
server.use(helmet.xssFilter());
server.use(helmet.frameguard('deny'));
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());
server.use(cookieParser());
server.use(compression());

// Stub for assets, in case running in dev mode.
let assets;

// Webpack (for development)
if (isDeveloping) {
  server.use(morgan('dev'));
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      assets: false,
      children: false,
      chunks: true,
      chunkModules: false,
      modules: false,
    },

  });
  server.use(middleware);

  server.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));
} else {
  const buildPath = require('../../webpack.config.prod').output.path;
  assets = require('../../assets.json');
  server.use(morgan('combined'));
  server.use('/build/static', express.static(buildPath));
}

// API
const prefix = '/api/v0';
api(server, prefix);
server.get(`${prefix}/*`, (req, res) => ResourceNotFound(res));

// SSR Logic
server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'index.html')));

server.post(`${prefix}/login`, function (req, res) {
  const credentials = req.body;
  if (credentials.user === 'admin' && credentials.password === 'password') {

    const profile = { user: credentials.user, role: 'ADMIN' };
    const jwtToken = jwt.sign(profile, 'secret', { expiresIn: 5 * 60 });
    res.status(200).json({
      id_token: jwtToken
    });
  } else {
    res.status(401).json({ message: 'Invalid user/password' });
  }
});

server.post(`${prefix}/logout`, function (req, res) {
  res.status(200).json({ message: 'User logged out' });
});

// Listen
server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('Listening on port %s.' +
    'Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

module.exports = server;
