

var React = require('react-native');
var Dimensions = require('Dimensions');
var debug = {true};
var REQUEST_URL = '';
var REQUEST_BASE_URL='http://localhost:8080';
//var REQUEST_BASE_URL='http://192.168.50.27:8080;
var REQUEST_LOGIN_URL;

var imgsrc = {
  //登录页面
  IMG_LOGIN_USER_N : debug?REQUEST_BASE_URL+'/web/img/icon_account.png':REQUEST_URL,
  IMG_LOGIN_USER_P : debug?REQUEST_BASE_URL+'/web/img/icon_account_focus.png':REQUEST_URL,

  IMG_LOGIN_PWD_N : debug?REQUEST_BASE_URL+'/web/img/icon_password.png':REQUEST_URL,
  IMG_LOGIN_PWD_P : debug?REQUEST_BASE_URL+'/web/img/icon_password_focus.png':REQUEST_URL,

  IMG_LOGIN_PWD_S_N : debug?REQUEST_BASE_URL+'/web/img/expandable_n.png':REQUEST_URL,
  IMG_LOGIN_PWD_S_P : debug?REQUEST_BASE_URL+'/web/img/expandable_p.png':REQUEST_URL,
  IMG_LOGIN_CLOSE : debug?REQUEST_BASE_URL+'/web/img/icon_del.png':REQUEST_URL,

};

module.exports = imgsrc;
