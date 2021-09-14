<template>
	<view class="van-row custom-class" :style="[rootStyle({ gutter })]"><slot /></view>
</template>

<script>
import eventBus from '../../libs/common/eventBus.js';
export default {
	provide() {
		return {
			gutter: () => this.gutter
		};
	},
	props: {
		gutter: {
			type: Number
		}
	},
	methods: {
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
