import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.component('clickCounter', {
	template: '<button @click="count++">{{count}}</button>',
	data () {
		return {
			count: 0
		}
	}
})

new Vue({
  render: h => h(App),
}).$mount('#app')
