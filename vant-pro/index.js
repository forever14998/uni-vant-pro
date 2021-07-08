import * as cUtil from './libs/utils/calendarUtil.js'
import * as validator from './libs/utils/validator.js'
import * as utils from './libs/utils/utils.js'
import * as bem from './libs/utils/bem.js'
import * as memoize from './libs/utils/memoize.js'

const $u = {
	cUtil,
	validator,
	utils,
	bem,
	memoize
}


// $u挂载到uni对象上
uni.$u = $u

const install = Vue => {
	Vue.prototype.$u = $u
}

export default {
	install
}
