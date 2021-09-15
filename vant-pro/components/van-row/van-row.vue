<template>
	<view class="van-row custom-class" :style="[rootStyle({ gutter })]"><slot /></view>
</template>

<script>
export default {
	props: {
		gutter: {
			type: Number,
			default: 0
		}
	},
	mounted() {
		this.setGutter()
	},
	watch:{
		gutter() {
			this.setGutter()
		}
	},
	methods: {
		setGutter() {
			console.log(this.gutter)
			uni.$emit('getGutter', this.gutter)
		},
		rootStyle(data) {
			if (!data.gutter) {
				return '';
			}
			return this.$u.style({
				'margin-right': this.$u.addUnit(-data.gutter / 2),
				'margin-left': this.$u.addUnit(-data.gutter / 2)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-row:after {
	display: table;
	clear: both;
	content: '';
}
</style>
