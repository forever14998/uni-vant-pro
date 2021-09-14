<template>
	<view class="van-toast__info" v-if="show">
		<van-overlay v-if="mask || forbidClick" v-model="show" :z-index="zIndex" :custom-style="{ 'background-color': mask ? 'transparent;' : 'rgba(0,0,0,0)' }" />
		<van-transition v-model="show" :custom-style="{ 'z-index': zIndex }" class="van-toast__container">
			<view class="van-toast" :class="['van-toast--' + (type === 'text' ? 'text' : 'icon'), 'van-toast--' + position]">
				<!-- text only -->
				<text v-if="type === 'text'">{{ message }}</text>

				<!-- with icon -->
				<block v-else>
					<van-loading v-if="type === 'loading'" color="white" :type="loadingType" custom-class="van-toast__loading" />
					<van-icon v-else class="van-toast__icon" :name="type" />
					<text v-if="message" class="van-toast__text">{{ message }}</text>
				</block>

				<slot />
			</view>
		</van-transition>
	</view>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			// 是否显示
			show: false,
			// 是否显示遮罩层
			mask: false,
			// 提示内容
			message: '',
			// 是否禁止背景点击
			forbidClick: false,
			// 层级
			zIndex: 1000,
			// 提示类型，可选值为 loading success fail text
			type: 'text',
			// 加载图标类型, 可选值为 spinner circular
			loadingType: 'circular',
			// 位置，可选值为 top middle bottom
			position: 'middle'
		};
	},
	watch: {},
	methods: {}
};
</script>

<style scoped lang="scss">
.van-toast {
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: $toast-text-color;
	font-size: $toast-font-size;
	line-height: $toast-line-height;
	white-space: pre-wrap;
	word-wrap: break-word;
	background-color: $toast-background-color;
	border-radius: $toast-border-radius;
	box-sizing: border-box;
}

.van-toast__container {
	position: fixed;
	top: 50%;
	left: 50%;
	width: -webkit-fit-content;
	width: fit-content;
	transform: translate(-50%, -50%);
	max-width: $toast-max-width;
}

.van-toast--text {
	min-width: $toast-text-min-width;
	padding: $toast-text-padding;
}

.van-toast--icon {
	width: $toast-default-width;
	min-height: $toast-default-min-height;
	padding: $toast-default-padding;
}

.van-toast--icon .van-toast__icon {
	font-size: $toast-icon-size;
}

.van-toast--icon .van-toast__text {
	padding-top: 16rpx;
}

.van-toast__loading {
	margin: 20rpx 0;
}

.van-toast--top {
	transform: translateY(-30vh);
}

.van-toast--bottom {
	transform: translateY(30vh);
}
</style>
