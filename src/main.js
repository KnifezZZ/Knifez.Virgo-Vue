import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import './plugins/permission'
import VIcon from '@/components/v-icon/'
import VImg from '@/components/v-img/'
import directives from '@/utils/directives.js'
createApp(App)
	.use(Antd)
	.use(store)
	.use(router)
	.use(directives)
	.component('VIcon', VIcon)
	.component('VImg', VImg)
	.mount('#app')
