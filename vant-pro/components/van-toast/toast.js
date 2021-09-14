import Vue from 'vue'
const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#van-toast',
};
let queue = [];
let currentOptions = Object.assign({}, defaultOptions);
function parseOptions(message) {
  return Vue.prototype.$u.validator.isObj(message) ? message : { message };
}
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
function Toast(toastOptions) {
  const options = Object.assign(
    Object.assign({}, currentOptions),
    parseOptions(toastOptions)
  );
  const context = options.context || getContext();
  const toast = context.selectComponent(options.selector);
  if (!toast) {
    console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
    return;
  }
  delete options.context;
  delete options.selector;
  toast.clear = () => {
	  // #ifdef H5
	  toast.show = false;
	  // #endif
	  // #ifdef MP-WEIXIN
	  toast.setData({show: false})
	  // #endif
    if (options.onClose) {
      options.onClose();
    }
  };
  queue.push(toast);
  // #ifdef H5
  toast.show = options.show;
  toast.forbidClick = options.forbidClick;
  toast.loadingType = options.loadingType;
  toast.mask = options.mask;
  toast.message = options.message;
  toast.position = options.position;
  toast.type = options.type;
  toast.zIndex = options.zIndex;
  // #endif
  // #ifdef MP-WEIXIN
  toast.setData(options)
  // #endif
  console.log(options)
  clearTimeout(toast.timer);
  if (options.duration != null && options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter((item) => item !== toast);
    }, options.duration);
  }
  return toast;
}
const createMethod = (type) => (options) =>
  Toast(Object.assign({ type }, parseOptions(options)));
Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = () => {
  queue.forEach((toast) => {
    toast.clear();
  });
  queue = [];
};
Toast.setDefaultOptions = (options) => {
  Object.assign(currentOptions, options);
};
Toast.resetDefaultOptions = () => {
  currentOptions = Object.assign({}, defaultOptions);
};
export default Toast;
