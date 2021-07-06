<template>
	<view @click="onClick" @touchmove="noop">
		<van-transition v-model="value" :class="{ 'transition-content': value }" :custom-style="transitionStyle" :duration="duration"><slot></slot></van-transition>
	</view>
</template>

<script>
/**
 * @property {Boolean} value 是否显示组件
 * @property {Number} duration 动画时长，单位毫秒
 * @property {Number} z-index z-index 层级
 * @property {Object} custom-style 自定义样式
 * @event {Function} click 组件点击事件
 */
export default {
	props: {
		// 是否显示组件
		value: {
			type: Boolean,
			default: false
		},
		// 动画时长
		duration: {
			type: Number,
			default: 300
		},
		// z-index 层级
		zIndex: {
			type: Number,
			default: 1
		},
		// 自定义样式(加在van-transition,使用可参考transition动画中的customStyle)
		customStyle: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			init: false
		};
	},
	watch: {
		value: function(val) {
			this.init === val;
		}
	},
	computed: {
		transitionStyle() {
			return {
				'z-index': this.zIndex,
				...this.customStyle
			};
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		},
		// for prevent touchmove
		noop() {}
	}
};
</script>

<style scoped lang="scss">
.transition-content {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: $van-bg-overlay;
}
</style>
