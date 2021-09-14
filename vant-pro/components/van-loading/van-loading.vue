<template>
	<view class="custom-class" :class="[$u.bem('loading', { vertical })]">
		<view class="van-loading__spinner" :class="'van-loading__spinner--' + type" :style="[spinnerStyle({ color, size })]">
			<view v-if="type === 'spinner'" v-for="(item, index) in array12" :key="index" class="van-loading__dot"></view>
		</view>
		<view class="van-loading__text" :style="[textStyle({ textSize, textColor })]"><slot /></view>
	</view>
</template>

<script>
export default {
	props: {
		// 颜色
		color: String,
		// 是否垂直排列图标和文字内容	
		vertical: Boolean,
		// 可选值 spinner circular
		type: {
			type: String,
			default: 'circular'
		},
		// 图标大小
		size: String|Number,
		// 文字大小
		textSize: String,
		// 文字颜色
		textColor: String	
	},
	data() {
		return {
			array12: Array.from({ length: 12 })
		}
	},
	methods: {
		spinnerStyle(data) {
			return this.$u.style({
				color: data.color,
				width: this.$u.addUnit(data.size),
				height: this.$u.addUnit(data.size)
			});
		},

		textStyle(data) {
			return this.$u.style({
				'font-size': this.$u.addUnit(data.textSize),
				'color': data.textColor,
			});
		}
	}
};
</script>

<style scoped lang="scss">
:host {
  font-size: 0;
  line-height: 1
}

.van-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $loading-spinner-color
}

.van-loading__spinner {
  position: relative;
  box-sizing: border-box;
  width: $loading-spinner-size;
  max-width: 100%;
  max-height: 100%;
  height: $loading-spinner-size;
  animation: van-rotate .8s linear infinite;
  animation: van-rotate $loading-spinner-animation-duration linear infinite
}

.van-loading__spinner--spinner {
  animation-timing-function: steps(12)
}

.van-loading__spinner--circular {
  border: 1rpx solid transparent;
  border-top-color: initial;
  border-radius: 100%
}

.van-loading__text {
  margin-left: $padding-xs;
  color: $loading-text-color;
  font-size: $loading-text-font-size;
  line-height: $loading-text-line-height
}

.van-loading__text:empty {
  display: none
}

.van-loading--vertical {
  flex-direction: column
}

.van-loading--vertical .van-loading__text {
  margin: 16rpx 0 0;
  margin: $padding-xs 0 0
}

.van-loading__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%
}

.van-loading__dot:before {
  display: block;
  width: 4rpx;
  height: 25%;
  margin: 0 auto;
  background-color: currentColor;
  border-radius: 40%;
  content: " "
}

.van-loading__dot:first-of-type {
  transform: rotate(30deg);
  opacity: 1
}

.van-loading__dot:nth-of-type(2) {
  transform: rotate(60deg);
  opacity: .9375
}

.van-loading__dot:nth-of-type(3) {
  transform: rotate(90deg);
  opacity: .875
}

.van-loading__dot:nth-of-type(4) {
  transform: rotate(120deg);
  opacity: .8125
}

.van-loading__dot:nth-of-type(5) {
  transform: rotate(150deg);
  opacity: .75
}

.van-loading__dot:nth-of-type(6) {
  transform: rotate(180deg);
  opacity: .6875
}

.van-loading__dot:nth-of-type(7) {
  transform: rotate(210deg);
  opacity: .625
}

.van-loading__dot:nth-of-type(8) {
  transform: rotate(240deg);
  opacity: .5625
}

.van-loading__dot:nth-of-type(9) {
  transform: rotate(270deg);
  opacity: .5
}

.van-loading__dot:nth-of-type(10) {
  transform: rotate(300deg);
  opacity: .4375
}

.van-loading__dot:nth-of-type(11) {
  transform: rotate(330deg);
  opacity: .375
}

.van-loading__dot:nth-of-type(12) {
  transform: rotate(1turn);
  opacity: .3125
}

@keyframes van-rotate {
  0% {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(1turn)
  }
}
</style>
