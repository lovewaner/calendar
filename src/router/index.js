import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../views/index'
import sigin from '../components/calendar-input'
import order from '../views/order'
import detail from '../views/detail'

Vue.use(Router)
export default new Router({
	routes: [
		{
			name:'index',
			path: '/',
			component: indexPage
		},
		{
			name:'sigin',
			path: '/sigin',
			component: sigin
		},
		{
			name:'order',
			path: '/order',
			component: order
		},
		{
			name:'detail',
			path: '/detail/:id',
			component: detail
		}
	]
})
