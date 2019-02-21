<template>
  <div>{{info}}</div>
</template>
<script>
export default {
  name: 'client',
  data () {
    return {
      info: '定位中，请等待'
    }
  },
  methods: {
    getLocation () {
      AMap.plugin('AMap.Geolocation', () => {
          var geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：5s
              buttonPosition:'RB',    //定位按钮的停靠位置
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

          });
          geolocation.getCurrentPosition((status,result) => {
              if(status=='complete'){
                  this.onComplete(result);
              }else{
                  this.info = '定位失败' 
              }
          });
      });
    },
    onComplete (result) {
      let params = this.$route.params.number
      this.$axios({
          method:'post',
          url:'http://120.78.79.229:3000/client?number='+params,
          data: {
            data: result
          }
      }).then((response) =>{          //这里使用了ES6的语法
          this.info = '定位成功'     //请求成功返回的数据
      }).catch((error) =>{
          this.info = '网络失败'       //请求失败返回的数据
      });
    }
  },
  mounted () {
    this.getLocation()
  }
}
</script>
<style scoped>

</style>


