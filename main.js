import Vue from 'vue'
import App from './App'
import * as cUtil from '@/libs/utils/calendarUtil.js'
import * as validator from '@/libs/utils/validator.js'
import * as utils from '@/libs/utils/utils.js'
import * as bem from '@/libs/utils/bem.js'
import * as memoize from '@/libs/utils/memoize.js'

Vue.prototype.$u = {
	cUtil,
	validator,
	utils,
	bem,
	memoize
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
