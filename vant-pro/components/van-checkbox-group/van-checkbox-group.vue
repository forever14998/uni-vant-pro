<template>
	<view :class="[$u.bem('checkbox-group', [{ horizontal: direction === 'horizontal' }])]"><slot /></view>
</template>

<script>
export default {
	props: {
		// 设置最大可选数
		max: Number,
		// 所有选中项的 name
		value: {
			type: Array,
			default:()=>[]
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
			checkedList: [],
			VAN_CHECKBOX_GROUP_STATE: true // 用于子组件
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
			let children = this.$children;
			// #ifdef H5
			children = children[0].$children
			// #endif
			children.forEach((child)=>{
			  return this.updateChild(child);
			});
		},
		updateChild(child) {
			child.checked = this.checkedList.indexOf(child.name) !== -1
			child.parentDisabled = this.disabled
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
