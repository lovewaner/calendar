import Vue from 'vue'
import Router from 'vue-router'
import CalendarInput from '../components/calendar-input'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'CalendarInput',
      component: CalendarInput
    }
  ]
})
