<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-icon name="chat-o" :dot="dotState" :info="selectBadge" :color="selectColor"></van-icon>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示小红点</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': dotState === item.type }" v-for="(item, index) in dotType" :key="index" @click="chooseDot(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示徽标内容</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectBadge === item.type }" v-for="(item, index) in badgeType" :key="index" @click="chooseBadge(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>

		<view class="condition-div">
			<view class="condition-title">图标颜色</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectColor === item.type }"
					v-for="(item, index) in colorType"
					:key="index"
					@click="chooseColor(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dotType: [{ type: false, mode: '否' }, { type: true, mode: '是' }],
			dotState: false,
			badgeType: [{ type: null, mode: '默认' }, { type: '9', mode: '显示' }],
			selectBadge: null,
			colorType: [{ type: '#646566', mode: '默认' }, { type: '#3f8cf4', mode: '蓝色' }],
			selectColor: '#646566'
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 是否显示小红点
		 */
		chooseDot(type) {
			this.dotState = type;
		},
		/**
		 * 选择徽标内容
		 */
		chooseBadge(type) {
			this.selectBadge = type;
		},
		/**
		 * @param {Object} type
		 * 选择颜色
		 */
		chooseColor(type) {
			this.selectColor = type;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 32rpx;
	.result-div {
		background-color: $gray-1;
		border: 1rpx dotted $gray-5;
		border-radius: 16rpx;
		padding: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.headline {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			padding-bottom: 32rpx;
		}
		.result-content {
			height: 200rpx;
			width: 200rpx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.condition-div {
		.condition-title {
			padding: 32rpx 24rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
		.condition-content {
			background-color: $gray-1;
			border-radius: 8rpx;
			padding: 16rpx;
			margin: 24rpx;
			display: flex;
			justify-content: space-between;
			.condition-unit {
				width: 100%;
				padding: 0 32rpx;
				font-size: 28rpx;
				color: #333333;
				border-radius: 8rpx;
				text-align: center;
			}
			.select-unit {
				background-color: $white;
			}
		}
	}
}
</style>
