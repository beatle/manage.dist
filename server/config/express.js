/**
 * Express configuration
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

exports['default'] = function (app) {
  var env = app.get('env');

  app.use((0, _compression2['default'])());
  app.use(_bodyParser2['default'].urlencoded({ extended: false }));
  app.use(_bodyParser2['default'].json());
  app.use((0, _methodOverride2['default'])());
  app.use((0, _cookieParser2['default'])());

  app.use(function (req, res, next) {
    req.user = {
      id: 112,
      client_id: 173,
      group_id: 2
    };
    return next();
  });

  app.set('appPath', _path2['default'].join(_environment2['default'].root, 'client'));

  if ('production' === env) {
    app.use((0, _serveFavicon2['default'])(_path2['default'].join(_environment2['default'].root, 'client', 'favicon.ico')));
    app.use(_express2['default']['static'](app.get('appPath')));
    app.use((0, _morgan2['default'])('dev'));
  }

  if ('development' === env) {
    app.use(require('connect-livereload')());
  }

  if ('development' === env || 'test' === env) {
    app.use(_express2['default']['static'](_path2['default'].join(_environment2['default'].root, '.tmp')));
    app.use(_express2['default']['static'](app.get('appPath')));
    app.use((0, _morgan2['default'])('dev'));
    app.use((0, _errorhandler2['default'])()); // Error handler - has to be last
  }
};

module.exports = exports['default'];
//# sourceMappingURL=express.js.map
