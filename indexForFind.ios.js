'use strict';

var React = require('react-native');
var Util = require('./src/util/util');

var {
  Text,
  View,
  Image,
  ScrollView,
  NativeModules,
  ListView,
  RefreshControl,
  TouchableHighlight,
  ActivityIndicatorIOS,
  NativeAppEventEmitter,
} = React;

var Oc2RnUtil = NativeModules.Oc2RnUtil;

const height_scr  =  142;
var cell_width = 60;
var cell_sep = (Util.size.width-4*cell_width)/5;
var high_cell_bottom = 60;
var width_unread_icon = 10;
var styles = React.StyleSheet.create({
  advScroller:{
    flexDirection:'column',
    height:(Util.funBtnWidth+Util.funBtnSep*2+60)*2,
    width:Util.size.width,
    backgroundColor: 'rgb(242, 242, 242)',
  },
  navigation:{
    flexDirection:'row',
    height:64,
    backgroundColor:'#1EB4F5',
  },
  naviTitle:{
    marginTop:35,
    backgroundColor: '#1EB4F5',
    fontSize:20,
    flex:1,
    height:20,
    fontWeight:'normal',
    color:'white',
    justifyContent:'center',
    textAlign:'center',
    overflow:'hidden',
  },
  classInvite:{
    marginTop:35,
    marginLeft:0,
    backgroundColor: '#1EB4F5',
    fontSize:16,
    height:44,
    width:100,
    fontWeight:'normal',
    color:'white',
    justifyContent:'center',
    textAlign:'center',
    overflow:'hidden',
  },
  scrollImage:{
    height:height_scr,
    width:Util.size.width,
//    backgroundColor:'red',
    resizeMode:Image.resizeMode.cover
  },
  node:{

    margin:20
  }
  ,
  secondRowNode:{
    marginLeft:Util.funBtnSep,
    marginTop:Util.funBtnSep,
  },
  funbtnCell:{
    backgroundColor: 'rgb(242, 242, 242)',
    marginTop:30,
    flexDirection:'row',
    width:Util.size.width,
    height:Util.funBtnWidth+Util.funBtnSep,
  },
  scrollview: {
  width:Util.size.width,
  backgroundColor: '#F3F3F3',
  height:Util.size.height-64-49,
  },
  scrollviewBg: {
  backgroundColor: 'blue',
  flex: 1,
  height:Util.size.height-64-49,
},
cellWholeBgStyle:{
  marginTop:0,
  marginLeft:0,
  width:Util.size.width,
  height:Util.size.width/3*4+100,
},
cellHeaderStyle:{
 height:70,
 width:Util.size.width,
 backgroundColor:'#F3F3F3',
 flexDirection:'row'
},
cellHeaderTipLabStyle:{
  marginLeft:20,
  marginTop:15,
  width:100
},
cellIconStyle:{
  backgroundColor:'#FFFFFF',
  width:70,
  height:70,
  marginTop:(Util.size.width/3-70)/2,
  marginLeft:(Util.size.width/3-70)/2,
  borderRadius:10,
},
cellContentBgStyle:{
 backgroundColor:'#FFFFFF',
 width:Util.size.width,
 height:Util.size.width/3,
 flexDirection:'row'
},
cellContentTextStyle:{
  flexWrap:'nowrap',
  margin:2,
  marginTop:10,
  justifyContent:'center',
  textAlign:'center',
  width:Util.size.width/3-4,
  height:15,
},
navigationaHeadStyle:{
  marginLeft :20,
  marginTop :27,
  width:30,
  height:30,
  borderRadius:15,
},
container: {
  backgroundColor: '#eeeeee',
  flex:1,
  justifyContent: 'center',
  alignItems: 'center'
},
cellImageStyle:{
  backgroundColor:'white',
 width:Util.size.width,
 height:120+high_cell_bottom,
 resizeMode:Image.resizeMode.cover,
},
cellBottomContentBgStyle:{
 width:Util.size.width,
 height:high_cell_bottom,
 backgroundColor:'white'
},
cellSepStyle:{
  height:20,
  backgroundColor:'#F3F3F3'
},
cellBottomTopViewStyle:{
  marginLeft:20,
  marginTop:10,
  width:Util.size.width-40,
  height:30,
  flexDirection:'row'
},
cellBottomTextStyle:{
  margin:1,
  marginTop:7,
  marginLeft:10,
  fontSize:16,
  fontWeight:'normal',
  justifyContent:'center',
  textAlign:'left',
  width:Util.size.width-100,
  height:17,
},

cellBottomTipTextStyle:{
  margin:5,
  marginTop:3,
  fontSize:20,
  color:'white',
  fontWeight:'200',
  justifyContent:'center',
  textAlign:'center',
},
cellBottomTimeTextStyle:{
  marginTop:-4,
  marginLeft:Util.size.width-130,
  fontSize:16,
  color:'#9e9e9e',
  fontWeight:'100',
  justifyContent:'center',
  textAlign:'right',
  width:120,
  height:16,
},
cellTopAreaStyle:{
  height:123,
  backgroundColor:'white',
  flexDirection:'row'
},
cellTopAreaTextStyle:{
  marginTop:10,
  marginLeft:-10,
  fontSize:14,
  color:'#000000',
  fontWeight:'200',
  justifyContent:'center',
  textAlign:'center',
  width:cell_width+20,
  height:14,
},

find_unreade_style:{
  marginTop:width_unread_icon/2,
  borderRadius:width_unread_icon/2,
  backgroundColor:'red',
  marginLeft:cell_width-width_unread_icon*1.25,
  width:width_unread_icon,
  height:width_unread_icon,
},

noDataStyle:{
  backgroundColor:'#FFFFFF',
  width:Util.size.width,
  height:100,
  fontWeight:'400',
  fontSize:20,
  paddingTop:(Util.size.width/3-50-20)/2,
  justifyContent:'center',
  textAlign:'center',
  color:'black',
},
});

//事件订阅者
var subscription;

var i=0;

var SimpleApp = React.createClass ({


  headUrl:function(){
    Oc2RnUtil.getUserHeadUrl(function(headUrl) {
          console.log('Oc2RnUtil.getUserHeadUrl'+headUrl);
          this.state = {
              head: headUrl,
              };
      });
  },

// 获取列表数据
  getCategoryData:function(){
    Oc2RnUtil.getStudyCategorys(function(categoryData) {
          console.log('Oc2RnUtil.getStudyCategorys'+categoryData);
      });
  },

  getInitialState() {

  return {
          isRefreshing: true,
          loaded: 0,
          head:'',
          nodes:[],
          arrfun:[],
          isShowJRHT:false,
          isShowJCHD:false,
          isShowZJGZ:false,
          isShowPPJY:false
        };
},

//刷新函数
requestData:function( ){

  var _this = this;

  var _this = this;

  _this.setState({
    isRefreshing: true,
  });

    Oc2RnUtil.getFindList(function(dataList) {
          _this.setState({
            isRefreshing: false,
            loaded: 0,
            head:'',
            nodes:dataList.foundList
          });
    });


    Oc2RnUtil.getTopButtonSettingList(function(dataList) {
          _this.setState({
            topButtonSetList:dataList.buttonSettingList
          });
    });
},


_onPressButton:function(url){

 console.log('_onPressButton1');
  Oc2RnUtil.checkInfoWith(url);
  console.log('_onPressButton2');

},


componentWillMount:function(){

},


componentDidMount: function(){

      console.log('componentDidMount'+Date());
      this.requestData();
    //增加事件监听
      subscription = NativeAppEventEmitter.addListener(
      'EventReminder',
      (reminder) => console.log(reminder.userid)
    );


     var _this = this;

    subscription = NativeAppEventEmitter.addListener(
    'isShowUnreadView',
    (info) => {

                   if(info.index === '1')
                   {
                     _this.setState({
                       isShowJRHT: info.state === '1',
                     });
                   }
                   else if (info.index === '2') {

                     _this.setState({
                       isShowJCHD: info.state === '1',
                     });

                   }
                   else if (info.index === '3') {

                     _this.setState({
                       isShowZJGZ: info.state === '1',
                     });

                   }
                   else
                   {
                     _this.setState({
                       isShowPPJY: info.state === '1',
                     });
                   }

            }
  );
},

componentWillUnmount:function() {
    subscription.remove();
},


render: function(){
  if(this.state.isRefreshing){
    return this.renderLoading();
  }
  return this.renderNodeList();
},


renderLoading: function(){
  return (
    <View style={styles.container}>
      <ActivityIndicatorIOS color="#356DD0" style={{marginVertical: 30,marginBottom: 30}} />
    </View>
  );
},


renderNodeList: function(){
  return (
    <ScrollView
    style={styles.scrollview}

    refreshControl={
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.requestData}
        tintColor={Util.commenColor}
        title="加载中..."
        colors={[Util.commenColor]}
        progressBackgroundColor="rgb(255, 255, 255)"
      />
      }



>
      {this.renderTopArea()}
      <View style={styles.cellSepStyle}>
      </View>
      {this.renderNodesAuto()}
    </ScrollView>
    );
},

/*
 * 顶部区域响应方法
 */
 //今日话题
 top_jrht_clicked:function() {
   Oc2RnUtil.findJRHT();
 },

 //精彩活动
 top_jchd_clicked:function() {
   Oc2RnUtil.findJCHD();
 },

 //专家工作
 top_zjgz_clicked:function() {
   Oc2RnUtil.findZJGZ();
 },

 //品牌教育
 top_ppjy_clicked:function() {
   Oc2RnUtil.findPPJY();
 },


 //顶部活动按钮区域
topButtonClicked:function(data) {

 Oc2RnUtil.onFindTopButtonClicked(data);
 console.log(data);

},

 renderTopArea:function(){
   var arr = this.state.topButtonSetList;
   if(arr instanceof Array)
   {
     if(arr.length == 0){
       return (
         <Text style={styles.noDataStyle}>
         暂无数据
         </Text>
       );
     }
     else {
       var  numCell = 4;
       var n = Math.ceil(arr.length/numCell);
       var newButtonAarr = [];
       for (var i = 1; i <= n; i++) {
         newButtonAarr.push(arr.slice((i-1)*numCell, i*numCell));
       };
       return newButtonAarr.map(this.createTopCell);
     }
s
   }

 },

createTopCell:function(arr) {
  return (
    <View  key={2+i++} style={styles.cellTopAreaStyle}>
      {arr.map(this.createEachTopButtonArea)}
    </View>
  );
},

 createEachTopButtonArea:function(data) {
   var isShowRed;
   if(data.viewType == 0)
   {
       isShowRed = this.state.isShowJCHD;
   }
   else if (data.viewType == 1) {
       isShowRed = this.state.isShowJRHT;
   }
   else if (data.viewType == 2) {
       isShowRed = this.state.isShowZJGZ;
   }
   else if (data.viewType == 3) {
     isShowRed = this.state.isShowPPJY;
   }
   else {
     isShowRed = false;
   }

  return(
    <TouchableHighlight
        onPress={()=>this.topButtonClicked(data)}
        underlayColor = 'white'
         key={1+i++}

        >
        <View key={1+i++} style={{ marginLeft:cell_sep,marginTop:20,width:cell_width,height:cell_width,backgroundColor:'white'}}>
            <Image style={{ margin:0,width:cell_width,height:cell_width,backgroundColor:'white'}}
                   source={{uri:data.icon}}
             >
                <Image style={{
                                marginTop:width_unread_icon/2,
                                borderRadius:width_unread_icon/2,
                                backgroundColor:'red',
                                marginLeft:cell_width-width_unread_icon*1.25,
                                width:width_unread_icon,
                                height:width_unread_icon,
                                opacity:isShowRed ? 1 : 0,
                              }}
                >
                </Image>
             </Image>
             <Text style={styles.cellTopAreaTextStyle}>
               {data.name}
             </Text>
         </View>
     </TouchableHighlight>
   );

 },
  //每行3个，这里将nodes切成N个数组，每个数组3条数据
  renderNodesAuto: function(){

    var nodes = this.state.nodes;
    if(nodes.length == 0)
    {
      return (<View/>);
    }
    return nodes.map(this.renderNodes);
  },

  renderNodes: function(nodes){
    return (
      <View key={i++} style={{height:260 , backgroundColor:'#F3F3F3'}}>

      {this.renderNodeCell(nodes)}

      </View>
    );
  },



  renderNodeCell: function(data){

    var typeText ;
    var typeCorlor ;
    if(data.foundType == 2)
    {
      typeText = '活动';
      typeCorlor = '#89C344';
    }
    else if (data.foundType == 3) {
      typeText = '话题';
      typeCorlor = '#F58C27';
    }
    else if (data.foundType == 4) {
      typeText = '品牌教育';
      typeCorlor = '#56befa';
    }
    else if (data.foundType == 5) {
      typeText = '专家工作室';
      typeCorlor = '#fb5282';
    }
    else if (data.foundType == 6) {
      typeText = '第三方程序';
      typeCorlor = '#fa7744';
    }
    else {
      typeText = '';
      typeCorlor = '#ffffff';
    }
    return (
      <TouchableHighlight
          onPress={()=>this._onPressButton(data.detailUrl)}
          underlayColor = 'white'
          >
          <View style={{
                        marginTop:0,
                        marginLeft:0,
                        width:Util.size.width,
                        height:100+high_cell_bottom,
                       }}>
            <Image style={styles.cellImageStyle}
                  source={{uri:data.picUrl}}
                  defaultSource={require('image!topic_list_view_default_image')}
             >

            </Image>

            <View style={styles.cellBottomContentBgStyle}>
              <View style =  {styles.cellBottomTopViewStyle}>


                  <View style={{
                    borderRadius:5,
                    borderColor:typeCorlor,
                    backgroundColor:typeCorlor,
                    marginLeft:-5,
                    marginTop:0,
                    width:Util.getByteLen(typeText,15)+8,
                    height:31,
                 }}
                 >
                     <Text style={{
                                backgroundColor:typeCorlor,
                                marginLeft:4,
                                marginTop:7,
                                width:Util.getByteLen(typeText,15),
                                height:21,
                                fontSize:15,
                                color:'white',
                                fontWeight:'200',
                                justifyContent:'center',
                                textAlign:'center',
                             }}

                             >
                             {typeText}
                     </Text>


                  </View>

                  <Text style={styles.cellBottomTextStyle}>
                  {data.foundName}
                  </Text>
              </View>
              <Text style={styles.cellBottomTimeTextStyle}>
                {data.time.substring(0,10)}
              </Text>
            </View>
            <View style={styles.cellSepStyle}>
            </View>
          </View>
    </TouchableHighlight>
    );
  },

});


React.AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
