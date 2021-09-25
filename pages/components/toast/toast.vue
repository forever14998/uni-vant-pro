<template>
	<view class="content">
		<view class="condition-div">
			<view class="condition-title">基础用法</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': typeState === item.type }" v-for="(item, index) in typeInfo" :key="index" @click="chooseType(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">位置</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectPosition === item.type }" v-for="(item, index) in positionType" :key="index" @click="choosePosition(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeInfo: [
				{ type: '', mode: '文字' },
				{ type: 'success', mode: '成功' },
				{ type: 'loading', mode: '加载' },
				{ type: 'fail', mode: '失败' }
			],
			typeState: null,
			positionType: [{ type: 'middle', mode: '居中(默认)' }, { type: 'top', mode: '上方' }, { type: 'bottom', mode: '下方' }],
			selectPosition: ''
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 类型
		 */
		chooseType(type) {
			this.typeState = type;
			if (this.typeState) {
				this.Toast[this.typeState]('提示');
			} else {
				this.Toast('提示');
			}
		},
		/**
		 * @param {Object} type
		 * 位置
		 */
		choosePosition(type) {
			this.selectPosition = type;
			this.Toast.loading({message: '提示', position: type});
		},
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
