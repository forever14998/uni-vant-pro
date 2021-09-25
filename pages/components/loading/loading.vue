<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-loading :type="typeState" :color="selectColor" :text-color="selectText" :vertical="selectVertical">
					<view v-if="selectInfo">加载中...</view>
				</van-loading>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">加载类型</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': typeState === item.type }" v-for="(item, index) in typeInfo" :key="index" @click="chooseType(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">颜色</view>
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
		<view class="condition-div">
			<view class="condition-title">加载文案</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectInfo === item.type }" v-for="(item, index) in textInfo" :key="index" @click="chooseInfo(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">文字颜色</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectText === item.type }" v-for="(item, index) in textType" :key="index" @click="chooseText(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否垂直排列</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectVertical === item.type }" v-for="(item, index) in verticalType" :key="index" @click="chooseVertical(item.type)">
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
			typeInfo: [{ type: 'circular', mode: 'circular' }, { type: 'spinner', mode: 'spinner' }],
			typeState: 'circular',
			textInfo: [{ type: false, mode: '默认' }, { type: true, mode: '加载中...' }],
			selectInfo: false,
			textType: [{ type: '', mode: '默认' }, { type: '#3f8cf4', mode: '蓝色' }],
			selectText: '',
			colorType: [{ type: '', mode: '默认' }, { type: '#3f8cf4', mode: '蓝色' }],
			selectColor: '',
			verticalType: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectVertical: false
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
		},
		
		/**
		 * @param {Object} type
		 * 选择颜色
		 */
		chooseColor(type) {
			this.selectColor = type;
		},
		/**
		 * @param {Object} type
		 * 是否显示文案
		 */
		chooseInfo(type) {
			this.selectInfo = type;
		},
		/**
		 * 文字颜色
		 */
		chooseText(type) {
			this.selectText = type;
		},
		/**
		 * @param {Object} type
		 * 是否垂直排列
		 */
		chooseVertical(type) {
			this.selectVertical = type;
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
