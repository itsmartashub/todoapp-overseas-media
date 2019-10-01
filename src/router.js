import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'


Vue.use(Router)

const routes = [
	{ path: '/login', name: 'login', component: Login },
	{ path: '/signup', name: 'signup', component: Signup }
]

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router