<template>
	<view :class="[$u.bem('radio-group', [direction])]"><slot></slot></view>
</template>

<script>
/**
 * @property value 当前选中项的标识符
 * @property {Boolean} disabled 是否禁用所有单选框
 * @property {Boolean} direction 排列方向，可选值为 vertical | horizontal
 */
export default {
	// field: true,
	// relation: relation_1.useChildren('radio'),
	props: {
		value: {
			type: null
		},
		direction: String,
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			VAN_RADIO_GROUP_STATE: true // 用于子组件
		};
	},
	watch: {
		value() {
			this.updateChildren();
		},
		disabled() {
			this.updateChildren();
		}
	},
	mounted() {
		this.updateChildren();
	},
	methods: {
		updateChildren() {
			let children = this.$children
			// #ifdef H5
			children = children[0].$children
			// #endif
			children.forEach(child => {
				child.updateFromParent();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-radio-group--horizontal {
	display: flex;
	flex-wrap: wrap;
}
</style>
