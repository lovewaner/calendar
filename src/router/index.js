import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../views/index'

Vue.use(Router)
export default new Router({
	routes: [
		{
			name:'index',
			path: '/',
			component: indexPage
		}
	]
})
