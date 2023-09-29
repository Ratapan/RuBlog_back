"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _package = _interopRequireDefault(require("../package.json"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _products = _interopRequireDefault(require("./routes/products.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set('package_json', _package["default"]);
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
app.get('/', function (req, res) {
  res.json({
    autor: app.get('package_json').author,
    project: app.get('package_json').name,
    desc: app.get('package_json').description,
    version: app.get('package_json').version
  });
});
app.use('/product', _products["default"]);
app.use('/user', _user["default"]);
app.use('/auth', _auth["default"]);
var _default = app;
exports["default"] = _default;