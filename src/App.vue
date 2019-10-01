<template>
  <v-app>
	  <!-- <Login /> -->
	  <!-- <Signup /> -->
	  <!-- <Todo /> -->
	  <router-view></router-view>
  </v-app>
</template>

<script>
import Login from './components/Auth/Login.vue'
import Signup from './components/Auth/Signup.vue'
import Todo from './components/Todo.vue'

export default {
	name: 'App',
	components: { Login, Signup, Todo }
};
</script>
