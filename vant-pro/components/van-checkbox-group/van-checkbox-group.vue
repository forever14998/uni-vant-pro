<template>
	<view :class="[$u.bem('checkbox-group', [{ horizontal: direction === 'horizontal' }])]"><slot /></view>
</template>

<script>
export default {
	// field: true,
	// relation: useChildren('checkbox', function(target) {
	// 	this.updateChild(target);
	// }),
	props: {
		// 设置最大可选数
		max: Number,
		// 所有选中项的 name
		value: {
			type: Array
		},
		// 是否禁用所有单选框
		disabled: {
			type: Boolean,
		},
		// 排列方向，可选值为 horizontal
		direction: {
			type: String,
			default: 'vertical'
		}
	},
	watch:{
		value() {
			this.updateChildren()
		},
		disabled() {
			this.updateChildren()
		}
	},
	mounted() {
		this.updateChildren()
	},
	methods: {
		updateChildren() {
			uni.$emit('updateCheckbox',this.updateChild())
		},
		updateChild() {
			return {
				parentDisabled: this.disabled,
				direction: this.direction,
				max: this.max,
				value: [...this.value]
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.van-checkbox-group--horizontal {
	display: flex;
	flex-wrap: wrap;
}
</style>
