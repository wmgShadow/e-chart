import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouer from 'vue-router'
import column from 'components/column/column'
import funnel from 'components/funnel/funnel'
import heat from 'components/heat/heat'
import point from 'components/point/point'
import line from 'components/line/line'
import cir from 'components/cir/cir'
import dashboard from 'components/dashboard/dashboard'
import multipleColumn from 'components/multipleColumn/multipleColumn'
import {DatePicker} from 'element-ui'

Vue.component(DatePicker.name, DatePicker)

Vue.use(VueRouer)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    color: ['#6fd7fe', '#43b1d4', '#266dfd', '#44a3b5', '#8b9fd2', '#8195c7']
  }
});
const router = new VueRouer({
  routes: [{
    path: '/column',
    component: column
  }, {
    path: '/funnel',
    component: funnel
  }, {
    path: '/heat',
    component: heat
  }, {
    path: '/point',
    component: point
  }, {
    path: '/dashboard',
    component: dashboard
  }, {
    path: '/multipleColumn',
    component: multipleColumn
  }, {
    path: '/cir',
    component: cir
  },{
    path: '/line',
    component: line
  }],
  linkActiveClass: 'active'
})
new Vue({
  router,
  store,
  template: '<App>',
  components: {
    App,
    column,
    funnel,
    heat,
    point,
    line,
    cir,
    dashboard
  },
  data: {
    eventHub: new Vue(),
    charts: []
  }
}).$mount('#app')

router.push('dashboard')
