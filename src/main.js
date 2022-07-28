import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as api from './api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/**********svg***********/
import '../src/assets/svg/svg.js'
import SvgIcon from '../src/components/svgIcon/index' // svg组件
Vue.component(SvgIcon.name, SvgIcon)



/**********json-viewer***********/
import 'vue-json-viewer/style.css'
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)


/************loading***********/
import VueLoading from 'vue-loading-template'
Vue.use(VueLoading, /** options **/)

Vue.config.productionTip = false
Vue.prototype.$api = api.default
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
