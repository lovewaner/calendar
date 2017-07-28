import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../views/index'
import sigin from '../components/calendar-input'

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
		}
	]
})
