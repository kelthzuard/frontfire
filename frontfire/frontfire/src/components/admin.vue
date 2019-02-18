<template>
<div class="layout">
    <Layout style="height: 100%">
        <Header>
            <Menu mode="horizontal" theme="dark">
                <div class='headerTitle'>眉山消防定位系统</div>
                <div class="layout-nav">
                </div>
            </Menu>
        </Header>
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu theme="light" width="auto" :open-names="['1']" :active-name="currentItem" @on-select="changeItem">
                    <Submenu name="1">
                        <template slot="title">
                            报警人员列表
                        </template>
                        <div v-for="(item,index) in numberList" :key="index">
                          <MenuItem :name="index">{{item.number}}
                            <Button type="error" size="small" @click="getsocket">删除</Button>
                          </MenuItem>
                        </div>
                        <Button type="primary" style="margin-left: 40px;">新建火灾信息</Button>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout style="position:relative">
                <div id="container" style="width: 100%;height: 100%"></div>
                <Card class="infoCard">
                  <p slot="title">
                      具体位置信息:
                  </p>
                  <p>"四川省成都市成华区猛追湾街道四川油气田总部机关住宅区电子科技大学继续教育学院"</p>
                </Card>
            </Layout>
        </Layout>
    </Layout>
</div>
</template>
<script>
import axios from 'axios'
import socket from 'vue-socket.io'
export default {
  name: 'admim',
  map: null,
  data () {
    return {
      currentItem: 0,
      numberList: [{
        number: '18380266573',
        data: ''
      },{
        number: '18380266573',
        data: ''
      },{
        number: '18380266573',
        data: ''
      }]
    }
  },
  sockets: {
    //不能改,j建立连接自动调用connect
    connect: function() {
      //与socket.io连接后回调
      console.log("socket connected");
    },
//服务端向客户端发送login事件
    map: function(response) {
     //监听login(后端向前端emit  login的回调)
    this.drawMarker(response) 
    }
  },
  methods: {
    changeItem: (index) => {
    },
    createMap: () => {
      var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom:11,
          center: [104.09659999999997, 30.67394]
      });
    },
    getLocation: function() {
      let self = this
      AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：5s
              buttonPosition:'RB',    //定位按钮的停靠位置
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

          });
          geolocation.getCurrentPosition(function(status,result){
              if(status=='complete'){
                  self.onComplete(result);
              }else{
                  self.onError(result);
              }
          });
      });
    },
    onComplete: function(result) {
      let self = this;
      axios({
          method:'post',
          url:'http://localhost:3000',
          data: {
            data: result
          }
      }).then((response) =>{          //这里使用了ES6的语法
          console.log(response)     //请求成功返回的数据
      }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
      });
    },
    drawMarker: function(message) {
      var data = message.msg;
      var postion = [];
      postion[1] = data.position.Q;
      postion[0] = data.position.R;
      var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom:11,
          center: [104.09659999999997, 30.67394]
      });
      var marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: postion
      });
      map.add(marker);
      map.setFitView();
      console.log(data);
    },
    getsocket: () => {
      socket.emit('client message', 'admin');
    }
  },
  mounted () {
    this.createMap();
    this.getLocation();
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.headerTitle{
  margin-left: 30px;
  color: #fff;
}
.infoCard{
  width: 200px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
