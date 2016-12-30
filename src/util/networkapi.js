

var React = require('react-native');
var Dimensions = require('Dimensions');
var debug = {true};
var REQUEST_URL = '';
//var REQUEST_BASE_URL='http://localhost:8080';
var REQUEST_BASE_URL='http://192.168.50.49:8080';
var REQUEST_LOGIN_URL;

var networkapi = {

  //post请求
  post: function (url, data, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      console.log('1');
      console.log(JSON.parse(responseText));
      callback(JSON.parse(responseText));
    });
  },

  //get请求
  get: function (url, callback) {
    fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    });
  },
  //Key
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE',


  //以下是接口url
  REQUEST_LOGIN_URL : debug?REQUEST_BASE_URL+'/web/login_t.jsp':REQUEST_URL,//登录接口
  REQUEST_CONTACT_URL : debug?REQUEST_BASE_URL+'/web/getTeacherByClassroom.jsp':REQUEST_URL,//获取联系人接口
  REQUEST_CLASSPLUS_URL : debug?REQUEST_BASE_URL+'/web/getClassPlus.jsp':REQUEST_URL,//获取班级圈接口


};

module.exports = networkapi;
