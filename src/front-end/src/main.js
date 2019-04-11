// IMPORTS
// "Back-End"
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';

// "Front-End"
import App from './App.vue';
import moment from "moment";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

// Router
const router = new VueRouter({ routes, mode: 'history'});

// USES
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuetify, { iconfont: 'mdi' });

// FILTERS
Vue.filter('formatDate', function(value) {
  if (value)
    return moment(String(value)).format('DD/MM/YYYY hh:mm:ss');
});

// CONFIGS
Vue.config.productionTip = false;

// START
new Vue({
  router: router,
  render: r => r(App),
  renderError(r, error) {
    return r('ERROR', {
      style: {
        color: 'red'
      }
    }, error.stack)
  },
}).$mount('#app');
