<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<!-- <van-rate
					:value="3"
					:count="4"
					size="60"
					gutter="20"
					color="#3f8cf4"
					void-color="#07c160"
					icon="like"
					void-icon="like-o"
					:allow-half="true"
					@change="change"
				></van-rate> -->
				<!-- 
					:readonly="true"
					:disabled="true"
					:touchable = "false" -->
				<van-rate
					:value="value"
					:count="count"
					:void-color="allowHalf ? '#c8c9cc' : ''"
					:icon="selectIcon ? 'like' : 'star'"
					:void-icon="selectIcon ? 'like-o' : 'star-o'"
					:color="selectColor"
					:allow-half="allowHalf"
					:disabled="selectDisabled"
					@change="change"
				></van-rate>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectDisabled === item.type }"
					v-for="(item, index) in disabledInfo"
					:key="index"
					@click="chooseType('selectDisabled', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectIcon === item.type }"
					v-for="(item, index) in iconInfo"
					:key="index"
					@click="chooseType('selectIcon', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义颜色</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectColor === item.type }"
					v-for="(item, index) in colorInfo"
					:key="index"
					@click="chooseType('selectColor', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义数量</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': count === item.type }"
					v-for="(item, index) in countInfo"
					:key="index"
					@click="chooseType('count', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否允许半星</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': allowHalf === item.type }"
					v-for="(item, index) in allowHalfInfo"
					:key="index"
					@click="chooseType('allowHalf', item.type)"
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
			value: 3,
			disabledInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			selectDisabled: null,
			iconInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectIcon: false,
			colorInfo: [{ type: null, mode: '默认' }, { type: '#07c160', mode: '绿色' }],
			selectColor: null,
			countInfo: [{ type: 5, mode: '默认' }, { type: 8, mode: '8' }],
			count: 5,
			allowHalfInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			allowHalf: false
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 属性设置
		 */
		chooseType(info, type) {
			this[info] = type;
		},
		change(event) {
			console.log(event);
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
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.condition-headline {
		margin: 50rpx 0 10rpx;
		// padding: 0 24rpx;
		font-size: 34rpx;
		color: #333333;
		font-weight: bold;
		position: relative;
	}
	// .condition-headline::after {
	// 	content: '';
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	bottom: 0;
	// 	width: 10rpx;
	// 	background-color: $blue;
	// }
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
