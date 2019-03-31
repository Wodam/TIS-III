// IMPORTS
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';
import App from './App.vue';
import moment from "moment";
import BootstrapVue from 'bootstrap-vue';

// Router
const router = new VueRouter({ routes, mode: 'history'});

// USES
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

// CONFIGS
Vue.config.productionTip = false;

Vue.filter('formatDate', function(value) {
  if (value)
    return moment(String(value)).format('DD/MM/YYYY hh:mm:ss');
});

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
