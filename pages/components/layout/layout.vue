<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-row :gutter="gutterState">
					<van-col :span="8"><view class="col-view">span: 8</view></van-col>
					<van-col :span="8" :offset="offsetState"><view class="col-view">span: 8</view></van-col>
					<van-col :span="8"><view class="col-view">span: 8</view></van-col>
				</van-row>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">列元素间距</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': gutterState === item.type }" v-for="(item, index) in gutterInfo" :key="index" @click="chooseType(item.type, 'gutterState')">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">列元素偏移距离</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': offsetState === item.type }"
					v-for="(item, index) in offsetInfo"
					:key="index"
					@click="chooseType(item.type, 'offsetState')"
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
			gutterInfo: [{ type: null, mode: '默认' }, { type: 20, mode: '20' }],
			gutterState: null,
			offsetInfo: [{ type: null, mode: '默认' }, { type: 4, mode: '4' }],
			offsetState: null
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 类型
		 */
		chooseType(type, name) {
			this[name] = type;
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
			width: 100%;
			.col-view{
				background-color: $blue;
				color: $white;
				text-align: center;
			}
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
