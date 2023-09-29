"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect('mongodb+srv://ru_blog_crud:4HiY9gIpFMROINzT@rublog.5eicvab.mongodb.net/?retryWrites=true&w=majority').then(function (db) {
  return console.log('DB is conected');
})["catch"](function (err) {
  return console.log(err);
});