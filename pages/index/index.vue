<template>
	<view class="content">
		<view class="van_index__unit" @click="navUnit('/pages/components/transition/transition')">
			<view class="van_index__name">transition动画</view>
			<view class="iconfont icon-jiantou3"></view>
		</view>
		<view class="van_index__unit" @click="navUnit('/pages/components/overlay/overlay')">
			<view class="van_index__name">overlay遮罩层</view>
			<view class="iconfont icon-jiantou3"></view>
		</view>
		<view class="van_index__unit" @click="navUnit('/pages/components/popup/popup')">
			<view class="van_index__name">popup弹出层</view>
			<view class="iconfont icon-jiantou3"></view>
		</view>
		<view class="van_index__unit" @click="navUnit('/pages/components/calendar/calendar')">
			<view class="van_index__name">calendar日历</view>
			<view class="iconfont icon-jiantou3"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		navUnit(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.van_index__unit {
		padding: 30rpx;
		border-bottom: 1rpx solid #eeeeee;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.van_index__name {
			font-size: 28rpx;
			// color: #333333;
			--button-default-color: #f2f3f5;
		}
		.icon-jiantou3 {
			font-size: 28rpx;
			color: #999999;
		}
	}
}
</style>
