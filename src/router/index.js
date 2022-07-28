// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
import com from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'com',
    component: com,
  },
]

const router = new VueRouter({
  routes
})

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
