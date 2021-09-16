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
	data() {
		return {
			checkedList: []
		}
	},
	watch:{
		value() {
			this.checkedList = this.value;
		},
		checkedList() {
			this.updateChildren()
		},
		disabled() {
			this.updateChildren()
		}
	},
	mounted() {
		this.checkedList = this.value
		this.updateChildren()
	},
	methods: {
		updateChildren() {
			uni.$emit('updateCheckbox',this)
			// console.log(this.$children[0].$children)
			this.$children[0].$children.forEach((child)=>{
			  return this.updateChild(child);
			});
		},
		updateChild(child) {
			// child.parentDisabled = this.disabled;
			// child.parentInfo.direction = this.direction;
			// child.parentInfo.max = this.max;
			child.checked = this.checkedList.indexOf(child.name) !== -1
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
