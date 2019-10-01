import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Todo from './components/Todo'
import Tasks from './components/Tasks'
import NotesModal from './components/NotesModal'


Vue.use(Router)

const routes = [
	{
		path: '/',
		name: 'todo',
		component: Todo,
		children: [
			{
				path: 'list/:id',
				name: 'tasks',
				components: { tasks: Tasks },
				children: [
					{
						path: 'task/:taskID',
						name: 'notes',
						components: { notes: NotesModal }
					}
				]
			},
		]
	},
	
	{ path: '/login', name: 'login', component: Login },
	{ path: '/signup', name: 'signup', component: Signup },

]

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router