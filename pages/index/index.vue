<template>
	<view class="van_index__page">
		<view class="van_top__introduce">
			<view class="van_title__div">
				<image :src="logoImage" class="van_logo"></image>
				<view class="van_index__title">Vant Pro</view>
			</view> 
			<view class="van_index__headline">轻量、可靠的移动端 Vue 组件库</view>
		</view>
		<view class="van_index__card">
			<view class="van_card__title">基础组件</view>
			<view class="van_card__content">
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
			</view>
		</view>
		<view class="van_index__card">
			<view class="van_card__title">表单组件</view>
			<view class="van_card__content">
				<view class="van_index__unit" @click="navUnit('/pages/components/calendar/calendar')">
					<view class="van_index__name">calendar日历</view>
					<view class="iconfont icon-jiantou3"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			logoImage : 'http://qvuuwrm1h.hn-bkt.clouddn.com/vant-logo.jpg'
		};
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
.van_index__page {
	padding: $van-margin-base;
	.van_top__introduce{
		padding: $van-margin-base;
		.van_title__div {
			display: flex;
			align-items: baseline;
			.van_logo {
				width: $van-image-base;
				height: $van-image-base;
				position: relative;
				top: 20rpx;
			}
			.van_index__title {
				font-size: $van-font-size-title;
				color: $van-text-main;
				font-weight: bold;
				padding-left: $van-margin-base;
			}
		}
		.van_index__headline{
			padding: $van-margin-base 0;
			font-size: $van-font-size-base;
			color: $van-text-grey;
		}
	}
	.van_index__card {
		.van_card__title{
			padding: $van-margin-base 0;
			font-size: $van-font-size-base;
			color: $van-text-grey;
		}
		.van_card__content {
			.van_index__unit {
				padding: $van-margin-base;
				background-color: $van-bg-grey;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: $van-margin-base;
				border-radius: $van-border-radius-btn;
				.van_index__name {
					font-size: 28rpx;
					font-weight: 700;
					color: $van-text-main;
				}
				.icon-jiantou3 {
					font-size: 28rpx;
					color: $van-color-icon;
				}
			}
		}
	}
}
</style>
