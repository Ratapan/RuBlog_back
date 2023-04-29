"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = 3000;
_app["default"].listen(port);
console.log("server listen on port http://localhost:".concat(port));