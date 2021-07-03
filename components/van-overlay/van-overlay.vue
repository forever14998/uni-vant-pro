<template>
	<view @click="onClick" @touchmove="noop">
		<van-transition v-model="value" :class="{'transition-content': value}" :custom-style="transitionStyle" :duration="duration">
			<slot></slot>
		</van-transition>
	</view>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		duration: {
			type: null,
			default: 300
		},
		zIndex: {
			type: Number,
			default: 1
		},
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
			this.init === val
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
		left:0;
		width: 100%;
		height: 100%;
		background-color: $van-bg-overlay;
	}
</style>
