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
				<view class="van_index__unit" @click="navUnit('/pages/components/button/button')">
					<view class="van_index__name">button按钮</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/cell/cell')">
					<view class="van_index__name">cell单元格</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/icon/icon')">
					<view class="van_index__name">icon图标</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/image/image')">
					<view class="van_index__name">image图片</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/layout/layout')">
					<view class="van_index__name">layout布局</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/popup/popup')">
					<view class="van_index__name">popup弹出层</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/toast/toast')">
					<view class="van_index__name">toast提示</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/transition/transition')">
					<view class="van_index__name">transition动画</view>
					<van-icon name="arrow"></van-icon>
				</view>
			</view>
		</view>
		<view class="van_index__card">
			<view class="van_card__title">表单组件</view>
			<view class="van_card__content">
				<view class="van_index__unit" @click="navUnit('/pages/components/calendar/calendar')">
					<view class="van_index__name">calendar日历</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/checkbox/checkbox')">
					<view class="van_index__name">checkbox复选框</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/datetime-picker/datetime-picker')">
					<view class="van_index__name">datetimePicker时间选择</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/field/field')">
					<view class="van_index__name">field输入框</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/picker/picker')">
					<view class="van_index__name">picker单选框</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/radio/radio')">
					<view class="van_index__name">radio选择器</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/rate/rate')">
					<view class="van_index__name">rate评分</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/search/search')">
					<view class="van_index__name">search搜索</view>
					<van-icon name="arrow"></van-icon>
				</view>
			</view>
		</view>
		<view class="van_index__card">
			<view class="van_card__title">反馈组件</view>
			<view class="van_card__content">
				<view class="van_index__unit" @click="navUnit('/pages/components/loading/loading')">
					<view class="van_index__name">loading加载</view>
					<van-icon name="arrow"></van-icon>
				</view>
				<view class="van_index__unit" @click="navUnit('/pages/components/overlay/overlay')">
					<view class="van_index__name">overlay遮罩层</view>
					<van-icon name="arrow"></van-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			logoImage: 'http://doc.vantpro.com/assets/logo.png'
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
	padding: 24rpx;
	.van_top__introduce {
		padding: 24rpx;
		.van_title__div {
			display: flex;
			align-items: baseline;
			.van_logo {
				width: 100rpx;
				height: 100rpx;
				position: relative;
				top: 20rpx;
			}
			.van_index__title {
				font-size: 60rpx;
				color: #333333;
				font-weight: bold;
				padding-left: 24rpx;
			}
		}
		.van_index__headline {
			padding: 24rpx 0;
			font-size: 28rpx;
			color: $gray-6;
		}
	}
	.van_index__card {
		.van_card__title {
			padding: 24rpx 0;
			font-size: 28rpx;
			color: $gray-6;
		}
		.van_card__content {
			.van_index__unit {
				padding: 24rpx;
				background-color: $gray-1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24rpx;
				border-radius: 54rpx;
				.van_index__name {
					font-size: 28rpx;
					font-weight: 700;
					color: #333333;
				}
			}
		}
	}
}
</style>
