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
                          <MenuItem :name="item.phoneNumber">{{item.phoneNumber}}
                            <Button type="error" size="small" @click="getsocket">删除</Button>
                          </MenuItem>
                        </div>
                        <Button type="primary" style="margin: 20px 0 0 40px;" @click="startNewModal">新建火灾信息</Button>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout style="position:relative">
                <div id="container" style="width: 100%;height: 100%"></div>
                <Card class="infoCard">
                  <p slot="title">
                      具体位置信息:
                  </p>
                  <p>{{this.locationInfo}}</p>
                  <p style="word-wrap:break-word">位置确认url:{{this.secretNumber}}</p>
                </Card>
            </Layout>
        </Layout>
    </Layout>
    <Modal
    v-model="startNew"
    :loading="startNewLoading"
    @on-cancle="cancleNew"
    @on-ok="sendNewQuest">
      <p>报警人电话:<Input style="width:200px" v-model="newQuest.phoneNumber"></Input></p>
      <p>报警人信息位置描述:<Input type="textarea" v-model="newQuest.desc"></Input></p>
    </Modal>
</div>
</template>
<script>
export default {
  name: 'admim',
  data () {
    return {
      newQuest: {
        phoneNumber: '',
        desc: ''
      },
      currentPointer: '',
      secretNumber: '',
      startNew:false,
      startNewLoading: true,
      locationInfo: '',
      currentItem: 0,
      numberList: []
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
      this.$Message.info('电话号码为'+response.msg.phoneNumber+'的位置信息更新了')
      for (let i = 0; i < this.numberList.length; i++) {
        if ((response.msg.phoneNumber === this.currentPointer) && (this.numberList[i].phoneNumber === this.currentPointer)) {
          this.numberList[i] = response.msg
          this.secretNumber = 'http://120.78.79.229:8080/#/client/'+this.numberList[i].secretNumber
          let location = JSON.parse(this.numberList[i].location)
          this.locationInfo = location.formattedAddress
          this.drawMarker(location)
        }
      }
    }
  },
  methods: {
    changeItem (index) {
      this.currentPointer = index
      for (let i = 0; i < this.numberList.length; i++) {
        this.secretNumber = 'http://120.78.79.229:8080/#/client/'+this.numberList[i].secretNumber
        if (index === this.numberList[i].phoneNumber) {
          if (this.numberList[i].location === 'unknow') {
            this.locationInfo = '等待确认'
            var map = new AMap.Map('container', {
                resizeEnable: true,
                zoom:11,
                center: [104.09659999999997, 30.67394]
            });
          }else {
            let location = JSON.parse(this.numberList[i].location)
            this.locationInfo = location.formattedAddress
            this.drawMarker(location)
          }
        }
      }
    },
    createMap () {
      var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom:11,
          center: [104.09659999999997, 30.67394]
      });
    },
    drawMarker (message) {
      var position = [];
      position[1] = message.position.Q;
      position[0] = message.position.R;
      var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom:11,
          center: [104.09659999999997, 30.67394]
      });
      var marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: position
      });
      map.add(marker);
      map.setFitView();
    },
    getsocket () {
      this.$socket.emit('client message', 'admin');
    },
    startNewModal () {
      this.startNew = true
    },
    cancleNew () {
      this.startNew = false
    },
    isPoneAvailable (num) {
      let numreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if (!numreg.test(num)) {
          return false;
      } else {
          return true;
      }
    },
    sendNewQuest () {
      let iserror = false
      let self = this
      if (this.newQuest.phoneNumber === '') {
        this.$Message.error('电话号码不能为空')
        iserror = true
      }
      if (!this.isPoneAvailable(this.newQuest.phoneNumber)) {
        this.$Message.error('请输入正确的电话号码')
        iserror = true
      }
      if (iserror) {
        setTimeout(() => {
          this.startNewLoading = false
          this.$nextTick(() => {
            self.startNewLoading= true;
          });
        }, 1000)
      }else {
        this.$axios({
            method:'post',
            url:'http://120.78.79.229:3000/admin',
            data: {
              data: self.newQuest
            }
        }).then((response) =>{         
            this.$Message.info('新建成功')
            this.startNew = false    
            this.getData()
        }).catch((error) =>{
            this.$Message.error('新建失败')     
            this.startNew = false 
        });
        }
    },
    getData () {
      this.$axios({
          method:'get',
          url:'http://120.78.79.229:3000/admin/getList',
      }).then((response) =>{         
        console.log(response)
        this.numberList = response.data
      }).catch((error) =>{
          this.$Message.error('新建失败')     
      });
    }
  },
  mounted () {
    this.createMap();
    this.getData();
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
