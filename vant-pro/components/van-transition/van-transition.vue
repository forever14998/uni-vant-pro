<template>
		<view v-if="inited" class="van-transition" :class="classes" :style="rootStyle" @transitionend="onTransitionEnd"><slot /></view>
</template>

<script>
/**
 * @property {Boolean} value 是否显示组件
 * @property {Number} duration 动画时长，单位毫秒
 * @property {String} name 动画名称 fade|slide-up|slide-down|slide-left|slide-right|fade-up|fade-down|fade-left|fade-right
 * @property {Object} custom-style 自定义样式
 * @event {Function} before-enter 组件加载前
 * @event {Function} enter 组件加载时
 * @event {Function} after-enter 组件加载完成后
 * @event {Function} before-leave 离开组件前
 * @event {Function} leave 离开组件时
 * @event {Function} after-leave 离开组件后
 */
const getClassNames = name => ({
	enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
	'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
	leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
	'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`
});
export default {
	props: {
		value: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 300,
			observer: 'observeDuration'
		},
		name: {
			type: String,
			default: 'fade'
		},
		customStyle: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class'],
			type: '',
			inited: false,
			display: false,
			currentDuration: null,
			status: 'enter'
		};
	},
	watch: {
		value: function(val) {
			if (val) {
				this.observeShow(true, false);
			} else {
				this.observeShow(false, true);
			}
		}
	},
	mounted() {
		// 组件渲染完成时，检查value是否为true，如果是，弹出popup
		this.value && this.observeShow(true, false);
	},
	computed: {
		rootStyle() {
			return this.$u.style(
				{
					'z-index': this.zIndex,
					'-webkit-transition-duration': this.currentDuration + 'ms',
					'transition-duration': this.currentDuration + 'ms',
					display: this.display ? null : 'none',
					...this.customStyle
				});
		}
	},
	methods: {
		observeShow(value, old) {
			if (value === old) {
				return;
			}
			value ? this.enter() : this.leave();
		},
		enter() {
			const classNames = getClassNames(this.name);
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
			const classNames = getClassNames(this.name);
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
.van-transition {
	transition-timing-function: ease;
}

.van-fade-enter-active,
.van-fade-leave-active {
	transition-property: opacity;
}

.van-fade-enter,
.van-fade-leave-to {
	opacity: 0;
}

.van-fade-down-enter-active,
.van-fade-down-leave-active,
.van-fade-left-enter-active,
.van-fade-left-leave-active,
.van-fade-right-enter-active,
.van-fade-right-leave-active,
.van-fade-up-enter-active,
.van-fade-up-leave-active {
	transition-property: opacity, -webkit-transform;
	transition-property: opacity, transform;
	transition-property: opacity, transform, -webkit-transform;
}

.van-fade-up-enter,
.van-fade-up-leave-to {
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
	opacity: 0;
}

.van-fade-down-enter,
.van-fade-down-leave-to {
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
	opacity: 0;
}

.van-fade-left-enter,
.van-fade-left-leave-to {
	-webkit-transform: translate3d(-100%, 0, 0);
	transform: translate3d(-100%, 0, 0);
	opacity: 0;
}

.van-fade-right-enter,
.van-fade-right-leave-to {
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
	opacity: 0;
}

.van-slide-down-enter-active,
.van-slide-down-leave-active,
.van-slide-left-enter-active,
.van-slide-left-leave-active,
.van-slide-right-enter-active,
.van-slide-right-leave-active,
.van-slide-up-enter-active,
.van-slide-up-leave-active {
	transition-property: -webkit-transform;
	transition-property: transform;
	transition-property: transform, -webkit-transform;
}

.van-slide-up-enter,
.van-slide-up-leave-to {
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
}

.van-slide-down-enter,
.van-slide-down-leave-to {
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}

.van-slide-left-enter,
.van-slide-left-leave-to {
	-webkit-transform: translate3d(-100%, 0, 0);
	transform: translate3d(-100%, 0, 0);
}

.van-slide-right-enter,
.van-slide-right-leave-to {
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
}
</style>
