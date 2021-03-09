import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

// import Vant from 'vant';
import { Calendar } from 'vant';
Vue.use(Calendar);
import 'vant/lib/index.css';

// Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
