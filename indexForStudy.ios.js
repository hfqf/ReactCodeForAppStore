'use strict';

var React = require('react-native');
var Util = require('./src/util/util');
var ContactAreaView = require('./src/home/ContactAreaView');

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
  NativeAppEventEmitter
} = React;

var Oc2RnUtil = NativeModules.Oc2RnUtil;

const height_scr  =  142;

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
 height:50,
 width:Util.size.width,
 backgroundColor:'#F3F3F3',
 flexDirection:'row'
},
cellHeaderTipLabStyle:{
  marginLeft:20,
  marginTop:15,
  width:100
},
cellContentStyle:{
 backgroundColor:'#FFFFFF',
 width:Util.size.width/3,
 height:Util.size.width/3-0.5,
 borderRightWidth:0.5,
 borderColor:'#E5E5E5',
 borderLeftWidth:0,
 borderTopWidth:0.0,
 borderBottomWidth:0
},
cellIconStyle:{
  backgroundColor:'#FFFFFF',
  width:70,
  height:70,
  marginTop:(Util.size.width/3-70-25)/2,
  marginLeft:(Util.size.width/3-70)/2,
  borderRadius:10,
},
cellContentBgStyle:{
 backgroundColor:'white',
 width:Util.size.width,
 height:Util.size.width/3,
 flexDirection:'row',
 borderColor:'#E5E5E5',
 borderBottomWidth:0.5
},
cellContentTextStyle:{
  flexWrap:'nowrap',
  margin:2,
  marginTop:10,
  fontWeight:'200',
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
noDataStyle:{
  backgroundColor:'#FFFFFF',
  width:Util.size.width,
  height:Util.size.width/3-50,
  fontWeight:'400',
  fontSize:20,
  paddingTop:(Util.size.width/3-50-20)/2,
  justifyContent:'center',
  textAlign:'center',
  color:'black',
},
container: {
  backgroundColor: '#eeeeee',
  flex:1,
  justifyContent: 'center',
  alignItems: 'center'
}
});


//事件订阅者
var subscription;

var i = 0;

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
  requestData:function(){

    var _this = this;

    _this.setState({
      isRefreshing: true,
    });

    Oc2RnUtil.getStudyCategorys(function(categoryData) {

      _this.setState({
        isRefreshing: false,
        loaded: 0,
        head:'',
        nodes:categoryData
      });

      });
  },

  getInitialState() {

  return {
          isRefreshing: true,
          loaded: 0,
          head:'',
          nodes:[],
        };
},

_onPressButton:function(categoryId){

  Oc2RnUtil.categoryMoreBtnClicked(categoryId);

},


checkInfo:function (recommendId,recomCourseType) {

  Oc2RnUtil.checkInfo(recommendId,recomCourseType);

},


componentDidMount: function(){

      this.requestData();
    //增加事件监听
      subscription = NativeAppEventEmitter.addListener(
      'EventReminder',
      (reminder) => console.log(reminder.userid)
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
  var arrData =  nodes.data;
  return (
    <View key={i++} style={{height:arrData.length == 0 ? Util.size.width/3 : Util.size.width/3*(nodes.length) , backgroundColor:'white'}}>

    {this.renderNodeCell(nodes)}

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
      }>
      {this.renderNodesAuto()}
    </ScrollView>
    );
},


renderNodeCell: function(data){
  var n = Math.ceil(data.data.length/3);
  return (
  <View  key={i++}
     style={{
                marginTop:0,
                marginLeft:0,
                width:Util.size.width,
                height:Util.size.width/3*n+50,
               }}>
    <View style={styles.cellHeaderStyle}>
       <Text style={styles.cellHeaderTipLabStyle}>
         {data.name}
       </Text>
       <TouchableHighlight
           onPress={()=>this._onPressButton(data.name === '教师推荐' ? '0' : '1')}
           style={{marginLeft:Util.size.width-100-100,width:100}}
           underlayColor = '#F3F3F3'
           >
           <Text style={{
           fontSize:14 ,
           marginTop:17,
           width:100,
           height:16,
           color:'#1EB4F5',
           textAlignVertical:'center',
           textAlign:'center'}}>
           更多>>
           </Text>
       </TouchableHighlight>
    </View>
    {this.renderEachRowCell(data.data)}
  </View>

  );
},



renderMinCell:function(arrCellData){
    return (
      <View  key={i++} style={styles.cellContentBgStyle}>
        {arrCellData.map(this.renderMinEachItem)}
      </View>
    );
},


renderMinEachItem:function(data){
  return    (
    <TouchableHighlight
         key = {i++}
        onPress={()=>this.checkInfo(data.recomID.toString(),data.sourseType.toString())}
        style={{width:Util.size.width/3,height:Util.size.width/3}}
        underlayColor = '#F3F3F3'
        >
        <View  key = {i++}
               style={styles.cellContentStyle}>
           <Image
             style={styles.cellIconStyle}
             source={{uri: data.recomPic}}
             defaultSource={require('image!appdetail_icon_default')}
           >
           </Image>
           <Text style={styles.cellContentTextStyle}>
            {data.recomContent}
           </Text>
        </View>
      </TouchableHighlight>

    );
},

renderEachRowCell:function(data){

  if(data.length == 0){
    return (
      <Text style={styles.noDataStyle}>
      暂无数据!
      </Text>
    );
  }
  else {
    var nodes = data;
    var n = Math.ceil(nodes.length/3);
    var r = [];
    for (var i = 1; i <= n; i++) {
      r.push(nodes.slice((i-1)*3, i*3));
    };
    return r.map(this.renderMinCell);
  }


},


});


React.AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
