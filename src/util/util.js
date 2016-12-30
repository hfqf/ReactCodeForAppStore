

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio
} = React;

const sep = 30;

var Util = {

  //单位像素
  pixel: 1 / PixelRatio.get(),
  //屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  //当前选择的班级
  currentClass:'@public:kcurrentClass',
  funBtnWidth:(Dimensions.get('window').width-4*sep)/3,
  funBtnSep: sep,

  commenColor:'#1EB4F5',

  //根据字符和字体大小计算所占区域的宽度
  getByteLen : function (val,fontSize) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
          if (val[i].match(/[^x00-xff]/ig) != null) //全角
              len += 1;
          else
              len += 1;
      };
      return len*fontSize+10;
  } ,

};



module.exports = Util;
