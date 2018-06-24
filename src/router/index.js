import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
//import TerminalManage from '@/components/pages/TerminalManage';
//import PlatformSync from '@/components/pages/PlatformSync';
//import OrderRecord from '@/components/pages/OrderRecord';
import UserSessions from '@/components/pages/UserSessions';
import TypeManage from '@/components/pages/TypeManage';
//import TestDrive from '@/components/pages/TestDrive';
import add from '@/components/pages/add'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/home',
      component:Home,
      children:[
          //{
          //    path:'/terminalmanage',
          //    component:TerminalManage
          //},
          //{
          //    path:'/platformsync',
          //   component:PlatformSync
          //},
          //{
          //    path:'/orderrecord',
          //    component:OrderRecord
          //},
          //{
          //   path:'/testdrive',
          //   component:TestDrive
          //},
          {
              path:'/usersessions',
              component:UserSessions
          },
          {
            path:'/typemanage',
            component:TypeManage
          },
          {
            path:'/add',
            component:add
          },
          {
              path:'/',
              redirect:'/typemanage'
          }

      ]
    },
      {
          path:'/',
          redirect:'/home'
      }
  ]
})
