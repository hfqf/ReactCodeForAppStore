var React = require('react-native');
var Util = require('../util/util');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  TouchableHighlight,
  TouchableOpacity
} = React;

var kBtnWidth = Util.funBtnWidth;

var kPadding2ForImage =-1;

var img = 'https://avatars3.githubusercontent.com/u/6133685?v=3&s=460';

//选择功能按钮
var  ContactAreaView = React.createClass({

   render: function() {

     var data = this.props.data;
     return (
        <TouchableOpacity activeOpacity={1}  style={styles.btnBack}  onPress={this.props.selectNode}>
        <View>
        <View style = {styles.style_funBtn}>
          <Image  style={
                          {
                            backgroundColor:'rgb(242, 242, 242)',
                            margin:kPadding2ForImage,
                            height:(kBtnWidth-2)-kPadding2ForImage*2,
                            width:(kBtnWidth-2)-kPadding2ForImage*2,
                            // resizeMode:Image.resizeMode.contain,
                          }
                        }

                    source={{uri:data.icon}}
                         >


          </Image>



        </View>

        <Text style = {styles.style_contentView}>
        {data.name}
        </Text>
       </View>
       </TouchableOpacity>

     );
   }
},
);



var styles = StyleSheet.create({
btnBack:{
  marginTop:Util.funBtnSep,
  marginLeft:Util.funBtnSep,
  width:kBtnWidth,
  height:kBtnWidth,
},
back:{
  margin:Util.funBtnSep,
},
  //按钮样式
  style_funBtn:{
    backgroundColor: '#ffffff',
    width:kBtnWidth,
    height:kBtnWidth,
    borderRadius:kBtnWidth/2,
    borderColor: '#b0b5b8',
    borderWidth: 1,
    //opacity:0.5,
  },
  //按钮内部文字样式
  style_contentView:{
    marginTop:11,
    marginLeft:0,
    backgroundColor: '#f1f1f1',
    fontSize:16,
    fontWeight:'300',
    color:'#0a0a0a',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    overflow:'hidden',
  },

  //  按钮右上角未读数字区域样式
  style_unReadBackgroundView:{
    backgroundColor: '#d42424',
    width:20,
    height:20,
    borderRadius:10,
    borderWidth: 0,
    borderColor: '#ffffff',
    marginLeft:kBtnWidth-25,
    marginTop:-kBtnWidth,
  },

  //按钮右上角红色区域
  style_unReadTextView:{
    margin:1,
    backgroundColor: '#d42424',
    width:18,
    height:18,
    borderRadius:9,
    borderWidth: 0,
    borderColor: '#ffffff',
  },

  //按钮右上角红色区域内数字样式
style_unReadNum:{
  position:'relative',
  top:2,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize:12,
  fontWeight:'700',
  color:'#ffffff',
  alignItems:'center',
  justifyContent:'center',
  textAlign:'center',
},

style_online:{
  top:kBtnWidth-20,
  backgroundColor:'rgb(16, 186, 120)',
  width:kBtnWidth,
  height:20,
},

style_offline:{
  top:kBtnWidth-35,
  backgroundColor:'#f1f1f1',
  width:kBtnWidth,
  height:30,
},

style_onlineState:{
  top:3,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize:12,
  fontWeight:'100',
  color:'#ffffff',
  alignItems:'center',
  justifyContent:'center',
  textAlign:'center',
  overflow:'hidden',
},
btn1:{
  marginLeft:15,
  marginTop:5,
  backgroundColor: 'rgb(16, 186, 120)',
  width:15,
  height:15,
  borderRadius:7.5,
  borderWidth: 0,
  borderColor: '#ffffff',
},

});

module.exports = ContactAreaView;
