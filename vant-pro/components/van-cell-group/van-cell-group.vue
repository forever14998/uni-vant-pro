<template>
	<view>
		<view
		  v-if="title "
		  :class="[this.$u.bem('cell-group__title', { inset })]"
		>
		  {{ title }}
		</view>
		<view class="custom-class" :class="[this.$u.bem('cell-group', { inset }), border ? 'van-hairline--top-bottom' : '']">
		  <slot />
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 标题
		title: String,
		// 是否展示边框
		border: {
			type: Boolean,
			default: true
		},
		// 是否为圆角
		inset: Boolean
	}
};
</script>

<style scoped lang="scss">
.van-cell-group--inset {
  margin: $cell-group-inset-padding;
  border-radius: $cell-group-inset-border-radius;
  overflow: hidden
}

.van-cell-group__title {
  padding: $cell-group-title-padding;
  font-size: $cell-group-title-font-size;
  line-height: $cell-group-title-line-height;
  color: $cell-group-title-color
}

.van-cell-group__title--inset {
  padding: $cell-group-inset-title-padding
}
</style>
