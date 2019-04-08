// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(new VueSocketIO({
debug: false,
connection: '//firelocater.top',
}));
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
