<template>
	<view>
		<van-overlay v-if="overlay" v-model="value" :z-index="zIndex" :custom-style="overlayStyle" :duration="duration" @click="onClickOverlay" />
		<view :class="getClasses" :style="[popupStyle]" @transitionend="onTransitionEnd">
			<slot />
			<van-icon
				v-if="closeable"
				:name="closeIcon"
				class="iconfont icon-fork close-icon-class van-popup__close-icon"
				@tap="onClickCloseIcon"
				:class="'van-popup__close-icon--' + closeIconPosition"
			/>
		</view>
	</view>
</template>

<script>
/**
 * @property {Boolean} value 是否显示组件
 * @property {Number} duration 动画时长，单位毫秒
 * @property {Boolean} round 是否显示圆角
 * @property {Boolean} closeable 是否显示图标
 * @property {String} closeIcon 图标名称
 * @property {Object} custom-style 自定义内容样式
 * @property {Object} overlay-style 自定义遮罩样式
 * @property {String} transition 动画类名，等价于 transtion 的name属性
 * @property {Number} z-index z-index 层级
 * @property {Boolean} overlay 是否显示遮罩层
 * @property {String} close-icon-position 关闭图标位置，可选值为top-left|bottom-left|bottom-right
 * @property {Boolean} close-on-click-overlay 是否在点击遮罩层后关闭
 * @property {String} position 弹出位置，可选值为 top|bottom|right|left|center
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配
 * @event {Function} close 关闭弹出层时触发
 * @event {Function} close-overlay 点击遮罩层时触发
 */
const getClassNames = name => ({
	enter: `van-${name}-enter van-${name}-enter-active`,
	'enter-to': `van-${name}-enter-to van-${name}-enter-active`,
	leave: `van-${name}-leave van-${name}-leave-active`,
	'leave-to': `van-${name}-leave-to van-${name}-leave-active`
});
export default {
	props: {
		value: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 300
		},
		round: Boolean,
		closeable: Boolean,
		closeIcon: {
			type: String,
			default: 'cross'
		},
		customStyle: {
			type: Object,
			default: () => {}
		},
		overlayStyle: {
			type: Object,
			default: () => {}
		},
		transition: {
			type: String
		},
		zIndex: {
			type: Number,
			default: 100
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeIconPosition: {
			type: String,
			default: 'top-right'
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		position: {
			type: String,
			default: 'center'
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			classes: ['close-icon-class'],
			currentDuration: null,
			display: false,
			updateData: {},
			originDuration: ''
		};
	},
	watch: {
		value: function(val) {
			if (val) {
				this.observeShow(true, false);
			} else {
				this.observeShow(false, true);
			}
		},
		transition: function() {
			this.observeClass();
		},
		position: function() {
			this.observeClass();
		}
	},
	created() {
		this.observeClass();
	},
	mounted() {
		// 组件渲染完成时，检查value是否为true，如果是，弹出popup
		this.value && this.observeShow(true, false);
	},
	computed: {
		popupStyle() {
			return this.$u.style({
				'z-index': this.zIndex,
				'-webkit-transition-duration': this.currentDuration + 'ms',
				'transition-duration': this.currentDuration + 'ms',
				display: this.display ? null : 'none',
				...this.customStyle
			});
		},
		getClasses() {
			// safeTop: this.safeAreaInsetTop
			let info = this.$u.memoize.memoize(this.$u.bem)('popup', [this.position, { round: this.round, safe: this.safeAreaInsetBottom }]);
			let classes = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
			return `${info} ${classes}`;
		}
	},
	methods: {
		onClickCloseIcon() {
			this.$emit('close');
		},
		onClickOverlay() {
			this.$emit('click-overlay');
			if (this.closeOnClickOverlay) {
				this.$emit('close');
			}
		},
		observeClass() {
			this.updateData = {
				name: this.transition || this.position
			};
			if (this.transition === 'none') {
				this.updateData.duration = 0;
				this.originDuration = this.duration;
			} else if (this.originDuration != null) {
				this.updateData.duration = this.originDuration;
			}
		},
		observeShow(value, old) {
			if (value === old) {
				return;
			}
			value ? this.enter() : this.leave();
		},
		enter() {
			const classNames = getClassNames(this.position);
			const currentDuration = this.$u.validator.isObj(this.duration) ? this.duration.enter : this.duration;
			this.status = 'enter';
			this.$emit('before-enter');
			let that = this;
			this.$u.utils.requestAnimationFrame(() => {
				if (this.status !== 'enter') {
					return;
				}
				this.$emit('enter');
				this.inited = true;
				this.display = true;
				this.classes = classNames.enter;
				this.currentDuration = currentDuration;
				this.$u.utils.requestAnimationFrame(() => {
					if (this.status !== 'enter') {
						return;
					}
					this.transitionEnded = false;
					this.classes = classNames['enter-to'];
				});
			});
		},
		leave() {
			if (!this.display) {
				return;
			}
			const classNames = getClassNames(this.position);
			const currentDuration = this.$u.validator.isObj(this.duration) ? this.duration.leave : this.duration;
			this.status = 'leave';
			this.$emit('before-leave');
			this.$u.utils.requestAnimationFrame(() => {
				if (this.status !== 'leave') {
					return;
				}
				this.$emit('leave');
				this.classes = classNames.leave;
				this.currentDuration = currentDuration;
				this.$u.utils.requestAnimationFrame(() => {
					if (this.status !== 'leave') {
						return;
					}
					this.transitionEnded = false;
					setTimeout(() => this.onTransitionEnd(), currentDuration);
					this.classes = classNames['leave-to'];
				});
			});
		},
		onTransitionEnd() {
			if (this.transitionEnded) {
				return;
			}
			this.transitionEnded = true;
			this.$emit(`after-${this.status}`);
			if (!this.value && this.display) {
				this.inited = false;
				this.display = false;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.van-popup {
	position: fixed;
	box-sizing: border-box;
	max-height: 100%;
	overflow-y: auto;
	transition-timing-function: ease;
	-webkit-animation: ease both;
	animation: ease both;
	-webkit-overflow-scrolling: touch;
	background-color: $popup-background-color;
}

.van-popup--center {
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
}

.van-popup--center.van-popup--round {
	border-radius: $popup-round-border-radius;
}

.van-popup--top {
	top: 0;
	left: 0;
	width: 100%;
}

.van-popup--top.van-popup--round {
	border-radius: 0 0 $popup-round-border-radius $popup-round-border-radius;
}

.van-popup--right {
	top: 50%;
	right: 0;
	-webkit-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
}

.van-popup--right.van-popup--round {
	border-radius: $popup-round-border-radius 0 0 $popup-round-border-radius;
}

.van-popup--bottom {
	bottom: 0;
	left: 0;
	width: 100%;
}

.van-popup--bottom.van-popup--round {
	border-radius: $popup-round-border-radius $popup-round-border-radius 0 0;
}

.van-popup--left {
	top: 50%;
	left: 0;
	-webkit-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
}

.van-popup--left.van-popup--round {
	border-radius: 0 $popup-round-border-radius $popup-round-border-radius 0;
}

.van-popup--bottom.van-popup--safe {
	padding-bottom: env(safe-area-inset-bottom);
}

.van-popup--safeTop {
	padding-top: env(safe-area-inset-top);
}

.van-popup__close-icon {
	position: absolute;
	z-index: $popup-close-icon-z-index;
	color: $popup-close-icon-color;
	font-size: $popup-close-icon-size;
}

.van-popup__close-icon--top-left {
	top: $popup-close-icon-margin;
	left: $popup-close-icon-margin;
}

.van-popup__close-icon--top-right {
	top: $popup-close-icon-margin;
	right: $popup-close-icon-margin;
}

.van-popup__close-icon--bottom-left {
	bottom: $popup-close-icon-margin;
	left: $popup-close-icon-margin;
}

.van-popup__close-icon--bottom-right {
	right: $popup-close-icon-margin;
	bottom: $popup-close-icon-margin;
}

.van-popup__close-icon:active {
	opacity: 0.6;
}

.van-scale-enter-active,
.van-scale-leave-active {
	transition-property: opacity, -webkit-transform;
	transition-property: opacity, transform;
	transition-property: opacity, transform, -webkit-transform;
}

.van-scale-enter,
.van-scale-leave-to {
	-webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
	transform: translate3d(-50%, -50%, 0) scale(0.7);
	opacity: 0;
}

.van-fade-enter-active,
.van-fade-leave-active {
	transition-property: opacity;
}

.van-fade-enter,
.van-fade-leave-to {
	opacity: 0;
}

.van-center-enter-active,
.van-center-leave-active {
	transition-property: opacity;
}

.van-center-enter,
.van-center-leave-to {
	opacity: 0;
}

.van-bottom-enter-active,
.van-bottom-leave-active,
.van-left-enter-active,
.van-left-leave-active,
.van-right-enter-active,
.van-right-leave-active,
.van-top-enter-active,
.van-top-leave-active {
	transition-property: -webkit-transform;
	transition-property: transform;
	transition-property: transform, -webkit-transform;
}

.van-bottom-enter,
.van-bottom-leave-to {
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
}

.van-top-enter,
.van-top-leave-to {
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}

.van-left-enter,
.van-left-leave-to {
	-webkit-transform: translate3d(-100%, -50%, 0);
	transform: translate3d(-100%, -50%, 0);
}

.van-right-enter,
.van-right-leave-to {
	-webkit-transform: translate3d(100%, -50%, 0);
	transform: translate3d(100%, -50%, 0);
}
</style>
