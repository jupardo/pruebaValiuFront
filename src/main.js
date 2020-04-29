import Vue from 'vue';
import App from './App.vue';
import VueSocketio from 'vue-socket.io';
import store from './socket-io-vuex-store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


//Vue.use(VueSocketio, `//${window.location.host}`, MyVuexStore);
Vue.use(new VueSocketio({
  connection: "https://jupardo.com:8000",
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
