import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ContactList from '@/components/ContactList'
import AddContact from '@/components/AddContact'
import UpdateContact from '@/components/UpdateContact'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/contactlist',
      name: 'ContactList',
      component: ContactList
    },
    {
      path: '/addcontact',
      name: 'AddContact',
      component: AddContact
    },
    {
      path: '/updatecontact/:contactId',
      name: 'UpdateContact',
      component: UpdateContact
    }
  ],
  mode: 'history'
})
