<template>
	<view :class="$u.bem('checkbox-group', [{ horizontal: direction === 'horizontal' }])"><slot /></view>
</template>

<script>
export default {
	// field: true,
	// relation: useChildren('checkbox', function(target) {
	// 	this.updateChild(target);
	// }),
	provide() {
	   return {
	     checkbox: function (target) {
			 this.updateChild(target);
		 },
	   }
	 },
	props: {
		max: Number,
		value: {
			type: Array,
			// observer: 'updateChildren'
		},
		disabled: {
			type: Boolean,
			// observer: 'updateChildren'
		},
		direction: {
			type: String,
			default: 'vertical'
		}
	},
	methods: {
		// updateChildren() {
		// 	this.children.forEach(child => this.updateChild(child));
		// },
		updateChild(info={name: ''}) {
			return {
				value: value.indexOf(info.name) !== -1,
				parentDisabled: this.disabled,
				direction: this.direction,
				max: this.max,
				value: this.value
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
