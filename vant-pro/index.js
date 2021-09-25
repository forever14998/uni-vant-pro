import * as cUtil from './libs/utils/calendarUtil.js'
import * as validator from './libs/utils/validator.js'
import * as utils from './libs/utils/utils.js'
import {bem} from './libs/utils/bem.js'
import * as memoize from './libs/utils/memoize.js'
import {addUnit} from './libs/utils/addUnit.js'
import {style} from './libs/utils/style.js'
import Toast from './components/van-toast/toast.js'

const $u = {
	cUtil,
	validator,
	utils,
	bem,
	memoize,
	addUnit,
	style
}


// $u挂载到uni对象上
uni.$u = $u
uni.Toast = Toast

const install = Vue => {
	Vue.prototype.$u = $u
	Vue.prototype.Toast = Toast
}

export default {
	install
}
