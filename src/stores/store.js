import Vue from 'vue'
import Vuex from 'vuex'

import UIModule from './modules/ui'
import User from './modules/user'
import Data from './modules/data'
import Search from './modules/search'
import Preferences from './modules/preferences'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		ui: UIModule,
		user: User,
		data: Data,
		search: Search,
		preferences: Preferences
	}
})



//! Dispatch Vs Commit in Vuex
//! Dispatch triggers an action whereas commit triggers a mutation. $dispatch is always used from your methods in routes/components. It sends a message to Vuex store to perform some action. The action can be performed any time after the current tick so that it will not affect the frontend performance.

//! The commit is done from within an action. It is done only when you have data to commit. Commit is synchronous and it may affect the performance of frontend.

//! When you want to do a task asynchronously you should use $dispatch so that your user interface will not get affected by the task by being frozen for a while or unresponsive.

//! If you display an ajax spinner until the action gets finished it will return a Promise as explained below.